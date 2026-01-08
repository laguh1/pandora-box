import React, { useState } from 'react';
import './SettingsModal.css';
import { palettes } from '../data/palettes';

function SettingsModal({ topics, onClose, onAddTopic, currentPalette, onPaletteChange }) {
  const [mode, setMode] = useState('main'); // 'main' | 'add-topic' | 'palette'
  const [newTopicName, setNewTopicName] = useState('');

  const handleAddTopic = () => {
    if (newTopicName.trim()) {
      onAddTopic(newTopicName);
      setNewTopicName('');
      setMode('main');
    }
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
                + Add New Topic
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
              <div className="settings-modal__form-actions">
                <button onClick={() => setMode('main')} className="settings-modal__btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddTopic} className="settings-modal__btn-primary">
                  Add Topic
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
