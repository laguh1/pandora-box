const fs = require('fs');
const path = require('path');

// Create simple PNG data URLs for different sizes
const sizes = [16, 48, 128];

// SVG content
const svgContent = `<svg width="SIZE" height="SIZE" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="24" fill="#800080"/>
  <rect x="20" y="20" width="42" height="42" rx="8" fill="#8B0000"/>
  <rect x="66" y="20" width="42" height="42" rx="8" fill="#556B2F"/>
  <rect x="20" y="66" width="42" height="42" rx="8" fill="#654321"/>
  <rect x="66" y="66" width="42" height="42" rx="8" fill="#48D1CC"/>
</svg>`;

// Copy SVG to public folder for each size
sizes.forEach(size => {
  const svg = svgContent.replace(/SIZE/g, size);
  const outputPath = path.join(__dirname, 'public', `icon${size}.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`Created ${outputPath}`);
});

console.log('Icons generated successfully!');
console.log('Note: Chrome will render SVG files. If you need true PNG, use an image conversion tool.');
