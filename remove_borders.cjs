const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/shrutibhyam/shrutibhyam/src');
let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Safe replacement: replace the exact classes
  content = content.replace(/\bborder-[ytb]\s+border-soft-beige(?:\/\d+)?\b/g, '');
  content = content.replace(/\bborder-soft-beige(?:\/\d+)?\s+border-[ytb]\b/g, '');

  if (content !== original) {
    // clean up any double spaces left behind
    content = content.replace(/  +/g, ' ');
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Updated', file);
  }
});
console.log('Total files updated:', count);
