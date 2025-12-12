import React from 'react';
import './URLCheckbox.css';

function URLCheckbox({ url, checked, onChange, accentColor }) {
  return (
    <label className="url-checkbox">
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
        <span className="url-checkbox__title">{url.title}</span>
        <span className="url-checkbox__url">{url.url}</span>
      </div>
    </label>
  );
}

export default URLCheckbox;
