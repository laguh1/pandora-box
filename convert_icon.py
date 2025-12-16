#!/usr/bin/env python3
from PIL import Image
import os

# Open the blue openbox image
img = Image.open('openbox_blue.png')

# Define the sizes needed for Chrome extension
sizes = [16, 48, 128]

# Create resized versions
for size in sizes:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    output_path = f'public/icon{size}.png'
    resized.save(output_path)
    print(f'Created {output_path} ({size}x{size})')

print('✓ All icon sizes created successfully!')
