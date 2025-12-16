#!/usr/bin/env python3
from PIL import Image
import numpy as np

# Open the original openbox image
img = Image.open('openbox.png')
img_array = np.array(img)

# Define color to replace (orange) and new color (purple #92487A)
# Orange is approximately RGB(248, 123, 27)
orange_color = np.array([248, 123, 27])
new_color = np.array([146, 72, 122])  # #92487A

# Create a mask for pixels that are similar to orange
# Using a tolerance to catch variations in the orange color
tolerance = 50
diff = np.abs(img_array[:, :, :3] - orange_color)
mask = np.all(diff < tolerance, axis=2)

# Replace orange pixels with new purple color
img_array[mask] = np.append(new_color, [255])  # Add alpha channel

# Create new image from modified array
new_img = Image.fromarray(img_array.astype('uint8'))

# Save the purple version
new_img.save('openbox_purple.png')
print('Created openbox_purple.png')

# Create resized versions for extension icons
sizes = [16, 48, 128]
for size in sizes:
    resized = new_img.resize((size, size), Image.Resampling.LANCZOS)
    output_path = f'public/icon{size}.png'
    resized.save(output_path)
    print(f'Created {output_path} ({size}x{size})')

print('✓ All purple icon sizes created successfully!')
