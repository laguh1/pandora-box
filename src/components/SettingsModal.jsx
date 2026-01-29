import React, { useState } from 'react';
import './SettingsModal.css';
import { palettes } from '../data/palettes';

// Common icons for topics
const availableIcons = ['📁', '⚡', '💻', '📰', '💬', '🎬', '🎵', '📚', '🎮', '🛒', '✈️', '🏠', '💼', '🎨', '📷', '🔧', '❤️', '⭐'];

function SettingsModal({ topics, onClose, onAddTopic, onEditTopic, onDeleteTopic, currentPalette, onPaletteChange }) {
  const [mode, setMode] = useState('main'); // 'main' | 'add-topic' | 'edit-topic' | 'delete-topic' | 'palette'
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicIcon, setNewTopicIcon] = useState('📁');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('📁');

  const handleAddTopic = () => {
    if (newTopicName.trim()) {
      onAddTopic(newTopicName, newTopicIcon);
      setNewTopicName('');
      setNewTopicIcon('📁');
      setMode('main');
    }
  };

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

  return (
    <div className="settings-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="settings-modal__content">
        <div className="settings-modal__header">
          <h2 className="settings-modal__title">Settings</h2>
          <button className="settings-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="settings-modal__body">
          {mode === 'main' && (
            <div className="settings-modal__options">
              <button
                className="settings-modal__option-btn"
                onClick={() => setMode('palette')}
              >
                🎨 Change Theme
              </button>
              <button
                className="settings-modal__option-btn"
                onClick={() => setMode('add-topic')}
              >
                + Add Topic
              </button>
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
            </div>
          )}

          {mode === 'add-topic' && (
            <div className="settings-modal__form">
              <h3>Add New Topic</h3>
              <input
                type="text"
                placeholder="Topic name..."
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className="settings-modal__input"
              />
              <div className="settings-modal__icon-section">
                <label className="settings-modal__label">Choose icon:</label>
                <div className="settings-modal__icon-grid">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`settings-modal__icon-btn ${newTopicIcon === icon ? 'settings-modal__icon-btn--active' : ''}`}
                      onClick={() => setNewTopicIcon(icon)}
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
                <button onClick={handleAddTopic} className="settings-modal__btn-primary">
                  Add Topic
                </button>
              </div>
            </div>
          )}

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

          {mode === 'palette' && (
            <div className="settings-modal__palette-selector">
              <h3>Choose Theme</h3>
              <div className="palette-grid">
                {palettes.map((palette) => (
                  <button
                    key={palette.id}
                    className={`palette-option ${currentPalette === palette.id ? 'palette-option--active' : ''}`}
                    onClick={() => {
                      onPaletteChange(palette.id);
                      setMode('main');
                    }}
                  >
                    <div className="palette-preview">
                      <div
                        className="palette-preview__color"
                        style={{ backgroundColor: palette.colors.accent1 }}
                      />
                      <div
                        className="palette-preview__color"
                        style={{ backgroundColor: palette.colors.accent2 }}
                      />
                      <div
                        className="palette-preview__color"
                        style={{ backgroundColor: palette.colors.accent3 }}
                      />
                    </div>
                    <span className="palette-option__name">{palette.name}</span>
                    {currentPalette === palette.id && (
                      <span className="palette-option__check">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMode('main')}
                className="settings-modal__btn-secondary"
                style={{ marginTop: '16px' }}
              >
                Back
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
