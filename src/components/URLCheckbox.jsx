import React from 'react';
import './URLCheckbox.css';

function URLCheckbox({ url, checked, onChange, accentColor, onDelete }) {
  const handleOpenUrl = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await chrome.tabs.create({ url: url.url, active: true });
    } catch (error) {
      console.error('Error opening URL:', error);
      // Fallback for non-extension environments
      window.open(url.url, '_blank');
    }
  };

  return (
    <div className="url-checkbox">
      <label className="url-checkbox__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(url.id, e.target.checked)}
          className="url-checkbox__input"
          style={{
            accentColor: accentColor
          }}
        />
        <div className="url-checkbox__content">
          <button
            className="url-checkbox__title url-checkbox__title--clickable"
            onClick={handleOpenUrl}
            title={`Open ${url.title}`}
          >
            {url.title}
          </button>
        </div>
      </label>
      {onDelete && (
        <button
          className="url-checkbox__delete"
          onClick={() => onDelete(url.id)}
          aria-label="Delete URL"
          title="Delete URL"
        >
          🗑️
        </button>
      )}
    </div>
  );
}

export default URLCheckbox;
