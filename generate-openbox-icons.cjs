const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a simple openbox icon using canvas
function createOpenboxIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fill background with dark navy
  ctx.fillStyle = '#11224E';
  ctx.fillRect(0, 0, size, size);

  // Scale factor
  const scale = size / 24;

  // Set drawing style
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillStyle = 'none';

  // Draw the 3D box
  ctx.beginPath();
  // Top hexagon outline
  ctx.moveTo(12 * scale, 2.27 * scale);
  ctx.lineTo(20.73 * scale, 6.96 * scale);
  ctx.lineTo(20.73 * scale, 16.27 * scale);
  ctx.lineTo(12 * scale, 22.08 * scale);
  ctx.lineTo(3.27 * scale, 16.27 * scale);
  ctx.lineTo(3.27 * scale, 6.96 * scale);
  ctx.lineTo(12 * scale, 2.27 * scale);
  ctx.stroke();

  // Middle lines (showing open box)
  ctx.beginPath();
  ctx.moveTo(3.27 * scale, 6.96 * scale);
  ctx.lineTo(12 * scale, 12.01 * scale);
  ctx.lineTo(20.73 * scale, 6.96 * scale);
  ctx.stroke();

  // Vertical center line
  ctx.beginPath();
  ctx.moveTo(12 * scale, 12.01 * scale);
  ctx.lineTo(12 * scale, 22.08 * scale);
  ctx.stroke();

  // Open flaps (dashed lines)
  ctx.setLineDash([2 * scale, 2 * scale]);

  ctx.beginPath();
  ctx.moveTo(3.27 * scale, 6.96 * scale);
  ctx.lineTo(1 * scale, 4 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20.73 * scale, 6.96 * scale);
  ctx.lineTo(23 * scale, 4 * scale);
  ctx.stroke();

  return canvas.toBuffer('image/png');
}

// Generate icons
const sizes = [16, 48, 128];

sizes.forEach(size => {
  const buffer = createOpenboxIcon(size);
  fs.writeFileSync(`public/icon${size}.png`, buffer);
  console.log(`Generated public/icon${size}.png`);
});

console.log('All openbox icons generated successfully!');
