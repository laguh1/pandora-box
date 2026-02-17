# Plan: Implement Edit Topic & Delete Topic Features

## Overview
Add Edit Topic and Delete Topic functionality to the Settings modal. Users can rename topics, change their emoji icons, and delete topics with a confirmation step.

## Prerequisites
- The Settings modal (`SettingsModal.jsx`) already exists with "Change Theme" and "Add Topic" options
- `App.jsx` manages topics state and passes handlers to SettingsModal
- `SettingsModal.css` has base styles for forms, buttons, and modals

---

## Step 1: Add handler functions in App.jsx

Add two new functions after `handleAddTopic`:

### handleEditTopic
```javascript
const handleEditTopic = (topicId, newName, newIcon) => {
  setTopics(topics.map(topic => {
    if (topic.id === topicId) {
      return {
        ...topic,
        name: newName,
        icon: newIcon
      };
    }
    return topic;
  }));
};
```

### handleDeleteTopic
```javascript
const handleDeleteTopic = (topicId) => {
  setTopics(topics.filter(topic => topic.id !== topicId));
};
```

### Pass them as props to SettingsModal
In the JSX where `<SettingsModal>` is rendered, add:
```
onEditTopic={handleEditTopic}
onDeleteTopic={handleDeleteTopic}
```

---

## Step 2: Update SettingsModal.jsx

### 2a. Add new props
Update the function signature to accept `onEditTopic` and `onDeleteTopic`:
```javascript
function SettingsModal({ topics, onClose, onAddTopic, onEditTopic, onDeleteTopic, currentPalette, onPaletteChange }) {
```

### 2b. Add new state variables
```javascript
const [selectedTopicId, setSelectedTopicId] = useState('');
const [editName, setEditName] = useState('');
const [editIcon, setEditIcon] = useState('📁');
```

### 2c. Update mode state to include new modes
The mode state already has `'main'`, `'add-topic'`, and `'palette'`. Add `'edit-topic'` and `'delete-topic'`:
```javascript
const [mode, setMode] = useState('main'); // 'main' | 'add-topic' | 'edit-topic' | 'delete-topic' | 'palette'
```

### 2d. Define available icons array (at top of file, outside component)
```javascript
const availableIcons = ['📁', '⚡', '💻', '📰', '💬', '🎬', '🎵', '📚', '🎮', '🛒', '✈️', '🏠', '💼', '🎨', '📷', '🔧', '❤️', '⭐'];
```

### 2e. Add handler functions inside the component

```javascript
const handleSelectTopicForEdit = (topicId) => {
  const topic = topics.find(t => t.id === topicId);
  if (topic) {
    setSelectedTopicId(topicId);
    setEditName(topic.name);
    setEditIcon(topic.icon || '📁');
  }
};

const handleEditTopic = () => {
  if (selectedTopicId && editName.trim()) {
    onEditTopic(selectedTopicId, editName, editIcon);
    setSelectedTopicId('');
    setEditName('');
    setEditIcon('📁');
    setMode('main');
  }
};

const handleDeleteTopic = () => {
  if (selectedTopicId) {
    onDeleteTopic(selectedTopicId);
    setSelectedTopicId('');
    setMode('main');
  }
};

const resetAndGoBack = () => {
  setSelectedTopicId('');
  setNewTopicName('');
  setNewTopicIcon('📁');
  setEditName('');
  setEditIcon('📁');
  setMode('main');
};
```

### 2f. Add menu buttons in the main mode
Inside `{mode === 'main' && (...)}`, add two new buttons after "Add Topic":

```jsx
<button
  className="settings-modal__option-btn"
  onClick={() => setMode('edit-topic')}
>
  ✏️ Edit Topic
</button>
<button
  className="settings-modal__option-btn settings-modal__option-btn--danger"
  onClick={() => setMode('delete-topic')}
>
  🗑️ Delete Topic
</button>
```

### 2g. Add Edit Topic UI (two-step: select topic, then edit form)

**Step 1 — Topic selection list** (when no topic selected yet):
```jsx
{mode === 'edit-topic' && !selectedTopicId && (
  <div className="settings-modal__form">
    <h3>Select Topic to Edit</h3>
    <div className="settings-modal__topic-list">
      {topics.map((topic) => (
        <button
          key={topic.id}
          className="settings-modal__topic-item"
          onClick={() => handleSelectTopicForEdit(topic.id)}
        >
          <span className="settings-modal__topic-icon">{topic.icon || '📁'}</span>
          <span className="settings-modal__topic-name">{topic.name}</span>
        </button>
      ))}
    </div>
    <button onClick={resetAndGoBack} className="settings-modal__btn-secondary" style={{ marginTop: '16px' }}>
      Back
    </button>
  </div>
)}
```

**Step 2 — Edit form** (after topic is selected):
```jsx
{mode === 'edit-topic' && selectedTopicId && (
  <div className="settings-modal__form">
    <h3>Edit Topic</h3>
    <input
      type="text"
      placeholder="Topic name..."
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
      className="settings-modal__input"
    />
    <div className="settings-modal__icon-section">
      <label className="settings-modal__label">Choose icon:</label>
      <div className="settings-modal__icon-grid">
        {availableIcons.map((icon) => (
          <button
            key={icon}
            type="button"
            className={`settings-modal__icon-btn ${editIcon === icon ? 'settings-modal__icon-btn--active' : ''}`}
            onClick={() => setEditIcon(icon)}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
    <div className="settings-modal__form-actions">
      <button onClick={resetAndGoBack} className="settings-modal__btn-secondary">
        Cancel
      </button>
      <button onClick={handleEditTopic} className="settings-modal__btn-primary">
        Save Changes
      </button>
    </div>
  </div>
)}
```

