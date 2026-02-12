# Pandora Box - Corrected Chrome Web Store Submission Materials

**Last Updated:** February 12, 2026
**Version:** 1.1.0
**Status:** Ready for Chrome Web Store update

---

## Changes in This Version (v1.1.0)

| Change | Details |
|--------|---------|
| Edit Topic | Users can rename topics and change topic icons |
| Delete Topic | Users can delete topics with confirmation dialog |
| Icon Picker | 18 emoji icons available when adding or editing topics |
| Settings Menu | Now has 4 options: Change Theme, Add Topic, Edit Topic, Delete Topic |
| Button Contrast Fix | Buttons now auto-detect text color for readability on light themes |

---

## 1. SHORT DESCRIPTION (132 characters max)

```
Topic-based link organizer for Chrome™. Card interface shows 4 links per topic, opens multiple URLs in color-coded tab groups.
```

Character count: 127

---

## 2. DETAILED DESCRIPTION

```
Overview

Pandora Box is an extension for Chrome™ that organizes website links into topic-based cards. Each card displays up to 4 quick-access links directly on the main interface. Click any link to open it, or use the topic modal to open multiple links simultaneously in color-coded tab groups.

Core Functionality

Card-Based Interface
- Each topic displays as a card in the popup
- Cards show up to 4 links directly (no clicking required to see them)
- Topics with more than 4 links show a "More" button
- Maximum 10 links per topic

Topic Modal System
- Click a card to open its modal view
- View all links in the topic with checkboxes
- Select specific links to open together
- Edit link titles and URLs
- Delete unwanted links
- Add current page with pin button
- Add new links manually

Topic Management
- Edit topic names and icons via the settings menu
- Delete topics with a confirmation step to prevent accidental removal
- Choose from 18 emoji icons when adding or editing a topic
- All changes are saved automatically to local storage

Tab Groups Integration
- Selected links open in a new tab group
- Tab groups are labeled with the topic name
- Groups use native color coding
- Helps organize multiple related tabs

Theme System
- 5 color palette options: Ocean Blue, Forest Green, Rose Garden, Vibrant Pink, Minimal Grey
- Themes affect card colors, link colors, and UI elements
- Topic cards cycle through 3 accent colors from the selected palette
- Theme selection persists across sessions

Drag and Drop
- Reorder topic cards by dragging
- Position is saved automatically to local storage
- No page reload required

Storage
- Uses local storage API
- Optional: Enable sync to sync across devices signed into your browser profile
- Data remains local, no external servers

Technical Specifications

Permissions Used:
- tabs: Required for "pin current page" feature to capture the current tab's URL
- tabGroups: Required to create and label tab groups
- storage: Required to save topics, links, and theme preferences locally

Storage Limits:
- Maximum 10 links per topic
- No hard limit on number of topics
- Subject to local storage quotas (approximately 5MB)

Compatibility:
- For use with Chrome™ 89 or later (for tab groups API)
- Manifest V3 compliant

Specific Use Cases

This extension is designed for users who:
- Access the same set of websites repeatedly for different contexts (work projects, hobbies, research topics)
- Want visual cards instead of nested bookmark folders
- Use tab groups for organization
- Need quick access to 4 most-used links per category without opening menus
- Prefer theme customization for visual organization

How It Works

Initial Setup:
1. Install extension
2. Click extension icon in toolbar
3. Extension opens with sample topics (Productivity, Development, Social Media, etc.)
4. Customize by adding/removing topics and links via settings gear icon

Daily Usage:
1. Click extension icon
2. Click any of the 4 visible links on a card to open that site
3. Or click card/More button to open topic modal
4. In modal: select multiple links and click "Open Selected"
5. Links open in a labeled, color-coded tab group

Customization:
1. Click gear icon in top-right
2. Add new topics with custom names and emoji icons
3. Edit existing topic names and icons
4. Delete topics you no longer need (with confirmation)
5. Change theme palette from 5 options
6. Drag cards to reorder
7. Edit/delete links via topic modal

Differences from Bookmarks
- Visual card interface instead of folder tree
- 4 links visible per card without clicking
- Integrated with tab groups
- Theme-based color customization
- Maximum 10 links per topic (enforced simplicity)
- Drag-and-drop reordering

Privacy
- No data collection or analytics
- No external network requests
- All data stored locally via storage API
- No user accounts or authentication
- Open source code available for review

Limitations
- Desktop only (mobile browsers do not support extensions)
- Maximum 10 links per topic
- Themes are preset (5 options), not customizable per-color
- Single-level organization (no subtopics or folders within topics)

---
Chrome is a trademark of Google LLC. Use of this trademark is subject to Google Permissions.
```

---

## 3. SINGLE PURPOSE DESCRIPTION

```
Pandora Box provides a card-based interface for organizing website links by topic, designed for use with Chrome™. Unlike nested bookmark folders, each topic card displays 4 links directly in the popup for instant access. Topics with more links open in a modal where you can select multiple links to open simultaneously in tab groups. Users can add, edit, and delete topics with custom emoji icons, and choose from 5 theme options that color-code cards and links.

Chrome is a trademark of Google LLC.
```

---

## 4. TEST INSTRUCTIONS (500 characters max)

```
1. Click extension icon to open popup
2. Click any link on a card to open it
3. Click topic card to open modal, select links, click "Open" for tab group
4. Click gear icon > Add Topic to create a topic with emoji icon
5. Click gear icon > Edit Topic to rename or change icon
6. Click gear icon > Delete Topic to remove (confirms before deleting)
7. Click gear icon > Change Theme to switch color palette
8. In modal, click + to add links or pin icon to save current page
9. Drag topic cards to reorder
```

Character count: 489

---

## 5. PRIVACY POLICY URL

```
https://github.com/laguh1/pandora-box/blob/master/PRIVACY_POLICY.md
```

**Note:** Update the privacy policy to:
1. Replace `[Your Contact Email]` with actual email
2. Replace `[Your GitHub Profile URL]` with: https://github.com/laguh1
3. Change "tabs" permission reference to "tabGroups" (to match actual manifest)

---

## 6. CATEGORY

```
Productivity
```

---

## 7. LANGUAGE

```
English
```

---

## Pre-Submission Checklist

- [ ] Screenshot uses generic placeholder names (Email Service, Calendar App, etc.)
- [ ] Description includes Chrome™ trademark notation
- [ ] Description includes Google attribution statement at the end
- [ ] Test instructions use generic names (NO Gmail, Instagram, etc.)
- [ ] Single purpose includes Chrome™ and attribution
- [ ] Privacy policy contact info filled in
- [ ] Privacy policy permissions match manifest.json
- [ ] Package built with generic default.js data
- [ ] All materials reviewed for brand names

---

## Name Consideration (Optional)

If rejection persists, consider renaming to avoid potential "Pandora" trademark issues:

Alternative names:
- Link Box
- Topic Cards
- QuickLinks Hub
- Tab Deck
- CardMarks
- Link Deck
- TopicBox

---

## Submission Notes

1. Wait 2-3 days after last rejection before resubmitting
2. If possible, reply to rejection email explaining changes made
3. Keep all materials consistent (no brand names anywhere)
4. After approval, can update default.js with more helpful placeholder text if desired
