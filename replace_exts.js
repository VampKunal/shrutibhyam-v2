import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function replaceExtensions(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceExtensions(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      // We do not want to replace things like "image/png" which is a mime type
      // So let's look for .png', .png", .png`, .jpg', .jpg", .jpg`, .jpeg', .jpeg", .jpeg`
      
      content = content.replace(/\.(png|jpg|jpeg)(['"`])/gi, '.webp$2');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceExtensions(srcDir);
