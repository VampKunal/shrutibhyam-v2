import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public');

async function convertToWebp(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await convertToWebp(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const outputPath = path.join(dirPath, `${name}.webp`);

      console.log(`Converting ${fullPath} to ${outputPath}`);
      await sharp(fullPath).webp({ quality: 80 }).toFile(outputPath);
      
      // Delete original
      fs.unlinkSync(fullPath);
    }
  }
}

convertToWebp(dir).catch(console.error);