### 2h. Add Delete Topic UI (two-step: select topic, then confirm)

**Step 1 — Topic selection list:**
```jsx
{mode === 'delete-topic' && !selectedTopicId && (
  <div className="settings-modal__form">
    <h3>Select Topic to Delete</h3>
    <div className="settings-modal__topic-list">
      {topics.map((topic) => (
        <button
          key={topic.id}
          className="settings-modal__topic-item settings-modal__topic-item--delete"
          onClick={() => setSelectedTopicId(topic.id)}
        >
          <span className="settings-modal__topic-icon">{topic.icon || '📁'}</span>
          <span className="settings-modal__topic-name">{topic.name}</span>
        </button>
      ))}
    </div>
    <button onClick={resetAndGoBack} className="settings-modal__btn-secondary" style={{ marginTop: '16px' }}>
      Back
    </button>
  </div>
)}
```

**Step 2 — Confirmation dialog:**
```jsx
{mode === 'delete-topic' && selectedTopicId && (
  <div className="settings-modal__form">
    <h3>Confirm Delete</h3>
    <p className="settings-modal__warning">
      Are you sure you want to delete "{topics.find(t => t.id === selectedTopicId)?.name}"?
      This will remove all links in this topic.
    </p>
    <div className="settings-modal__form-actions">
      <button onClick={resetAndGoBack} className="settings-modal__btn-secondary">
        Cancel
      </button>
      <button onClick={handleDeleteTopic} className="settings-modal__btn-danger">
        Delete
      </button>
    </div>
  </div>
)}
```

---

## Step 3: Add CSS styles to SettingsModal.css

Add these new styles:

```css
/* Danger button (red, for delete confirmation) */
.settings-modal__btn-danger {
  flex: 1;
  padding: var(--spacing-sm);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: opacity var(--transition-fast);
  background-color: #dc3545;
  color: var(--color-white);
}

.settings-modal__btn-danger:hover {
  opacity: 0.8;
}

/* Danger variant for the menu button */
.settings-modal__option-btn--danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid #dc3545;
}

.settings-modal__option-btn--danger:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

/* Topic list for selection */
.settings-modal__topic-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 200px;
  overflow-y: auto;
}

.settings-modal__topic-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.settings-modal__topic-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.settings-modal__topic-item--delete:hover {
  background-color: rgba(220, 53, 69, 0.2);
  border-color: #dc3545;
}

.settings-modal__topic-icon {
  font-size: 20px;
}

.settings-modal__topic-name {
  color: var(--color-white);
  font-size: var(--font-size-base);
}

/* Icon grid for selection */
.settings-modal__icon-section {
  margin-top: var(--spacing-sm);
}

.settings-modal__label {
  color: var(--color-white);
  font-size: var(--font-size-small);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.settings-modal__icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
}

.settings-modal__icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.settings-modal__icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.settings-modal__icon-btn--active {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: var(--color-white);
}

/* Warning message for delete confirmation */
.settings-modal__warning {
  color: var(--color-white);
  font-size: var(--font-size-base);
  line-height: 1.5;
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background-color: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.5);
}
```

---

## Step 4: Fix tooltip text in App.css

Find the settings button tooltip CSS (the `::after` pseudo-element on `.app__settings-btn`) and change the content from `"add"` to `"Edit"`:
```css
content: "Edit";
```

---

## Step 5: Bump version

In `public/manifest.json`, update the version from the current version to `1.1.0`.

---

## Step 6: Build and test

```bash
npm run build        # builds default version to dist/
npm run build:both   # builds both default and customised
```

### Manual test checklist
- [ ] Settings menu shows 4 options: Change Theme, Add Topic, Edit Topic, Delete Topic
- [ ] Edit Topic: clicking shows list of topics
- [ ] Edit Topic: selecting a topic shows edit form with current name and icon pre-filled
- [ ] Edit Topic: changing name and icon and saving updates the topic card
- [ ] Edit Topic: Cancel goes back to main settings
- [ ] Delete Topic: clicking shows list of topics (items highlight red on hover)
- [ ] Delete Topic: selecting a topic shows confirmation with topic name
- [ ] Delete Topic: confirming removes the topic and all its links
- [ ] Delete Topic: Cancel goes back to main settings
- [ ] Changes persist after closing and reopening the extension (Chrome storage)

---

## Files Modified Summary
| File | Changes |
|---|---|
| `src/App.jsx` | Add `handleEditTopic` and `handleDeleteTopic` functions, pass as props to SettingsModal |
| `src/App.css` | Change tooltip text from "add" to "Edit" |
| `src/components/SettingsModal.jsx` | Add edit-topic and delete-topic modes, topic selection UI, edit form, delete confirmation, icon picker |
| `src/components/SettingsModal.css` | Add styles for topic list, icon grid, danger button, warning message |
| `public/manifest.json` | Bump version to 1.1.0 |
