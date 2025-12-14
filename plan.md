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

### Session 2: Enhanced URL Management (2025-12-14)
**Status**: Completed

#### In-Topic URL Management
**Feature**: Move URL add/delete functionality inside topic view
**Status**: ✅ Completed

**Implementation Details**:
1. **Removed URL Management from Top-Level**:
   - Removed "Add Link to Existing Topic" from Settings modal
   - Settings modal now only handles adding new topics
   - Screw icon remains for settings (adding topics only)

2. **Enhanced Topic Modal**:
   - Added ➕ button in topic modal header to add URLs
   - Added 📌 button to quickly add the current page being viewed
   - Added ✕ close button
   - All URL management now inside each topic's view

3. **URL Management UI**:
   - Each URL has a 🗑️ delete button in select mode
   - Add URL form appears within topic modal (separate mode)
   - Form includes fields for title and URL
   - Maintains topic color scheme throughout

**Files Modified**:
- `/src/App.jsx` - Added `handleDeleteUrl` and updated props
- `/src/components/SettingsModal.jsx` - Removed add link functionality
- `/src/components/TopicModal.jsx` - Added URL management modes and handlers
- `/src/components/URLList.jsx` - Added delete functionality
- `/src/components/URLCheckbox.jsx` - Added delete button UI
- `/src/components/TopicModal.css` - Styled new UI elements

#### Add Current Page to Topic
**Feature**: Quick-add the currently active webpage to a topic
**Status**: ✅ Completed

**Implementation**:
- Added 📌 "Add Current Page" button in topic modal header
- Uses `chrome.tabs.query({ active: true, currentWindow: true })`
- Automatically captures URL and page title
- Uses existing "tabs" permission in manifest.json

#### Clickable URL Titles (2025-12-14)
**Feature**: Click URL titles to open in new tab
**Status**: ✅ Completed

**Implementation**:
- URL titles are now clickable buttons
- Opens URL in new tab using `chrome.tabs.create()`
- Fallback to `window.open()` for development
- Hover effect: changes to sage green color with underline
- Prevents label click propagation

**Files Modified**:
- `/src/components/URLCheckbox.jsx` - Added `handleOpenUrl` function
- `/src/components/URLCheckbox.css` - Styled clickable titles

#### Topic Icons (2025-12-14)
**Feature**: Display relevant icons next to topic names
**Status**: ✅ Completed

**Icons Added**:
- 🇩🇪 Deutsch (German flag)
- 🧶 Crochet (Yarn ball)
- 🎬 Movies (Movie clapperboard)
- 💬 Social Media (Speech bubble)
- 📦 Miscellaneous (Package box)
- 📁 Default for new topics (Folder)

**Files Modified**:
- `/src/data/topics.js` - Added icon property to each topic
- `/src/components/TopicCard.jsx` - Display icon alongside name
- `/src/components/TopicCard.css` - Styled icon display (20px font size)

#### Card Dimension Update
**Status**: ✅ Completed
**Change**: Updated card height to 50px
- Card size: 202px width x 50px height
- Horizontal orientation maintained

#### Consistent Theme Blue Backgrounds (2025-12-14)
**Feature**: Apply dark navy blue background throughout
**Status**: ✅ Completed

