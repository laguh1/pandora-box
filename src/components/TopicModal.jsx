import React, { useState } from 'react';
import URLList from './URLList';
import { openURLsInGroup } from '../utils/chromeAPI';
import './TopicModal.css';

function TopicModal({ topic, onClose }) {
  const [mode, setMode] = useState('choose'); // 'choose' | 'select'

  const handleOpenAll = async () => {
    await openURLsInGroup(topic.urls, topic.name, topic.chromeColor);
    onClose();
  };

  const handleSelectMode = () => {
    setMode('select');
  };

  const handleOpenSelected = async (selectedUrls) => {
    await openURLsInGroup(selectedUrls, topic.name, topic.chromeColor);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="topic-modal" onClick={handleBackdropClick}>
      <div className="topic-modal__content">
        {mode === 'choose' ? (
          <>
            <div className="topic-modal__header">
              <h2 className="topic-modal__title" style={{ color: topic.color }}>
                {topic.name}
              </h2>
              <button
                className="topic-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="topic-modal__body">
              <p className="topic-modal__description">
                How would you like to open these {topic.urls.length} links?
              </p>

              <div className="topic-modal__actions">
                <button
                  className="topic-modal__button topic-modal__button--primary"
                  style={{ backgroundColor: topic.color }}
                  onClick={handleOpenAll}
                >
                  Open All in Group
                </button>

                <button
                  className="topic-modal__button topic-modal__button--secondary"
                  onClick={handleSelectMode}
                >
                  Select URLs
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="topic-modal__header">
              <button
                className="topic-modal__back"
                onClick={() => setMode('choose')}
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

            <URLList
              urls={topic.urls}
              onOpenSelected={handleOpenSelected}
              topicColor={topic.color}
              topicName={topic.name}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TopicModal;
