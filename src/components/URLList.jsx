import React, { useState } from 'react';
import URLCheckbox from './URLCheckbox';
import './URLList.css';

function URLList({ urls, onOpenSelected, topicColor, topicTextColor, buttonBackground, buttonText, topicName, onDeleteUrl, onEditUrl }) {
  const [selectedUrls, setSelectedUrls] = useState(new Set());

  const handleCheckboxChange = (urlId, checked) => {
    setSelectedUrls(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(urlId);
      } else {
        newSet.delete(urlId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUrls.size === urls.length) {
      setSelectedUrls(new Set());
    } else {
      setSelectedUrls(new Set(urls.map(url => url.id)));
    }
  };

  const handleOpenSelected = () => {
    const urlsToOpen = urls.filter(url => selectedUrls.has(url.id));
    onOpenSelected(urlsToOpen);
  };

  return (
    <div className="url-list">
      <div className="url-list__header">
        <label className="url-list__select-all-label">
          <input
            type="checkbox"
            className="url-list__select-all-checkbox"
            checked={selectedUrls.size === urls.length && urls.length > 0}
            onChange={handleSelectAll}
            style={{ accentColor: topicColor }}
          />
          <span className="url-list__select-all-text">
            {selectedUrls.size === urls.length && urls.length > 0 ? 'Deselect All' : 'Select All'}
          </span>
        </label>
        <button
          className="url-list__open-button"
          onClick={handleOpenSelected}
          disabled={selectedUrls.size === 0}
          style={{ backgroundColor: buttonBackground || topicColor, color: buttonText || topicTextColor }}
        >
          Open
        </button>
      </div>

      <div className="url-list__items">
        {urls.map(url => (
          <URLCheckbox
            key={url.id}
            url={url}
            checked={selectedUrls.has(url.id)}
            onChange={handleCheckboxChange}
            accentColor={topicColor}
            onDelete={onDeleteUrl}
            onEdit={onEditUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default URLList;
