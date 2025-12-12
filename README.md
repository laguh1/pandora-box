# Pandora Box - Chrome Extension

A React-based Chrome extension that provides quick access to categorized webpage shortcuts through a popup interface.

## Features

- **Topic Cards**: Organized shortcuts grouped by topics (Deutsch, Crochet, Movies, Social Media)
- **Purple Theme**: Beautiful purple color scheme with topic-specific accent colors
- **Two Opening Modes**:
  - Open All: Opens all URLs in a Chrome tab group
  - Select URLs: Choose specific URLs to open with checkboxes
- **Chrome Tab Groups**: Automatically organizes opened tabs in color-coded groups

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

### Adding New Topics

Edit `src/data/topics.js` to add new topics or modify URLs:

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

## Support

For issues and feature requests, please check the project documentation in `CLAUDE.md` and `plan.md`.
