# Plan: Post v1.1.0 Enhancements

## Overview

These enhancements were made around the v1.1.0 release. The pin fixes (Enhancements 1 & 2) were made just BEFORE the edit/delete features. The contrast and theme fixes (Enhancements 3-5) were made AFTER. If your reproduced version is missing the instant pin refresh, start with Enhancements 1 & 2.

## Prerequisites

- Pandora Box base version with pin button (📌) already present in TopicModal
- `npm run build` works without errors

---

## Enhancement 1: Pin Current Page — Save Fix (Jan 22)

### Problem

Clicking the 📌 pin button to add current page was not working — URL was not saved at all.

### Root Causes

1. Missing `tabs` permission in manifest.json — `chrome.tabs.query()` requires it
2. `selectedTopic` state not updating after adding URL, so modal didn't show the new link
3. Tab query using `windowType: 'normal'` wasn't reliably finding the active tab

### Fix 1a: Add `tabs` permission to `public/manifest.json`

Add `"tabs"` to the permissions array:

```json
"permissions": [
  "tabs",
  "tabGroups",
  "storage"
]
```

### Fix 1b: Update `handleAddLink` in `src/App.jsx`

Replace the existing `handleAddLink` function with:

```javascript
const handleAddLink = (topicId, title, url) => {
  const newUrl = {
    id: Date.now(), // Use timestamp for unique ID instead of length+1
    title,
    url
  };

  setTopics(topics.map(topic => {
    if (topic.id === topicId) {
      return {
        ...topic,
        urls: [...topic.urls, newUrl]
      };
    }
    return topic;
  }));

  // Update selectedTopic to reflect the change (fixes pin button not showing new URL)
  if (selectedTopic && selectedTopic.id === topicId) {
    setSelectedTopic(prev => ({
      ...prev,
      urls: [...prev.urls, newUrl]
    }));
  }
};
```

### Fix 1c: Improve tab query in `src/components/TopicModal.jsx`

In the pin button click handler (the function that calls `chrome.tabs.query`), replace the existing tab query logic with:

```javascript
// Query for the active tab in the last focused window
const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

// Filter out the extension popup itself
const tab = tabs.find(t => !t.url.startsWith('chrome-extension://'));

if (tab && tab.url && tab.title) {
  onAddUrl(topic.id, tab.title, tab.url);
  setMode('main');
} else {
  // Fallback: try querying all tabs in the current window
  const allTabs = await chrome.tabs.query({ currentWindow: true });
  const validTab = allTabs.find(t => !t.url.startsWith('chrome-extension://') && t.active);
  if (validTab) {
    onAddUrl(topic.id, validTab.title, validTab.url);
    setMode('main');
  } else {
    alert('Could not find the current page. Make sure you have a webpage open.');
  }
}
```

---

## Enhancement 2: Pin Instant Refresh — Stale Closure Fix (Jan 26)

### Problem

Pin button saved the URL, but the new link did NOT appear immediately in the modal. User had to close and reopen the modal to see it. This was caused by a **stale closure** — `setTopics(topics.map(...))` captured the old `topics` value.

### Fix: Use functional update in `handleAddLink` in `src/App.jsx`

This replaces the version from Enhancement 1. Update `handleAddLink` to:

```javascript
const handleAddLink = (topicId, title, url) => {
  const newUrl = {
    id: Date.now(),
    title,
    url
  };

  // Use functional update to avoid stale closure issues
  setTopics(prevTopics => prevTopics.map(topic => {
    if (topic.id === topicId) {
      return {
        ...topic,
        urls: [...topic.urls, newUrl]
      };
    }
    return topic;
  }));

  // Update selectedTopic so modal shows new URL immediately
  setSelectedTopic(prev => {
    if (prev && prev.id === topicId) {
      return {
        ...prev,
        urls: [...prev.urls, newUrl]
      };
    }
    return prev;
  });
};
```

**Key changes from Enhancement 1:**
- `setTopics(topics.map(...))` → `setTopics(prevTopics => prevTopics.map(...))`  (functional update)
- `setSelectedTopic` also uses functional update pattern and handles the case where no topic is selected

### Test checklist for pin fixes
- [ ] Open a webpage (e.g. google.com)
- [ ] Open Pandora Box popup, click a topic
- [ ] Click the 📌 pin button
- [ ] The pinned URL should appear IMMEDIATELY in the URL list without closing the modal
- [ ] Close and reopen the extension — the pinned URL should persist
- [ ] Pin a second URL — should also appear instantly
- [ ] Maximum 10 URLs per topic — 11th should show alert

---

## Enhancement 3: Button Contrast Fix (WCAG Compliance)

### Problem

