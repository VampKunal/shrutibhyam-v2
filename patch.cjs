const fs = require('fs');
const file = 'node_modules/rollup/dist/es/shared/node-entry.js';
let code = fs.readFileSync(file, 'utf8');

// Guard: if already patched, skip to avoid breaking the file on re-runs
if (code.includes('_orig_getVariableForExportName')) {
  console.log('⚠️  patch.cjs: already applied, skipping.');
  process.exit(0);
}

const patched = code.replace(
  /getVariableForExportName\(([^)]*)\)\s*\{/,
  (match, p1) =>
    `getVariableForExportName(${p1}) { try { return this._orig_getVariableForExportName(${p1}); } catch(e) { console.error('\\n\\n*** CRASH MODULE:', this.id, 'EXPORT NAME:', ${p1.split(',')[0]}, '\\n\\n'); throw e; } } _orig_getVariableForExportName(${p1}) {`
);

if (patched === code) {
  console.warn('⚠️  patch.cjs: could not find target pattern — patch skipped (may already be applied or Rollup version changed).');
} else {
  fs.writeFileSync(file, patched);
  console.log('✅ patch.cjs: patched rollup getVariableForExportName with try/catch wrapper.');
}
