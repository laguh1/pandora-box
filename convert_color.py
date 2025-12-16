from PIL import Image
import numpy as np

# Load the image
img = Image.open('openbox.png')
img = img.convert('RGBA')

# Convert to numpy array
data = np.array(img)

# Define the target color (dark navy blue)
target_color = (17, 34, 78)  # #11224E

# Get all non-white pixels (the orange/red parts)
# We'll convert pixels that are not white and not transparent
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Create a mask for non-white pixels (considering some tolerance)
# White is (255, 255, 255), so we select pixels that are significantly different
mask = (r < 250) & (g < 250) & (b < 250) & (a > 0)

# Replace orange/red pixels with dark navy blue
data[mask, 0] = target_color[0]  # R
data[mask, 1] = target_color[1]  # G
data[mask, 2] = target_color[2]  # B

# Create new image from modified data
new_img = Image.fromarray(data, 'RGBA')

# Save the result
new_img.save('openbox_blue.png')
print("Conversion complete! Saved as openbox_blue.png")
