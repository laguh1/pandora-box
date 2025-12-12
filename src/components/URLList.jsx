import React, { useState } from 'react';
import URLCheckbox from './URLCheckbox';
import './URLList.css';

function URLList({ urls, onOpenSelected, topicColor, topicName }) {
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
        <h3 className="url-list__title">Select URLs to Open</h3>
        <button
          className="url-list__select-all"
          onClick={handleSelectAll}
        >
          {selectedUrls.size === urls.length ? 'Deselect All' : 'Select All'}
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
          />
        ))}
      </div>

      <div className="url-list__footer">
        <button
          className="url-list__open-button"
          onClick={handleOpenSelected}
          disabled={selectedUrls.size === 0}
          style={{ backgroundColor: topicColor }}
        >
          Open {selectedUrls.size} Selected {selectedUrls.size === 1 ? 'URL' : 'URLs'}
        </button>
      </div>
    </div>
  );
}

export default URLList;
