const fs = require('fs');
const file = 'node_modules/rollup/dist/es/shared/node-entry.js';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /getVariableForExportName\((.*?)\)\s*\{/,
  (match, p1) => match + `\ntry {`
);

code = code.replace(
  /getExportedVariablesByName\((.*?)\)\s*\{/,
  (match, p1) => `} catch (e) { console.error('ROLLUP CRASH IN MODULE:', this.id, 'EXPORT NAME:', ${p1}); throw e; }\n` + match
);

// Actually, wait, maybe just doing it manually is easier.
// Let's replace getVariableForExportName:
// getVariableForExportName(name, ...args) {
//   try { ... } catch (e) { console.log(this.id); throw e; }
// }

// Better approach:
// Replace "getVariableForExportName(name) {"
// with "getVariableForExportName(name) { try { return this._orig_getVariableForExportName(name); } catch(e) { console.error('CRASH', this.id, name); throw e; } } _orig_getVariableForExportName(name) {"

code = code.replace(
  /getVariableForExportName\(([^)]*)\)\s*\{/,
  (match, p1) => `getVariableForExportName(${p1}) { try { return this._orig_getVariableForExportName(${p1}); } catch(e) { console.error('\\n\\n*** CRASH MODULE:', this.id, 'EXPORT NAME:', ${p1.split(',')[0]}, '\\n\\n'); throw e; } } _orig_getVariableForExportName(${p1}) {`
);

fs.writeFileSync(file, code);
