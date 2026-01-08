# Pandora Box - Customization Guide

This guide explains the new customization features added to Pandora Box: theme palettes and drag-and-drop reordering.

## Theme Palettes

### Overview
Pandora Box now supports 5 color palettes that you can switch between to customize the appearance of your extension.

### Available Palettes

1. **Ocean Blue (Current)** - The original dark blue theme
   - Background: Dark Blue (#213448)
   - Accents: Medium Blue, Light Blue, Cream/Beige

2. **Forest Green** - Natural green tones
   - Background: Dark Grey-Blue (#3B4953)
   - Accents: Dark Green, Medium Green, Light Cream-Green

3. **Rose Garden** - Warm rose and brown tones
   - Background: Dark Purple-Brown (#574964)
   - Accents: Rose Brown, Light Rose, Peach

4. **Vibrant Pink** - Bold and energetic colors
   - Background: Dark Magenta (#640D5F)
   - Accents: Bright Pink, Light Pink, Bright Yellow

5. **Minimal Grey** - Clean and professional
   - Background: Dark Grey (#393E46)
   - Accents: Grey-Blue, Light Grey, Off-White

### How to Change Themes

1. Click the **Settings** icon (screw icon) in the top-right corner
2. Click **"🎨 Change Theme"**
3. Select your preferred palette from the list
4. The theme will be applied immediately
5. Your selection is saved and will persist across sessions

### How Themes Work

- Each palette defines colors for the background, primary elements, and three accent colors
- Topic cards automatically rotate through the three accent colors
- When you switch themes, all topic cards update to match the new palette
- The theme is stored in Chrome's local storage

## Drag-and-Drop Reordering

### Overview
You can now reorder your topic cards by dragging and dropping them to your preferred position.

### How to Reorder Topics

1. **Click and hold** on any topic card
2. **Drag** the card to the desired position
3. **Drop** it by releasing the mouse button
4. The new order is automatically saved

### Visual Feedback

- **While dragging**: The card becomes semi-transparent and slightly smaller
- **Drop target**: Cards show a dashed border when you hover over them during drag
- **Cursor**: Changes to a "move" cursor when hovering, and "grabbing" when dragging

### Technical Details

- Uses HTML5 Drag and Drop API
- Order is persisted in Chrome's local storage
- Works seamlessly with the existing topic management features

## Implementation Details

### File Structure

```
src/
├── data/
│   └── palettes.js          # Palette definitions and color logic
├── components/
│   ├── SettingsModal.jsx    # Updated with palette selector
│   ├── SettingsModal.css    # Styles for palette UI
│   ├── TopicCard.jsx        # Updated with drag-and-drop
│   └── TopicCard.css        # Drag-and-drop styles
└── App.jsx                  # Palette and DnD state management
```

### Key Functions

#### Palette System (`src/data/palettes.js`)

- `getPalette(id)` - Get palette by ID
- `applyPalette(palette)` - Apply palette to CSS variables
- `assignTopicColors(topics, palette)` - Assign colors to topics based on palette

#### Drag and Drop (App.jsx)

- `handleDragStart(e, topic)` - Start dragging
- `handleDragEnd()` - End dragging
- `handleDragOver(e)` - Handle drag over
- `handleDrop(e, targetTopic)` - Handle drop and reorder

### Storage Keys

- `palette` - Stores the current palette ID (e.g., 'current', 'forest', 'rose')
- `topics` - Stores the topics array with their current order

## Adding Custom Palettes

To add your own palette, edit `src/data/palettes.js`:

```javascript
{
  id: 'my-palette',
  name: 'My Custom Palette',
  colors: {
    background: '#HEXCODE',  // Main background
    primary: '#HEXCODE',     // Header/primary elements
    accent1: '#HEXCODE',     // First accent color
    accent2: '#HEXCODE',     // Second accent color
    accent3: '#HEXCODE',     // Third accent color
    text: '#FFFFFF',         // Main text color
    textLight: '#HEXCODE'    // Secondary text color
  },
  chromeColors: {
    accent1: 'blue',   // Chrome tab group color
    accent2: 'cyan',   // Chrome tab group color
    accent3: 'grey'    // Chrome tab group color
  }
}
```

### Chrome Tab Group Colors

Chrome supports these tab group colors:
- `grey`, `blue`, `red`, `yellow`, `green`, `pink`, `purple`, `cyan`, `orange`

## Browser Compatibility

- **Palette System**: Works in all modern browsers (Chrome, Edge, Firefox)
- **Drag and Drop**: Uses HTML5 Drag and Drop API (supported in all modern browsers)
- **Chrome Extension**: Requires Chrome or Edge (Chromium-based)

## Future Enhancements

Potential improvements for future versions:

1. **Custom Palette Creator**: Allow users to create their own palettes via UI
2. **Palette Import/Export**: Share palettes between users
3. **Per-Topic Color Override**: Let users customize individual topic colors
4. **Animation Options**: Add more drag-and-drop animations
5. **Multi-Select Drag**: Drag multiple topics at once
6. **Palette Preview**: Live preview before applying
7. **Dark Mode Toggle**: Quick toggle between light/dark variants

## Troubleshooting

### Theme Not Applying
- Refresh the extension popup
- Check browser console for errors
- Try clearing Chrome storage and reloading

### Drag and Drop Not Working
- Make sure you're clicking and holding on the topic card itself
- Try disabling other extensions that might interfere
- Check that JavaScript is enabled

### Colors Look Wrong
- Ensure you're using the latest build
- Try switching to a different palette and back
- Clear browser cache and rebuild

## Credits

Color palettes sourced from [ColorHunt.co](https://colorhunt.co):
- Forest Green: https://colorhunt.co/palette/ebf4dd90ab8b5a78633b4953
- Rose Garden: https://colorhunt.co/palette/5749649f8383c8aaaaffdab3
- Vibrant Pink: https://colorhunt.co/palette/640d5fd91656ee66a6ffeb55
- Minimal Grey: https://colorhunt.co/palette/f7f7f7eeeeee393e46929aab

Implemented by: laguh (Joana Socrates)
