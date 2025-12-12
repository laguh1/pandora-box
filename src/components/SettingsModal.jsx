import React, { useState } from 'react';
import './SettingsModal.css';

function SettingsModal({ topics, onClose, onAddTopic, onAddLink }) {
  const [mode, setMode] = useState('main'); // 'main' | 'add-topic' | 'add-link'
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleAddTopic = () => {
    if (newTopicName.trim()) {
      onAddTopic(newTopicName);
      setNewTopicName('');
      setMode('main');
    }
  };

  const handleAddLink = () => {
    if (selectedTopicId && newLinkTitle.trim() && newLinkUrl.trim()) {
      onAddLink(selectedTopicId, newLinkTitle, newLinkUrl);
      setNewLinkTitle('');
      setNewLinkUrl('');
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
              <button
                className="settings-modal__option-btn"
                onClick={() => setMode('add-link')}
              >
                + Add Link to Existing Topic
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

          {mode === 'add-link' && (
            <div className="settings-modal__form">
              <h3>Add Link to Topic</h3>
              <select
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="settings-modal__select"
              >
                <option value="">Select a topic...</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Link title..."
                value={newLinkTitle}
                onChange={(e) => setNewLinkTitle(e.target.value)}
                className="settings-modal__input"
              />
              <input
                type="url"
                placeholder="https://..."
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="settings-modal__input"
              />
              <div className="settings-modal__form-actions">
                <button onClick={() => setMode('main')} className="settings-modal__btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddLink} className="settings-modal__btn-primary">
                  Add Link
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
