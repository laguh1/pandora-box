import React from 'react';
import './TopicCard.css';

function TopicCard({ topic, onClick }) {
  // Use dark text for light colored cards
  const isDarkText = topic.id === 'movies' || topic.id === 'social-media' || topic.id === 'crochet';

  return (
    <button
      className="topic-card"
      style={{
        backgroundColor: topic.color,
        color: isDarkText ? '#11224E' : '#FFFFFF'
      }}
      onClick={() => onClick(topic)}
      aria-label={`Open ${topic.name} shortcuts`}
    >
      <h2 className="topic-card__title">{topic.name}</h2>
    </button>
  );
}

export default TopicCard;
