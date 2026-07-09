// convert-to-webp.cjs — convert all heavy images in /public to WebP
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");

async function convertDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(full);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const outPath = full.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        if (fs.existsSync(outPath)) {
          console.log(`⏭  skip (exists): ${outPath}`);
          continue;
        }
        try {
          const inStat = fs.statSync(full);
          await sharp(full)
            .webp({ quality: 82, effort: 4 })
            .toFile(outPath);
          const outStat = fs.statSync(outPath);
          const saved = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
          console.log(`✅  ${path.relative(PUBLIC, full)} → ${path.basename(outPath)} (saved ${saved}%)`);
        } catch (err) {
          console.error(`❌  ${full}: ${err.message}`);
        }
      }
    }
  }
}

convertDir(PUBLIC).then(() => console.log("\n🎉 WebP conversion complete!"));
