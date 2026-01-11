import React, { useState } from 'react';
import './TopicCard.css';

function TopicCard({ topic, onClick, onDragStart, onDragEnd, onDragOver, onDrop, isDragging }) {
  // Determine if the card background is light (needs dark text)
  const isLightBackground = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const isDarkText = isLightBackground(topic.color);

  // Get contrasting color for inner boxes based on card color
  // Use CSS variables from the palette for dynamic color changes
  const getInnerBoxStyles = () => {
    // Get CSS variable values
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary').trim();

    // For light backgrounds, use the primary color (darker)
    // For dark backgrounds, use a lighter shade
    if (isDarkText) {
      return {
        backgroundColor: primaryColor,
        color: '#FFFFFF'
      };
    } else {
      return {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent dark overlay
        color: '#FFFFFF'
      };
    }
  };

  const innerBoxStyles = getInnerBoxStyles();

  // Show up to 3 links, and "..." button only if there are more than 3
  const hasMoreThanThree = topic.urls.length > 3;
  const displayUrls = topic.urls.slice(0, 3);

  // Handle URL click - open in new tab
  const handleUrlClick = (e, url) => {
    e.stopPropagation(); // Prevent topic modal from opening

    // Try Chrome extension API first
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      // Fallback for development mode
      window.open(url, '_blank');
    }
  };

  // Handle "Others" click - open the topic modal
  const handleOthersClick = (e) => {
    e.stopPropagation(); // Prevent double-triggering
    onClick(topic);
  };

  return (
    <button
      className={`topic-card ${isDragging ? 'topic-card--dragging' : ''}`}
      style={{
        backgroundColor: topic.color,
        color: isDarkText ? '#213448' : '#FFFFFF'
      }}
      onClick={() => onClick(topic)}
      draggable="true"
      onDragStart={(e) => onDragStart(e, topic)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, topic)}
      aria-label={`Open ${topic.name} shortcuts`}
    >
      <div className="topic-card__header">
        <div className="topic-card__content">
          {topic.icon && <span className="topic-card__icon">{topic.icon}</span>}
          <h2 className="topic-card__title">{topic.name}</h2>
        </div>
      </div>

      {displayUrls.length > 0 && (
        <div className="topic-card__quick-urls">
          {displayUrls.map((url) => (
            <button
              key={url.id}
              className="topic-card__url-box"
              onClick={(e) => handleUrlClick(e, url.url)}
              title={url.title}
              style={innerBoxStyles}
            >
              {url.title}
            </button>
          ))}
          {hasMoreThanThree && (
            <button
              className="topic-card__url-box topic-card__url-box--more"
              onClick={handleOthersClick}
              title="View all links"
              style={innerBoxStyles}
            >
              ...
            </button>
          )}
        </div>
      )}
    </button>
  );
}

export default TopicCard;
