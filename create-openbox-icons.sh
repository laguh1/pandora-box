#!/bin/bash

# Create a simple openbox icon using Python's PIL
python3 << 'PYTHON_SCRIPT'
from PIL import Image, ImageDraw
import os

def create_openbox_icon(size):
    # Create image with dark navy background
    img = Image.new('RGB', (size, size), '#11224E')
    draw = ImageDraw.Draw(img)

    # Scale factor
    scale = size / 24

    # White color for the box
    white = '#FFFFFF'
    line_width = max(1, int(2 * scale))

    # Draw the 3D box outline
    points = [
        (12 * scale, 2.27 * scale),
        (20.73 * scale, 6.96 * scale),
        (20.73 * scale, 16.27 * scale),
        (12 * scale, 22.08 * scale),
        (3.27 * scale, 16.27 * scale),
        (3.27 * scale, 6.96 * scale),
        (12 * scale, 2.27 * scale),
    ]
    draw.line(points, fill=white, width=line_width)

    # Middle lines (showing open box)
    draw.line([
        (3.27 * scale, 6.96 * scale),
        (12 * scale, 12.01 * scale),
        (20.73 * scale, 6.96 * scale)
    ], fill=white, width=line_width)

    # Vertical center line
    draw.line([
        (12 * scale, 12.01 * scale),
        (12 * scale, 22.08 * scale)
    ], fill=white, width=line_width)

    # Open flaps
    draw.line([
        (3.27 * scale, 6.96 * scale),
        (1 * scale, 4 * scale)
    ], fill=white, width=line_width)

    draw.line([
        (20.73 * scale, 6.96 * scale),
        (23 * scale, 4 * scale)
    ], fill=white, width=line_width)

    return img

# Generate icons
for size in [16, 48, 128]:
    img = create_openbox_icon(size)
    img.save(f'public/icon{size}.png')
    print(f'Generated public/icon{size}.png')

print('All openbox icons generated successfully!')
PYTHON_SCRIPT
