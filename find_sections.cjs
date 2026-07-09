const fs = require('fs');

const files = [
  'src/routes/index.tsx',
  'src/routes/about.tsx',
  'src/routes/yoga.tsx',
  'src/routes/events.tsx'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('--- ' + f);
  content.split('\n').forEach((line, i) => {
    if (line.includes('<section')) {
      console.log(`${i + 1}: ${line.trim()}`);
    }
  });
});
