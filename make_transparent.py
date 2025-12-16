from PIL import Image
import numpy as np

# Load the image
img = Image.open('openbox_blue.png').convert('RGBA')
data = np.array(img)

# Get the RGB channels
r, g, b, a = data.T

# Define the blue color range to make transparent
# The blue background appears to be around #11224E (17, 34, 78)
# We'll use a tolerance to catch similar blues
blue_areas = (r < 50) & (g < 60) & (b > 60)

# Set alpha channel to 0 (transparent) for blue areas
data[..., 3][blue_areas.T] = 0

# Create new image
new_img = Image.fromarray(data)

# Save to public folder
new_img.save('public/openbox_transparent.png')
print("Transparent PNG created: public/openbox_transparent.png")
