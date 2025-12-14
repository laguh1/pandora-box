# Build Variants Guide

This extension supports two build variants: **Customised** and **Default**.

## Data Files

### `/src/data/customised.js`
Personal version with your custom topics and URLs (Deutsch, Crochet, Movies, Social Media, Miscellaneous).

### `/src/data/default.js`
Generic version with standard topics (Productivity, Development, News, Social Media, Miscellaneous).

## How to Edit URLs

1. **For your personal version**: Edit `/src/data/customised.js`
2. **For the default version**: Edit `/src/data/default.js`

Simply modify the `urls` array in each topic:

```javascript
{
  id: 'movies',
  name: 'Movies',
  icon: '🎬',
  color: '#9E1C60',
  chromeColor: 'pink',
  urls: [
    { id: 1, title: 'IMDb', url: 'https://www.imdb.com' },
    { id: 2, title: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com' },
    // Add more URLs here
  ]
}
```

## Build Commands

### Development

```bash
# Run default version in development
npm run dev

# Run customised version in development
npm run dev:customised
```

### Production Builds

```bash
# Build default version → outputs to /dist
npm run build:default

# Build customised version → outputs to /dist-customised
npm run build:customised

# Build both versions at once
npm run build:both
```

## Output Directories

- **Default build**: `dist/`
- **Customised build**: `dist-customised/`

Each directory contains a complete, standalone version of the extension ready to be loaded into Chrome.

## Loading into Chrome

1. Build the version you want (customised or default)
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select either `dist/` or `dist-customised/` directory

## Quick Start

**To use your personal version:**
```bash
npm run build:customised
# Then load dist-customised/ in Chrome
```

**To distribute the standard version:**
```bash
npm run build:default
# Then load dist/ in Chrome or package it for distribution
```
