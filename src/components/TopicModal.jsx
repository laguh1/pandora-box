import React, { useState } from 'react';
import URLList from './URLList';
import { openURLsInGroup } from '../utils/chromeAPI';
import './TopicModal.css';

function TopicModal({ topic, onClose, onAddUrl, onDeleteUrl, onEditUrl }) {
  const [mode, setMode] = useState('main'); // 'main' | 'add-url' | 'edit-url'
  const [newUrlTitle, setNewUrlTitle] = useState('');
  const [newUrlAddress, setNewUrlAddress] = useState('');
  const [editingUrl, setEditingUrl] = useState(null);

  const handleOpenSelected = async (selectedUrls) => {
    await openURLsInGroup(selectedUrls, topic.name, topic.chromeColor);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddUrl = () => {
    if (newUrlTitle.trim() && newUrlAddress.trim()) {
      // Check if topic already has 10 URLs
      if (topic.urls.length >= 10) {
        alert('Maximum 10 links allowed per topic');
        return;
      }
      onAddUrl(topic.id, newUrlTitle, newUrlAddress);
      setNewUrlTitle('');
      setNewUrlAddress('');
      setMode('main');
    }
  };

  const handleAddCurrentPage = async () => {
    try {
      // Check if topic already has 10 URLs
      if (topic.urls.length >= 10) {
        alert('Maximum 10 links allowed per topic');
        return;
      }
      // Query for the active tab in the last focused window (not the popup window)
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (tab) {
        onAddUrl(topic.id, tab.title, tab.url);
        setMode('main');
      }
    } catch (error) {
      console.error('Error getting current tab:', error);
    }
  };

  const handleEditUrlClick = (url) => {
    setEditingUrl(url);
    setNewUrlTitle(url.title);
    setNewUrlAddress(url.url);
    setMode('edit-url');
  };

  const handleSaveEdit = () => {
    if (newUrlTitle.trim() && newUrlAddress.trim() && editingUrl) {
      onEditUrl(topic.id, editingUrl.id, newUrlTitle, newUrlAddress);
      setNewUrlTitle('');
      setNewUrlAddress('');
      setEditingUrl(null);
      setMode('main');
    }
  };

  return (
    <div className="topic-modal" onClick={handleBackdropClick}>
      <div className="topic-modal__content">
        {mode === 'main' ? (
          <>
            <div className="topic-modal__header">
              <h2 className="topic-modal__title" style={{ color: topic.color }}>
                {topic.name}
              </h2>
              <div className="topic-modal__header-actions">
                <button
                  className="topic-modal__icon-btn"
                  onClick={() => setMode('add-url')}
                  aria-label="Add URL"
                  title="Add URL"
                >
                  +
                </button>
                <button
                  className="topic-modal__icon-btn"
                  onClick={handleAddCurrentPage}
                  aria-label="Add Current Page"
                  title="Add Current Page"
                >
                  📌
                </button>
                <button
                  className="topic-modal__close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="topic-modal__body">
              <URLList
                urls={topic.urls}
                onOpenSelected={handleOpenSelected}
                topicColor={topic.color}
                topicName={topic.name}
                onDeleteUrl={onDeleteUrl}
                onEditUrl={handleEditUrlClick}
              />
            </div>
          </>
        ) : mode === 'add-url' ? (
          <>
            <div className="topic-modal__header">
              <button
                className="topic-modal__back"
                onClick={() => setMode('main')}
                aria-label="Go back"
              >
                ← Back
              </button>
              <button
                className="topic-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="topic-modal__body">
              <h3 className="topic-modal__form-title">Add URL to {topic.name}</h3>
              <div className="topic-modal__form">
                <input
                  type="text"
                  placeholder="Link title..."
                  value={newUrlTitle}
                  onChange={(e) => setNewUrlTitle(e.target.value)}
                  className="topic-modal__input"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={newUrlAddress}
                  onChange={(e) => setNewUrlAddress(e.target.value)}
                  className="topic-modal__input"
                />
                <div className="topic-modal__form-actions">
                  <button
                    onClick={() => setMode('main')}
                    className="topic-modal__button topic-modal__button--secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUrl}
                    className="topic-modal__button topic-modal__button--primary"
                    style={{ backgroundColor: topic.color }}
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="topic-modal__header">
              <button
                className="topic-modal__back"
                onClick={() => setMode('main')}
                aria-label="Go back"
              >
                ← Back
              </button>
              <button
                className="topic-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="topic-modal__body">
              <h3 className="topic-modal__form-title">Edit Link</h3>
              <div className="topic-modal__form">
                <input
                  type="text"
                  placeholder="Link title..."
                  value={newUrlTitle}
                  onChange={(e) => setNewUrlTitle(e.target.value)}
                  className="topic-modal__input"
                />
                <input
                  type="url"
                  placeholder="https://..."
                  value={newUrlAddress}
                  onChange={(e) => setNewUrlAddress(e.target.value)}
                  className="topic-modal__input"
                />
                <div className="topic-modal__form-actions">
                  <button
                    onClick={() => setMode('main')}
                    className="topic-modal__button topic-modal__button--secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="topic-modal__button topic-modal__button--primary"
                    style={{ backgroundColor: topic.color }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TopicModal;
