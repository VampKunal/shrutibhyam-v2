import fs from 'fs';

const files = [
  'src/routes/index.tsx',
  'src/routes/about.tsx',
  'src/routes/yoga.tsx',
  'src/routes/events.tsx',
  'src/components/site/TestimonialsGallery.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/<div className="absolute inset-0 bg-[a-zA-Z0-9-]+\/[0-9]+ pointer-events-none" \/>\r?\n\s*/g, '');
  fs.writeFileSync(f, content);
  console.log(f + ' updated');
});
