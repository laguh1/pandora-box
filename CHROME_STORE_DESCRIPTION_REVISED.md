# Pandora Box - Chrome Web Store Description (REVISED - Spam Compliant)

## Short Description (132 characters max)
Topic-based link organizer with card interface. Access up to 4 links per card, open multiple URLs in Chrome tab groups by color.

## Detailed Description (Up to 16,000 characters)

### Overview

Pandora Box is a Chrome extension that organizes website links into topic-based cards. Each card displays up to 4 quick-access links directly on the main interface. Click any link to open it, or use the topic modal to open multiple links simultaneously in color-coded Chrome tab groups.

### Core Functionality

**Card-Based Interface**
- Each topic displays as a card in the popup
- Cards show up to 4 links directly (no clicking required to see them)
- Topics with more than 4 links show a "More" button
- Maximum 10 links per topic

**Topic Modal System**
- Click a card to open its modal view
- View all links in the topic with checkboxes
- Select specific links to open together
- Edit link titles and URLs
- Delete unwanted links
- Add current page with pin button
- Add new links manually

**Chrome Tab Groups Integration**
- Selected links open in a new Chrome tab group
- Tab groups are labeled with the topic name
- Groups use Chrome's native color coding
- Helps organize multiple related tabs

**Theme System**
- 5 color palette options: Ocean Blue, Forest Green, Rose Garden, Vibrant Pink, Minimal Grey
- Themes affect card colors, link colors, and UI elements
- Topic cards cycle through 3 accent colors from the selected palette
- Theme selection persists across sessions

**Drag and Drop**
- Reorder topic cards by dragging
- Position is saved automatically to Chrome storage
- No page reload required

**Storage**
- Uses Chrome's local storage API
- Optional: Enable Chrome Sync to sync across devices signed into your Chrome profile
- Data remains local, no external servers

### Technical Specifications

**Permissions Used:**
- `tabGroups`: Required to create and label Chrome tab groups
- `storage`: Required to save topics, links, and theme preferences locally

**Storage Limits:**
- Maximum 10 links per topic
- No hard limit on number of topics
- Subject to Chrome's local storage quotas (approximately 5MB)

**Compatibility:**
- Requires Chrome 89 or later (for tab groups API)
- Manifest V3 compliant

### Specific Use Cases

This extension is designed for users who:
- Access the same set of websites repeatedly for different contexts (work projects, hobbies, research topics)
- Want visual cards instead of nested bookmark folders
- Use Chrome tab groups for organization
- Need quick access to 4 most-used links per category without opening menus
- Prefer theme customization for visual organization

### How It Works

**Initial Setup:**
1. Install extension
2. Click extension icon in toolbar
3. Extension opens with sample topics (Deutsch, Crochet, Movies, Social Media)
4. Customize by adding/removing topics and links via settings gear icon

**Daily Usage:**
1. Click extension icon
2. Click any of the 4 visible links on a card to open that site
3. Or click card/More button to open topic modal
4. In modal: select multiple links and click "Open Selected"
5. Links open in a labeled, color-coded Chrome tab group

**Customization:**
1. Click gear icon in top-right
2. Add topics, change theme palette
3. Drag cards to reorder
4. Edit/delete links via modal

### Differences from Chrome Bookmarks

- Visual card interface instead of folder tree
- 4 links visible per card without clicking
- Integrated with Chrome tab groups
- Theme-based color customization
- Maximum 10 links per topic (enforced simplicity)
- Drag-and-drop reordering

### Privacy

- No data collection or analytics
- No external network requests
- All data stored locally via Chrome storage API
- No user accounts or authentication
- Open source code available for review

### Limitations

- Desktop Chrome only (Chrome mobile does not support extensions)
- Maximum 10 links per topic
- Themes are preset (5 options), not customizable per-color
- Single-level organization (no subtopics or folders within topics)

### Version Information

**Current Version:** 1.0.0
**Developer:** Joana Socrates (laguh)
**License:** MIT
**Source Code:** [Will be added if/when published]

### Support

For bug reports or feature requests, use the Chrome Web Store support section or contact through the developer's provided channels.

---

## Key Changes from Original Description

1. **Removed all marketing language** ("beautiful", "smart", "perfect", "say goodbye to")
2. **Reduced emojis significantly** (only in theme names where they're part of the UI)
3. **Added specific technical details** (storage limits, API usage, Chrome version requirements)
4. **Clear differentiation** from bookmarks and other extensions
5. **Honest limitations** section
6. **Specific measurements** (4 links visible, 10 max per topic, 5 themes)
7. **Factual, descriptive language** throughout
8. **Technical specifications** section for transparency
