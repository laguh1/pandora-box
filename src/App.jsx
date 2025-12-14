import { useState, useEffect } from 'react';
import TopicCard from './components/TopicCard';
import TopicModal from './components/TopicModal';
import SettingsModal from './components/SettingsModal';
// Import data based on build variant
import customisedData from './data/customised';
import defaultData from './data/default';
import './App.css';

// Select the correct data file based on build variant
const topicsData = import.meta.env.VITE_BUILD_VARIANT === 'customised'
  ? customisedData
  : defaultData;

function App() {
  const [topics, setTopics] = useState(topicsData);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load topics from Chrome storage on mount
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const result = await chrome.storage.local.get(['topics']);
        if (result.topics && result.topics.length > 0) {
          setTopics(result.topics);
        }
      } catch (error) {
        console.error('Error loading topics from storage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTopics();
  }, []);

  // Save topics to Chrome storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveTopics = async () => {
        try {
          await chrome.storage.local.set({ topics });
        } catch (error) {
          console.error('Error saving topics to storage:', error);
        }
      };

      saveTopics();
    }
  }, [topics, isLoaded]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const handleAddTopic = (name) => {
    // Available colors from the palette
    const availableColors = [
      { color: '#E68369', chromeColor: 'orange' },    // Coral Pink
      { color: '#CBD99B', chromeColor: 'green' },     // Sage Green
      { color: '#9E1C60', chromeColor: 'pink' },      // Dark Magenta
      { color: '#F5AD18', chromeColor: 'yellow' },    // Gold/Yellow
      { color: '#006989', chromeColor: 'cyan' }       // Deep Teal
    ];
    const colorIndex = topics.length % availableColors.length;
    const selectedColor = availableColors[colorIndex];

    const newTopic = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      icon: '📁',  // Default folder icon for new topics
      color: selectedColor.color,
      chromeColor: selectedColor.chromeColor,
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

  const handleDeleteUrl = (urlId) => {
    if (selectedTopic) {
      setTopics(topics.map(topic => {
        if (topic.id === selectedTopic.id) {
          return {
            ...topic,
            urls: topic.urls.filter(url => url.id !== urlId)
          };
        }
        return topic;
      }));
      // Update selectedTopic to reflect the change
      setSelectedTopic(prev => ({
        ...prev,
        urls: prev.urls.filter(url => url.id !== urlId)
      }));
    }
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
          onAddUrl={handleAddLink}
          onDeleteUrl={handleDeleteUrl}
        />
      )}

      {showSettings && (
        <SettingsModal
          topics={topics}
          onClose={() => setShowSettings(false)}
          onAddTopic={handleAddTopic}
        />
      )}
    </div>
  );
}

export default App;
