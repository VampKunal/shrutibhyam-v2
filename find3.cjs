const fs = require('fs');
['src/routes/shop/index.tsx', 'src/routes/shop/$productId.tsx'].forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  console.log('--- ' + f);
  content.split('\n').forEach((line, i) => {
    if (line.includes('<section')) {
      console.log(`${i + 1}: ${line.trim()}`);
    }
  });
});