Buttons ("Save Changes", "Open", "Add URL") had unreadable white text on light accent backgrounds. The text color was hardcoded to white while background colors came from palette accent colors — some of which are very light.

**Affected themes:**
- Minimal Grey: accent2 (#EEEEEE) and accent3 (#F7F7F7) — most severe
- Forest Green: accent3 (#EBF4DD)
- Rose Garden: accent2 (#C8AAAA) and accent3 (#FFDAB3)
- Vibrant Pink: accent3 (#FFEB55)
- Ocean Blue: accent3 (#EAE0CF)

### Fix: Add contrast detection functions to `src/data/palettes.js`

#### 1a. Add these 4 new exported functions BEFORE the `assignTopicColors` function:

```javascript
/**
 * Calculate relative luminance of a color
 * Returns a value between 0 (black) and 1 (white)
 */
function getLuminance(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const rLin = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLin = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLin = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Get appropriate text color for a given background
 * Returns dark text for light backgrounds, light text for dark backgrounds
 */
export function getContrastText(hexColor) {
  const luminance = getLuminance(hexColor);
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Get optimized button colors (background + text) for maximum contrast
 * Adjusts medium-luminance colors to ensure readability
 */
export function getButtonColors(hexColor) {
  const luminance = getLuminance(hexColor);

  // Light colors (luminance > 0.5): use as-is with black text
  if (luminance > 0.5) {
    return { background: hexColor, text: '#000000' };
  }

  // Dark colors (luminance < 0.15): use as-is with white text
  if (luminance < 0.15) {
    return { background: hexColor, text: '#FFFFFF' };
  }

  // Medium colors (0.15 - 0.5): darken by 30% for better contrast with white text
  const hex = hexColor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  const factor = 0.7;
  r = Math.round(r * factor);
  g = Math.round(g * factor);
  b = Math.round(b * factor);

  const darkenedColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return { background: darkenedColor, text: '#FFFFFF' };
}

/**
 * Get a brightened version of a color for better visibility on dark backgrounds
 * Used for titles/headers that need to stand out
 */
export function getBrightColor(hexColor) {
  const hex = hexColor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  const luminance = getLuminance(hexColor);

  // If already bright enough, return original
  if (luminance > 0.5) return hexColor;

  // Brighten by 40%
  const factor = 1.4;
  r = Math.min(255, Math.round(r * factor));
  g = Math.min(255, Math.round(g * factor));
  b = Math.min(255, Math.round(b * factor));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
```

#### 1b. Update the `assignTopicColors` function to include contrast properties:

Replace the existing `assignTopicColors` function with:

```javascript
export function assignTopicColors(topics, palette) {
  const accentColors = [
    { color: palette.colors.accent1, chromeColor: palette.chromeColors.accent1 },
    { color: palette.colors.accent2, chromeColor: palette.chromeColors.accent2 },
    { color: palette.colors.accent3, chromeColor: palette.chromeColors.accent3 }
  ];

  return topics.map((topic, index) => {
    const buttonColors = getButtonColors(accentColors[index % 3].color);
    return {
      ...topic,
      color: accentColors[index % 3].color,
      chromeColor: accentColors[index % 3].chromeColor,
      textColor: getContrastText(accentColors[index % 3].color),
      titleColor: getBrightColor(accentColors[index % 3].color),
      buttonBackground: buttonColors.background,
      buttonText: buttonColors.text
    };
  });
}
```

---

### Fix: Update `src/components/URLList.jsx`

#### 2a. Update function signature to accept new props:

Change:
```javascript
function URLList({ urls, onOpenSelected, topicColor, topicName, onDeleteUrl, onEditUrl }) {
```

To:
```javascript
function URLList({ urls, onOpenSelected, topicColor, topicTextColor, buttonBackground, buttonText, topicName, onDeleteUrl, onEditUrl }) {
```

#### 2b. Update the "Open" button style:

Change:
```jsx
style={{ backgroundColor: topicColor }}
```

To:
```jsx
style={{ backgroundColor: buttonBackground || topicColor, color: buttonText || topicTextColor }}
```

---

### Fix: Update `src/components/URLList.css`

#### 3a. Update the `.url-list__open-button` class:

Change:
```css
.url-list__open-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  color: var(--color-white);
  font-weight: 500;
  font-size: var(--font-size-base);
  ...
```

To (remove hardcoded `color: var(--color-white)` and change font-weight):
```css
.url-list__open-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: var(--font-size-base);
  ...
```

---

### Fix: Update `src/components/TopicModal.jsx`

#### 4a. Update the topic title to use `titleColor`:

Change:
```jsx
<h2 className="topic-modal__title" style={{ color: topic.color }}>
```

To:
```jsx
<h2 className="topic-modal__title" style={{ color: topic.titleColor || topic.color }}>
```

#### 4b. Pass new contrast props to URLList:

Where `<URLList>` is rendered, add three new props:
```jsx
<URLList
  urls={topic.urls}
  onOpenSelected={handleOpenSelected}
  topicColor={topic.color}
  topicTextColor={topic.textColor}
  buttonBackground={topic.buttonBackground}
  buttonText={topic.buttonText}
  topicName={topic.name}
  onDeleteUrl={onDeleteUrl}
  onEditUrl={handleEditUrlClick}
/>
```

#### 4c. Update "Add URL" button style:

Change:
```jsx
style={{ backgroundColor: topic.color }}
```

To:
```jsx
style={{ backgroundColor: topic.buttonBackground || topic.color, color: topic.buttonText || topic.textColor }}
```

#### 4d. Update "Save Changes" button style (in edit URL mode):

Same change as above — replace:
```jsx
style={{ backgroundColor: topic.color }}
```

With:
```jsx
style={{ backgroundColor: topic.buttonBackground || topic.color, color: topic.buttonText || topic.textColor }}
```

---

## Enhancement 4: Rename "Minimal Grey" Theme to "High Contrast"

### In `src/data/palettes.js`, update the Minimal Grey palette:

Change:
```javascript
{
  id: 'minimal',
  name: 'Minimal Grey',
  colors: {
    background: '#393E46',
    primary: '#393E46',
    accent1: '#929AAB',
    accent2: '#EEEEEE',
    accent3: '#F7F7F7',
    text: '#FFFFFF',
    textLight: '#929AAB'
  },
  chromeColors: {
    accent1: 'grey',
    accent2: 'grey',
    accent3: 'grey'
  }
}
```

To:
```javascript
{
  id: 'minimal',
  name: 'High Contrast',
  colors: {
    background: '#000000',
    primary: '#000000',
    accent1: '#FFFFFF',
    accent2: '#FFD700',
    accent3: '#00BFFF',
    text: '#FFFFFF',
    textLight: '#DDDDDD'
  },
  chromeColors: {
    accent1: 'grey',
    accent2: 'yellow',
    accent3: 'cyan'
  }
}
```

---

## Enhancement 5: URL Edit/Delete Button Styling Improvements

### In `src/components/URLCheckbox.css`, update the edit and delete button styles:

Replace the existing edit/delete button styles:

```css
/* Old styles */
.url-checkbox__edit, .url-checkbox__delete {
  ...
  font-size: 14px;
  transition: background-color var(--transition-fast);
  background-color: transparent;
  opacity: 0.7;
  ...
}

.url-checkbox__edit:hover {
  background-color: rgba(84, 119, 146, 0.2);
  opacity: 1;
}

.url-checkbox__delete:hover {
  background-color: rgba(255, 0, 0, 0.1);
  opacity: 1;
}
```

With:

```css
/* New styles - larger, more visible */
.url-checkbox__edit, .url-checkbox__delete {
  ...
  font-size: 18px;
  transition: all var(--transition-fast);
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  ...
}

.url-checkbox__edit:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.url-checkbox__delete:hover {
  background-color: rgba(255, 100, 100, 0.3);
  transform: scale(1.1);
}
```

---

## Build and Test

```bash
npm run build        # builds default version to dist/
npm run build:both   # builds both default and customised
```

### Manual test checklist

- [ ] Switch through ALL themes — check that button text is readable on every theme
- [ ] Specifically test "High Contrast" theme (formerly Minimal Grey) — should have black background with white/gold/blue cards
- [ ] Check "Open" button text contrast on light-colored topic cards
- [ ] Check "Add URL" button text contrast
- [ ] Check "Save Changes" button text contrast when editing a URL
- [ ] Check topic title colors are visible against the dark modal background
- [ ] Edit and delete URL buttons (pencil/trash icons) are visible and enlarge on hover
- [ ] All changes persist after closing and reopening extension

---

## Files Modified Summary

| File | Changes |
|---|---|
| `src/data/palettes.js` | Added `getLuminance()`, `getContrastText()`, `getButtonColors()`, `getBrightColor()` functions; updated `assignTopicColors()` to include contrast properties; renamed Minimal Grey to High Contrast with new colors |
| `src/components/TopicModal.jsx` | Pass `textColor`/`buttonBackground`/`buttonText` props to URLList; use contrast-aware styles on Add URL and Save Changes buttons; use `titleColor` for topic title |
| `src/components/URLList.jsx` | Accept `topicTextColor`/`buttonBackground`/`buttonText` props; use them on Open button |
| `src/components/URLList.css` | Remove hardcoded white text color from Open button; increase font-weight |
| `src/components/URLCheckbox.css` | Larger edit/delete icons (18px), visible background, scale-up hover effect |
