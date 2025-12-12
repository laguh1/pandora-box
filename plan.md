# Pandora Box - Chrome Extension Plan

## Overview
A React-based Chrome extension that provides quick access to categorized webpage shortcuts through a popup interface. Users can open URLs individually or all at once in organized Chrome tab groups.

## Core Features

### 1. Popup Interface
- Main popup window displaying topic cards
- Purple (#800080) as primary brand color
- Responsive grid layout for topic cards
- Clean, modern UI design

### 2. Topic Categories (Initial Set)
Each topic has its own color scheme:

1. **Deutsch** - Dark Red (#8B0000)
2. **Crochet** - Olive Green (#556B2F)
3. **Movies** - Brown (#654321)
4. **Social Media** - Greenish Blue (#48D1CC)

### 3. User Interactions
When a user clicks on a topic card:
1. Show a modal/dropdown with two options:
   - **Open All in Group**: Opens all URLs in a new Chrome tab group with the topic's color
   - **Select URLs**: Shows a list of all URLs with checkboxes for selective opening

### 4. URL Management
- Each topic contains multiple webpage shortcuts
- URLs can be selected individually
- Selected URLs open in a new Chrome tab group
- Tab groups are color-coded by topic

## Technical Architecture

### Technology Stack
- **Framework**: React 18+
- **Build Tool**: Vite or Create React App
- **Styling**: CSS Modules or Styled Components
- **State Management**: React Context API or Zustand
- **Chrome APIs**: chrome.tabs, chrome.tabGroups

### Project Structure
```
pandora-box/
├── public/
│   ├── manifest.json
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── src/
│   ├── components/
│   │   ├── TopicCard.jsx
│   │   ├── TopicModal.jsx
│   │   ├── URLList.jsx
│   │   └── URLCheckbox.jsx
│   ├── data/
│   │   └── topics.js
│   ├── utils/
│   │   ├── chromeAPI.js
│   │   └── storage.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── vite.config.js (or webpack.config.js)
```

## Manifest.json Configuration
```json
{
  "manifest_version": 3,
  "name": "Pandora Box",
  "version": "1.0.0",
  "description": "Quick access to categorized webpage shortcuts",
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "permissions": [
    "tabs",
    "tabGroups",
    "storage"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

## Data Structure

### Topics Configuration
```javascript
const topics = [
  {
    id: 'deutsch',
    name: 'Deutsch',
    color: '#8B0000',
    urls: [
      { id: 1, title: 'Deutsche Welle', url: 'https://www.dw.com' },
      { id: 2, title: 'Goethe Institut', url: 'https://www.goethe.de' },
      // ... more URLs
    ]
  },
  {
    id: 'crochet',
    name: 'Crochet',
    color: '#556B2F',
    urls: [
      { id: 1, title: 'Ravelry', url: 'https://www.ravelry.com' },
      { id: 2, title: 'Crochet Pattern', url: 'https://www.crochetpatterncentral.com' },
      // ... more URLs
    ]
  },
  {
    id: 'movies',
    name: 'Movies',
    color: '#654321',
    urls: [
      { id: 1, title: 'IMDb', url: 'https://www.imdb.com' },
      { id: 2, title: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com' },
      // ... more URLs
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media',
    color: '#48D1CC',
    urls: [
      { id: 1, title: 'Twitter', url: 'https://twitter.com' },
      { id: 2, title: 'Instagram', url: 'https://www.instagram.com' },
      // ... more URLs
    ]
  }
];
```

## Component Breakdown

### 1. App.jsx
- Main container component
- Renders grid of TopicCard components
- Manages global state (selected topic, modal visibility)
- Handles theme and purple color scheme

### 2. TopicCard.jsx
- Individual topic card component
- Props: topic name, color, icon
- Click handler to open modal
- Styled with topic-specific background color
- Hover effects and animations

### 3. TopicModal.jsx
- Modal/dropdown overlay when topic is clicked
- Two action buttons:
  - "Open All in Group"
  - "Select URLs"
- Handles mode switching (select mode vs. open all mode)

### 4. URLList.jsx
- Displays list of URLs for a topic
- Shows in "Select URLs" mode
- Contains URLCheckbox components
- "Open Selected" button at bottom

### 5. URLCheckbox.jsx
- Individual URL item with checkbox
- Props: url title, url, checked state
- Toggle selection handler
- Displays favicon if available

## Chrome API Integration

### Opening URLs in Tab Groups
```javascript
// utils/chromeAPI.js
export async function openURLsInGroup(urls, groupName, color) {
  const tabIds = [];

  // Create tabs
  for (const url of urls) {
    const tab = await chrome.tabs.create({ url, active: false });
    tabIds.push(tab.id);
  }

  // Create group
  const groupId = await chrome.tabs.group({ tabIds });

  // Update group properties
  await chrome.tabGroups.update(groupId, {
    title: groupName,
    color: convertColorToChrome(color)
  });
}

function convertColorToChrome(hexColor) {
  // Map hex colors to Chrome's supported colors:
  // grey, blue, red, yellow, green, pink, purple, cyan, orange
  const colorMap = {
    '#8B0000': 'red',      // Deutsch
    '#556B2F': 'green',    // Crochet
    '#654321': 'orange',   // Movies
    '#48D1CC': 'cyan'      // Social Media
  };
  return colorMap[hexColor] || 'grey';
}
```

### Storage for User Preferences
```javascript
// utils/storage.js
export async function saveTopics(topics) {
  await chrome.storage.sync.set({ topics });
}

export async function loadTopics() {
  const result = await chrome.storage.sync.get('topics');
  return result.topics || defaultTopics;
}
```

## UI/UX Design Specifications

### Color Palette
- **Primary (Purple)**: #800080 - App header, borders, primary buttons
- **Deutsch**: #8B0000 (Dark Red)
- **Crochet**: #556B2F (Olive Green)
- **Movies**: #654321 (Brown)
- **Social Media**: #48D1CC (Greenish Blue)
- **Background**: #F5F5F5 (Light gray)
- **Text**: #333333 (Dark gray)
- **White**: #FFFFFF

### Layout
- Popup dimensions: 400px width x 600px height
- Topic cards: 2x2 grid layout
- Card dimensions: ~180px x 180px with 10px gap
- Modal overlay: Full popup coverage with semi-transparent backdrop

### Typography
- Font family: 'Segoe UI', 'Roboto', sans-serif
- Card titles: 18px, bold
- URL items: 14px, regular
- Buttons: 14px, semi-bold

### Interactions
1. **Hover**: Topic cards slightly scale up (1.05x) with subtle shadow
2. **Click**: Smooth modal fade-in animation
3. **Checkbox**: Custom styled with topic color when checked
4. **Buttons**: Purple background with white text, hover state darkens

## Implementation Phases

### Phase 1: Project Setup
1. Initialize React project with Vite
2. Configure manifest.json for Chrome extension
3. Set up project structure
4. Install dependencies (React, styling library)
5. Create basic build configuration

### Phase 2: Core Components
1. Build App.jsx with grid layout
2. Create TopicCard component with styling
3. Implement TopicModal with two-option view
4. Build URLList and URLCheckbox components
5. Add purple theme and topic-specific colors

### Phase 3: Chrome API Integration
1. Implement openURLsInGroup function
2. Add tab creation logic
3. Implement tab grouping with colors
4. Test Chrome APIs in extension context

### Phase 4: Data Management
1. Create topics.js with initial data
2. Implement Chrome storage integration
3. Add data loading on popup open
4. Create CRUD operations for topics (future enhancement)

### Phase 5: Polish & Testing
1. Add animations and transitions
2. Implement error handling
3. Test with various URL counts
4. Cross-browser compatibility (Chrome, Edge)
5. Performance optimization
6. Icon creation

### Phase 6: Future Enhancements
1. Add/edit/delete topics via settings page
2. Add/edit/delete URLs within topics
3. Drag-and-drop URL reordering
4. Import/export topic configuration
5. Search functionality
6. Keyboard shortcuts
7. Dark mode support
8. Custom topic icons
9. Recent/favorite URLs tracking

## Development Commands

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Load extension in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the dist/ folder
```

## Testing Strategy

### Manual Testing Checklist
- [ ] All topic cards display correctly
- [ ] Clicking topic opens modal
- [ ] "Open All" creates tab group with all URLs
- [ ] "Select URLs" shows checkbox list
- [ ] Selected URLs open in tab group
- [ ] Tab groups have correct names and colors
- [ ] Modal closes properly
- [ ] Responsive layout works
- [ ] Colors match specification
- [ ] No console errors

### Edge Cases
- Empty URL list
- Single URL in topic
- Large number of URLs (20+)
- Invalid URLs
- Duplicate URLs
- Network failures

## File Size Considerations
- Keep popup.html minimal
- Bundle size should be < 1MB
- Optimize images/icons
- Use SVG for icons when possible

## Browser Compatibility
- Primary: Chrome (Manifest V3)
- Secondary: Edge (Chromium-based)
- Future: Firefox with WebExtensions

## Security Considerations
- Validate all URLs before opening
- Use Content Security Policy in manifest
- Sanitize user input if adding custom URLs
- No eval() or inline scripts
- HTTPS URLs preferred

## Performance Goals
- Popup opens in < 100ms
- Modal animations at 60fps
- Tab group creation < 500ms for 10 URLs
- Memory footprint < 50MB

## Accessibility
- Keyboard navigation support
- ARIA labels for interactive elements
- Sufficient color contrast ratios
- Focus indicators on interactive elements
- Screen reader friendly

## Success Metrics
- User can access topic URLs in < 2 clicks
- Tab organization improves workflow
- Extension remains lightweight and fast
- Intuitive UI requires no documentation

---

## Improvements & Updates

### Session 1: UI Refinements (2025-12-12)

#### Card Dimension Update
**Status**: Completed
**Change**: Updated card dimensions from 180px x 180px to 202px x 80px (horizontal orientation)
- New card size: 202px width x 80px height
- Gap maintained: 10px
- Layout: Single column (one card per line)
- Popup dimensions: 222px width x 500px height

**Rationale**: Horizontal cards in single-column layout provide cleaner, more streamlined interface.

#### Typography Update
**Status**: Completed
**Change**: Font family changed to Roboto, removed all bold fonts
- Font family: Roboto (loaded from Google Fonts)
- All font-weight changed from 400/500/600/700 to 400 (regular)
- Cleaner, more modern appearance

#### Development Testing Setup
**Status**: Completed
**Feature**: Enable browser-based testing before building extension
- Use `npm run dev` to test in browser at localhost:5173
- Preview popup UI without loading as extension
- Faster iteration on design changes
- Hot reload for instant feedback

**Implementation**:
- Vite dev server already configured
- Test at http://localhost:5173
- Chrome APIs will show warnings but UI will be fully functional
- Build with `npm run build` when ready for extension testing

#### Color Palette Update
**Status**: Completed
**Change**: Applied Color Hunt palette (#11224E, #F87B1B, #CBD99B, #EEEEEE)
- Primary color: #11224E (Dark Navy Blue) - used for header and Movies topic
- Secondary color: #F87B1B (Bright Orange) - used for Deutsch and Social Media topics
- Tertiary color: #CBD99B (Soft Sage Green) - used for Crochet topic
- Background: #EEEEEE (Light Grey)
- Text color: Dark Navy (#11224E)
- Border color: Sage Green (#CBD99B)

**Source**: https://colorhunt.co/palette/11224ef87b1bcbd99beeeeee

#### Pending Improvements
- [ ] Dark mode support
- [ ] Custom topic icons (not just colors)
- [ ] Drag-and-drop URL reordering
- [ ] Settings page for managing topics/URLs
- [ ] Keyboard shortcuts
- [ ] Search functionality within topics
- [ ] Recent/favorite URLs tracking
- [ ] Import/export configuration
