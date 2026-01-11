# Pandora Box 🎁

A beautiful, intuitive Chrome extension for organizing and accessing your favorite websites. Stop hunting through bookmarks and start enjoying instant access to all your important links, beautifully organized by topic with color-coded Chrome tab groups.

## ✨ Features

- **🎯 Quick Access Cards**: View up to 4 most-used links directly on each topic card
- **🎨 5 Beautiful Themes**: Ocean Blue, Forest Green, Rose Garden, Vibrant Pink, Minimal Grey
- **📂 Smart Organization**: Group websites by topics (Work, Learning, Entertainment, etc.)
- **🗂️ Chrome Tab Groups**: Open multiple links in organized, color-coded tab groups
- **✏️ Full Customization**: Add, edit, delete links and topics - maximum 10 links per topic
- **💾 Auto-Save**: All changes saved automatically to Chrome local storage
- **🔄 Drag & Drop**: Reorder topics with simple drag and drop
- **📌 Quick Pin**: Add current page to any topic with one click
- **🎨 Dynamic Colors**: Link colors inside cards change with your theme
- **📜 Auto-Scroll**: Popup scrolls automatically when you have many topics

## 📖 Documentation

- **[Chrome Store Description](CHROME_STORE_DESCRIPTION.md)** - Complete description for Chrome Web Store listing
- **[User Instructions](USER_INSTRUCTIONS.md)** - Comprehensive user guide with screenshots
- **[Customization Guide](CUSTOMIZATION_GUIDE.md)** - Theming and customization details
- **[Technical Documentation](CLAUDE.md)** - Implementation plan and architecture

## 🚀 Quick Start for Users

1. Install the extension from Chrome Web Store (or load unpacked for development)
2. Click the Pandora Box icon in your toolbar
3. Click any link box to open that website
4. Click a topic card to see all links
5. Use the gear icon (⚙️) to customize themes and add topics

**For detailed instructions**, see [USER_INSTRUCTIONS.md](USER_INSTRUCTIONS.md)

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Mode

```bash
# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the popup UI in a browser.

### Build for Production

```bash
# Build the extension
npm run build
```

This creates a `dist/` folder with the production-ready extension.

## Loading the Extension in Chrome

1. Build the extension with `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `dist/` folder from this project
6. The Pandora Box extension should now appear in your extensions bar

## Usage

1. Click the Pandora Box icon in your Chrome toolbar
2. Select a topic card (Deutsch, Crochet, Movies, or Social Media)
3. Choose to either:
   - **Open All in Group**: Opens all URLs in a new tab group
   - **Select URLs**: Pick specific URLs to open

All opened tabs will be organized in a color-coded Chrome tab group matching the topic.

## Project Structure

```
pandora-box/
├── public/
│   ├── manifest.json          # Chrome extension manifest
│   └── icon.svg               # Extension icon
├── src/
│   ├── components/
│   │   ├── TopicCard.jsx      # Topic card component
│   │   ├── TopicModal.jsx     # Modal for topic actions
│   │   ├── URLList.jsx        # URL selection list
│   │   └── URLCheckbox.jsx    # Individual URL checkbox
│   ├── data/
│   │   └── topics.js          # Topics and URLs configuration
│   ├── utils/
│   │   └── chromeAPI.js       # Chrome API utilities
│   ├── styles/
│   │   ├── global.css         # Global styles
│   │   └── variables.css      # CSS variables
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── package.json
├── vite.config.js
├── CLAUDE.md                  # Detailed implementation plan
├── history.md                 # Project history
└── plan.md                    # Project plan
```

## Customization

### Changing Themes

1. Click the settings icon (screw) in the top-right corner
2. Select "🎨 Change Theme"
3. Choose from 5 available color palettes
4. Your selection is saved automatically

See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed information about themes and drag-and-drop.

### Reordering Topic Cards

Simply drag and drop topic cards to rearrange them. Your preferred order is saved automatically.

### Adding New Topics

Click the settings icon and select "+ Add New Topic", or edit `src/data/topics.js` to add new topics or modify URLs:

```javascript
{
  id: 'your-topic',
  name: 'Your Topic',
  color: '#HexColor',
  chromeColor: 'red', // Chrome supported color
  urls: [
    { id: 1, title: 'Site Name', url: 'https://example.com' }
  ]
}
```

### Changing Colors

Modify CSS variables in `src/styles/variables.css` to change the theme colors.

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool
- **Chrome Extension Manifest V3**: Extension API
- **CSS**: Styling

## License

MIT

Authored by: laguh (Joana Socrates)

## Support

For issues and feature requests, please check the project documentation in `CLAUDE.md` and `plan.md`.
