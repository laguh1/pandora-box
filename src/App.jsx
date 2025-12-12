import { useState } from 'react';
import TopicCard from './components/TopicCard';
import TopicModal from './components/TopicModal';
import SettingsModal from './components/SettingsModal';
import topicsData from './data/topics';
import './App.css';

function App() {
  const [topics, setTopics] = useState(topicsData);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const handleAddTopic = (name) => {
    // Available colors from both palettes not yet used
    const availableColors = ['#9E1C60', '#811844', '#561530'];
    const colorIndex = topics.length % availableColors.length;

    const newTopic = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      color: availableColors[colorIndex],
      chromeColor: 'pink',
      urls: []
    };

    setTopics([...topics, newTopic]);
  };

  const handleAddLink = (topicId, title, url) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const newUrl = {
          id: topic.urls.length + 1,
          title,
          url
        };
        return {
          ...topic,
          urls: [...topic.urls, newUrl]
        };
      }
      return topic;
    }));
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-left">
          <img src="/openbox.svg" alt="Open Box" className="app__logo" />
          <h1 className="app__title">Pandora Box</h1>
        </div>
        <button
          className="app__settings-btn"
          onClick={() => setShowSettings(true)}
          aria-label="Settings"
        >
          <img src="/screw.svg" alt="Settings" className="app__settings-icon" />
        </button>
      </header>

      <main className="app__main">
        <div className="app__grid">
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={handleTopicClick}
            />
          ))}
        </div>
      </main>

      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={handleCloseModal}
        />
      )}

      {showSettings && (
        <SettingsModal
          topics={topics}
          onClose={() => setShowSettings(false)}
          onAddTopic={handleAddTopic}
          onAddLink={handleAddLink}
        />
      )}
    </div>
  );
}

export default App;
