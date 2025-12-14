#!/usr/bin/env python3
from PIL import Image
import numpy as np

# Open the original openbox image
img = Image.open('openbox.png')
img_rgba = img.convert('RGBA')
img_array = np.array(img_rgba)

# Define orange color range based on actual pixel values
# Actual orange in the image is RGB(236, 72, 55)
# We'll use a broader range to catch all orange shades including anti-aliased edges
lower_orange = np.array([230, 60, 45, 200])  # R, G, B, A
upper_orange = np.array([255, 150, 100, 255])

# Purple color #92487A = RGB(146, 72, 122)
purple_color = np.array([146, 72, 122, 255])

# Create mask for orange pixels
mask = (
    (img_array[:, :, 0] >= lower_orange[0]) & (img_array[:, :, 0] <= upper_orange[0]) &
    (img_array[:, :, 1] >= lower_orange[1]) & (img_array[:, :, 1] <= upper_orange[1]) &
    (img_array[:, :, 2] >= lower_orange[2]) & (img_array[:, :, 2] <= upper_orange[2]) &
    (img_array[:, :, 3] >= lower_orange[3])
)

# Replace orange pixels with purple
img_array[mask] = purple_color

# Create new image from modified array
new_img = Image.fromarray(img_array.astype('uint8'), 'RGBA')

# Save the purple version
new_img.save('openbox_purple.png')
print('✓ Created openbox_purple.png')

# Create resized versions for extension icons
sizes = [16, 48, 128]
for size in sizes:
    resized = new_img.resize((size, size), Image.Resampling.LANCZOS)
    output_path = f'public/icon{size}.png'
    resized.save(output_path)
    print(f'✓ Created {output_path} ({size}x{size})')

print('✓ All purple icon sizes created successfully!')
