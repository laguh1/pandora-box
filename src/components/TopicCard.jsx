import React from 'react';
import './TopicCard.css';

function TopicCard({ topic, onClick }) {
  return (
    <button
      className="topic-card"
      style={{ backgroundColor: topic.color }}
      onClick={() => onClick(topic)}
      aria-label={`Open ${topic.name} shortcuts`}
    >
      <h2 className="topic-card__title">{topic.name}</h2>
      <div className="topic-card__count">
        {topic.urls.length} {topic.urls.length === 1 ? 'link' : 'links'}
      </div>
    </button>
  );
}

export default TopicCard;
