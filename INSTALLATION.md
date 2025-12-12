# Pandora Box - Installation Guide

## Quick Start

### Step 1: Build the Extension

```bash
# Navigate to the project directory
cd pandora-box

# Install dependencies (if not already done)
npm install

# Build the extension
npm run build
```

This creates a `dist/` folder with all the extension files.

### Step 2: Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle switch in the top-right corner)
4. Click the **Load unpacked** button
5. Browse to the `pandora-box/dist/` folder and select it
6. The Pandora Box extension should now appear in your extensions list

### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in the Chrome toolbar
2. Find "Pandora Box" in the list
3. Click the pin icon to pin it to your toolbar for easy access

## Using the Extension

1. Click the Pandora Box icon in your Chrome toolbar
2. You'll see 4 topic cards:
   - **Deutsch** (Dark Red)
   - **Crochet** (Olive Green)
   - **Movies** (Brown)
   - **Social Media** (Greenish Blue)

3. Click any topic card to open a modal with two options:
   - **Open All in Group**: Opens all URLs in a new Chrome tab group
   - **Select URLs**: Choose specific URLs with checkboxes

4. All opened tabs will be organized in a color-coded tab group

## Customizing Topics and URLs

Edit `src/data/topics.js` to customize your topics and URLs, then rebuild:

```bash
npm run build
```

Then reload the extension in Chrome:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the Pandora Box extension card

## Troubleshooting

### Extension doesn't appear after loading
- Make sure you selected the `dist/` folder, not the root project folder
- Check that the build completed successfully

### URLs don't open
- Ensure the extension has proper permissions (check `chrome://extensions/`)
- Verify that the URLs in `src/data/topics.js` are valid

### Icons don't show
- The icons are SVG files converted to PNG
- They should be copied automatically during build
- Check that `dist/` contains `icon16.png`, `icon48.png`, and `icon128.png`

## Development Mode

For development with hot reload:

```bash
npm run dev
```

This opens the popup in a browser window at `http://localhost:5173`. Note that Chrome APIs won't work in development mode - you need to load the built extension to test Chrome-specific features.

## Updating the Extension

After making changes:

1. Run `npm run build`
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Pandora Box card
4. The changes should now be live

## Permissions Explained

The extension requires these permissions:

- **tabs**: To create and manage browser tabs
- **tabGroups**: To organize tabs into color-coded groups
- **storage**: To save user preferences (future feature)
- **host_permissions (<all_urls>)**: To open any URL the user specifies

All permissions are used solely for the extension's core functionality and no data is collected or sent externally.
