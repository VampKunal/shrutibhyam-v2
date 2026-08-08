/**
 * Patches Vite 7's renderAssetUrlInJS to handle the case where
 * publicAssetUrlCache has no entry for the current environment's config.
 *
 * Root cause: In a multi-environment build (e.g. Cloudflare SSR + client),
 * CSS url() references to public/ files get encoded as __VITE_PUBLIC_ASSET__hash__
 * placeholders during the CLIENT environment's CSS processing. But when the SSR
 * environment runs renderChunk, it calls publicAssetUrlCache.get(environment.getTopLevelConfig())
 * and gets undefined — because the cache was keyed by the client environment's config object.
 *
 * Fix: Guard the .get(hash) call with a null check. If the map is missing,
 * just skip those replacements (the URLs stay as literal strings in the output).
 */
const fs = require("fs");
const file =
  "node_modules/vite/dist/node/chunks/config.js";

let code = fs.readFileSync(file, "utf8");

const original = `\tconst publicAssetUrlMap = publicAssetUrlCache.get(environment.getTopLevelConfig());
\tpublicAssetUrlRE.lastIndex = 0;
\twhile (match = publicAssetUrlRE.exec(code)) {
\t\ts ||= new MagicString(code);
\t\tconst [full, hash$1] = match;
\t\tconst replacement = toOutputFilePathInJS(environment, publicAssetUrlMap.get(hash$1).slice(1), "public", chunk.fileName, "js", toRelativeRuntime);
\t\tconst replacementString = typeof replacement === "string" ? JSON.stringify(encodeURIPath(replacement)).slice(1, -1) : \`"+\${replacement.runtime}+"\`;
\t\ts.update(match.index, match.index + full.length, replacementString);
\t}`;

const patched = `\tconst publicAssetUrlMap = publicAssetUrlCache.get(environment.getTopLevelConfig());
\tpublicAssetUrlRE.lastIndex = 0;
\tif (publicAssetUrlMap) {
\t\twhile (match = publicAssetUrlRE.exec(code)) {
\t\t\ts ||= new MagicString(code);
\t\t\tconst [full, hash$1] = match;
\t\t\tconst filePath = publicAssetUrlMap.get(hash$1);
\t\t\tif (!filePath) continue;
\t\t\tconst replacement = toOutputFilePathInJS(environment, filePath.slice(1), "public", chunk.fileName, "js", toRelativeRuntime);
\t\t\tconst replacementString = typeof replacement === "string" ? JSON.stringify(encodeURIPath(replacement)).slice(1, -1) : \`"+\${replacement.runtime}+"\`;
\t\t\ts.update(match.index, match.index + full.length, replacementString);
\t\t}
\t}`;

if (code.includes(original)) {
  code = code.replace(original, patched);
  fs.writeFileSync(file, code);
  console.log(
    "✅ Patched vite/dist/node/chunks/config.js: renderAssetUrlInJS publicAssetUrlMap null guard applied."
  );
} else {
  console.warn(
    "⚠️  Could not find the target pattern in config.js — patch skipped (may already be applied or Vite version changed)."
  );
}
