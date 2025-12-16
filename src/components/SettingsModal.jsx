import React, { useState } from 'react';
import './SettingsModal.css';

function SettingsModal({ topics, onClose, onAddTopic }) {
  const [mode, setMode] = useState('main'); // 'main' | 'add-topic'
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

        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
