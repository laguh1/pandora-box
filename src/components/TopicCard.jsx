import React from 'react';
import './TopicCard.css';

function TopicCard({ topic, onClick }) {
  // Use dark text for light colored cards (cream/beige)
  const isDarkText = topic.id === 'movies' || topic.id === 'news';

  // Get contrasting color for inner boxes based on card color
  const getInnerBoxStyles = () => {
    const colorMap = {
      'deutsch': {
        backgroundColor: '#213448', // Dark blue
        color: '#FFFFFF'
      },
      'crochet': {
        backgroundColor: '#547792', // Medium blue
        color: '#FFFFFF'
      },
      'movies': {
        backgroundColor: '#547792', // Medium blue for contrast on cream
        color: '#FFFFFF'
      },
      'social-media': {
        backgroundColor: '#213448', // Dark blue
        color: '#FFFFFF'
      },
      'miscellaneous': {
        backgroundColor: '#547792', // Medium blue
        color: '#FFFFFF'
      },
      'productivity': {
        backgroundColor: '#213448', // Dark blue
        color: '#FFFFFF'
      },
      'development': {
        backgroundColor: '#547792', // Medium blue
        color: '#FFFFFF'
      },
      'news': {
        backgroundColor: '#547792', // Medium blue for contrast on cream
        color: '#FFFFFF'
      }
    };

    return colorMap[topic.id] || {
      backgroundColor: '#213448',
      color: '#FFFFFF'
    };
  };

  const innerBoxStyles = getInnerBoxStyles();

  // Show all URLs if 4 or less, otherwise show 2 + "More" button
  const hasMoreThanFour = topic.urls.length > 4;
  const displayUrls = hasMoreThanFour ? topic.urls.slice(0, 2) : topic.urls.slice(0, 4);

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
      className="topic-card"
      style={{
        backgroundColor: topic.color,
        color: isDarkText ? '#213448' : '#FFFFFF'
      }}
      onClick={() => onClick(topic)}
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
          {hasMoreThanFour && (
            <button
              className="topic-card__url-box topic-card__url-box--more"
              onClick={handleOthersClick}
              title="View all links"
              style={innerBoxStyles}
            >
              More
            </button>
          )}
        </div>
      )}
    </button>
  );
}

export default TopicCard;