**Changes**:
- App background: #11224E (Dark Navy Blue)
- Topic modal background: #11224E
- Settings modal background: #11224E (already set)
- URL list background: #11224E
- All text updated to white (#FFFFFF) for contrast
- Input fields: #1A3366 (lighter blue) background
- Hover states: #1A3366 (lighter blue)
- Secondary buttons: transparent with white border

**Files Modified**:
- `/src/components/TopicModal.css` - Updated backgrounds and text colors
- `/src/components/URLList.css` - Updated backgrounds and text colors
- `/src/components/URLCheckbox.css` - Updated text colors

#### Topic Color Updates (2025-12-14)
**Feature**: Update topic box colors from palette
**Status**: ✅ Completed

**Current Topic Colors**:
- 🇩🇪 Deutsch: #E68369 (Coral Pink) - white text
- 🧶 Crochet: #CBD99B (Sage Green) - dark text
- 🎬 Movies: #9E1C60 (Dark Magenta) - white text
- 💬 Social Media: #F5AD18 (Gold/Yellow) - dark text
- 📦 Miscellaneous: #006989 (Deep Teal) - white text

**New Topic Color Rotation**:
1. #E68369 (Coral Pink)
2. #CBD99B (Sage Green)
3. #9E1C60 (Dark Magenta)
4. #F5AD18 (Gold/Yellow)
5. #006989 (Deep Teal)

**Files Modified**:
- `/src/data/topics.js` - Updated all topic colors
  - Deutsch: #E68369 (Coral Pink)
  - Movies: #9E1C60 (Dark Magenta)
  - Miscellaneous: #006989 (Deep Teal)
- `/src/components/TopicCard.jsx` - Updated dark text logic (only Crochet and Social Media use dark text)
- `/src/App.jsx` - Updated available colors array

**Important Notes**:
- Topic boxes NEVER use the background blue (#11224E)
- Each topic has its own distinct color from the palette
- Background blue is only for app/modal backgrounds

#### Purple Icon as Extension Default (2025-12-14)
**Feature**: Use purple Pandora Box icon as default extension icon
**Status**: ✅ Completed

**Implementation**:
- Converted openbox.png orange to purple (#92487A)
- Created multiple sizes (16x16, 48x48, 128x128)
- Replaced extension icons in `/public/` folder
- Extension icon now displays purple Pandora Box in toolbar

**Files Created**:
- `/public/icon16.png` - 16x16 purple icon
- `/public/icon48.png` - 48x48 purple icon
- `/public/icon128.png` - 128x128 purple icon
- `/openbox_purple.png` - Purple source image
- `/convert_purple_icon.py` - Python script for color conversion and resizing

**Technical Details**:
- Used Pillow (PIL) and NumPy for color conversion
- Converted orange (#F87B1B) to purple (#92487A)
- LANCZOS resampling for high quality resizing
- Icons match manifest.json configuration

**Color Conversion Process**:
- Identified orange pixels using RGB tolerance matching
- Replaced with purple color (#92487A = RGB(146, 72, 122))
- Preserved transparency (alpha channel)

#### Fix "Add Current Page" Functionality (2025-12-14)
**Feature**: Fix the 📌 button to correctly capture current browser tab
**Status**: ✅ Completed

**Problem**:
- When clicking 📌 from extension popup, `currentWindow: true` returns the popup window (no tabs)
- Need to get the actual browser tab user was viewing

**Solution**:
- Changed `chrome.tabs.query({ active: true, currentWindow: true })`
- To `chrome.tabs.query({ active: true, lastFocusedWindow: true })`
- Now correctly captures the browser tab behind the popup

**Files Modified**:
- `/src/components/TopicModal.jsx` - Updated `handleAddCurrentPage` function (line 43)

#### Data Persistence with Chrome Storage (2025-12-14)
**Feature**: Persist user changes across app restarts
**Status**: ✅ Completed

**Implementation**:
- Uses `chrome.storage.local` API to save/load topics
- Loads saved data on app initialization
- Automatically saves whenever topics change (add/delete topic, add/delete URL)
- Falls back to default topics if no saved data

**How It Works**:
1. **On App Start**: Loads topics from Chrome storage
2. **On Any Change**: Automatically saves to Chrome storage
3. **Data Saved**: All topics, URLs, colors, icons, names

**What Persists**:
- ✅ New topics created by users
- ✅ URLs added to any topic
- ✅ URLs deleted from topics
- ✅ All topic properties (name, icon, color, etc.)

**Files Modified**:
- `/src/App.jsx` - Added two `useEffect` hooks for load/save
  - Lines 15-30: Load data on mount
  - Lines 33-45: Save data on topics change
  - Added `isLoaded` state flag to prevent saving during initial load

**Technical Details**:
- Uses `chrome.storage.local.get(['topics'])` to load
- Uses `chrome.storage.local.set({ topics })` to save
- Async/await for all storage operations
- Error handling with console logging

#### UI Refinements (2025-12-14)
**Feature**: Polish icon button appearance
**Status**: ✅ Completed

**Changes**:
- Increased icon button font size from 16px to 20px
- Ensured white color for ➕ and 📌 buttons
- Consolidated duplicate CSS rules

**Files Modified**:
- `/src/components/TopicModal.css` - Updated `.topic-modal__icon-btn` styles

#### Topic Modal UX Improvements (2025-12-14)
**Feature**: Redesigned URL selection interface for better usability
**Status**: ✅ Completed

**Changes Made**:
- ✅ Hidden URL address from display (show only title)
- ✅ Removed "Select URLs to open" text instruction
- ✅ Added Select All/Deselect All checkbox in header
- ✅ Replaced "Select All" button with "Open" button in header
- ✅ Removed bottom "Open X selected" button
- ✅ Cleaner, more compact header layout

**Files Modified**:
- `/src/components/URLCheckbox.jsx` - Removed URL address display (line 37)
- `/src/components/URLList.jsx` - Redesigned header with checkbox and Open button
  - Removed title text
  - Added checkbox for Select All/Deselect All
  - Moved Open button to header
  - Removed footer section
- `/src/components/URLList.css` - Updated styles for new layout
  - New `.url-list__select-all-label` for checkbox and text
  - Updated `.url-list__open-button` for header placement
  - Removed `.url-list__footer` styles
- `/src/components/URLCheckbox.css` - Simplified content layout
  - Changed content from column to row alignment
  - Removed URL display styles

**User Benefits**:
- Cleaner, less cluttered interface
- More intuitive checkbox for selecting all URLs
- Quick access to Open button without scrolling
- Focus on URL titles without distracting URLs

#### Build Variants with Customized/Default Data (2025-12-14)
**Feature**: Support two build variants with different starting data
**Status**: ✅ Completed

**Implementation**:
- ✅ Created two separate data files
- ✅ Configured environment-based builds
- ✅ Separate output directories for each variant

**Files Created**:
- `/src/data/customised.js` - Personal topics (Deutsch, Crochet, Movies, Social Media, Miscellaneous)
- `/src/data/default.js` - Generic topics (Productivity, Development, News, Social Media, Miscellaneous)
- `/BUILD_VARIANTS.md` - Complete guide for using build variants

**Files Modified**:
- `/vite.config.js` - Added support for VITE_BUILD_VARIANT environment variable
  - Outputs to `dist/` for default build
  - Outputs to `dist-customised/` for customised build
- `/src/App.jsx` - Conditionally imports data based on build variant
- `/package.json` - Added build scripts:
  - `npm run build:default` - Build generic version
  - `npm run build:customised` - Build personal version
  - `npm run build:both` - Build both versions
  - `npm run dev:customised` - Run customised version in dev mode

**How to Use**:
1. Edit `/src/data/customised.js` for your personal URLs
2. Edit `/src/data/default.js` for generic distribution URLs
3. Run `npm run build:customised` to build your version
4. Run `npm run build:default` to build distribution version
5. Each build outputs to its own directory

**User Benefits**:
- Easy to maintain two versions from single codebase
- Simple file editing to change URLs
- Clean separation of personal and public versions
- Both versions can coexist without conflicts

#### Pending Improvements

**URL Management Improvements**:
- [ ] Allow users to edit/rename URL titles after adding them

**Other Improvements**:
- [ ] Dark mode support
- [ ] Custom topic icons (not just colors)
- [ ] Drag-and-drop URL reordering
- [ ] Settings page for managing topics/URLs
- [ ] Keyboard shortcuts
- [ ] Search functionality within topics
- [ ] Recent/favorite URLs tracking
- [ ] Import/export configuration
