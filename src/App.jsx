import { useState, useEffect } from 'react';
import TopicCard from './components/TopicCard';
import TopicModal from './components/TopicModal';
import SettingsModal from './components/SettingsModal';
// Import data based on build variant
import customisedData from './data/customised';
import defaultData from './data/default';
import { getPalette, applyPalette, assignTopicColors } from './data/palettes';
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
  const [currentPalette, setCurrentPalette] = useState('current');
  const [draggedTopic, setDraggedTopic] = useState(null);
  const [draggedOverTopic, setDraggedOverTopic] = useState(null);

  // Load topics and palette from Chrome storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await chrome.storage.local.get(['topics', 'palette']);

        // Load palette first and apply it
        const paletteId = result.palette || 'current';
        setCurrentPalette(paletteId);
        const palette = getPalette(paletteId);
        applyPalette(palette);

        // Load topics and apply palette colors
        if (result.topics && result.topics.length > 0) {
          const topicsWithColors = assignTopicColors(result.topics, palette);
          setTopics(topicsWithColors);
        } else {
          // Apply palette to default topics
          const topicsWithColors = assignTopicColors(topicsData, palette);
          setTopics(topicsWithColors);
        }
      } catch (error) {
        console.error('Error loading from storage:', error);
        // Apply default palette on error
        const palette = getPalette('current');
        applyPalette(palette);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
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
    const palette = getPalette(currentPalette);

    // Determine which accent color to use (rotate through 3 colors)
    const colorIndex = topics.length % 3;
    const accentColors = [
      { color: palette.colors.accent1, chromeColor: palette.chromeColors.accent1 },
      { color: palette.colors.accent2, chromeColor: palette.chromeColors.accent2 },
      { color: palette.colors.accent3, chromeColor: palette.chromeColors.accent3 }
    ];
    const selectedColor = accentColors[colorIndex];

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

  const handlePaletteChange = async (paletteId) => {
    setCurrentPalette(paletteId);
    const palette = getPalette(paletteId);

    // Apply new palette
    applyPalette(palette);

    // Update topic colors
    const updatedTopics = assignTopicColors(topics, palette);
    setTopics(updatedTopics);

    // Save palette to storage
    try {
      await chrome.storage.local.set({ palette: paletteId });
    } catch (error) {
      console.error('Error saving palette:', error);
    }
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

  const handleEditUrl = (topicId, urlId, newTitle, newUrl) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          urls: topic.urls.map(url =>
            url.id === urlId
              ? { ...url, title: newTitle, url: newUrl }
              : url
          )
        };
      }
      return topic;
    }));
    // Update selectedTopic to reflect the change
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic(prev => ({
        ...prev,
        urls: prev.urls.map(url =>
          url.id === urlId
            ? { ...url, title: newTitle, url: newUrl }
            : url
        )
      }));
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, topic) => {
    setDraggedTopic(topic);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTopic(null);
    setDraggedOverTopic(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTopic) => {
    e.preventDefault();

    if (!draggedTopic || draggedTopic.id === targetTopic.id) {
      return;
    }

    const draggedIndex = topics.findIndex(t => t.id === draggedTopic.id);
    const targetIndex = topics.findIndex(t => t.id === targetTopic.id);

    const newTopics = [...topics];
    newTopics.splice(draggedIndex, 1);
    newTopics.splice(targetIndex, 0, draggedTopic);

    setTopics(newTopics);
    setDraggedTopic(null);
    setDraggedOverTopic(null);
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-left">
          <img src="/openbox_transparent.png" alt="Open Box" className="app__logo" />
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
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedTopic?.id === topic.id}
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
          onEditUrl={handleEditUrl}
        />
      )}

      {showSettings && (
        <SettingsModal
          topics={topics}
          onClose={() => setShowSettings(false)}
          onAddTopic={handleAddTopic}
          currentPalette={currentPalette}
          onPaletteChange={handlePaletteChange}
        />
      )}
    </div>
  );
}

export default App;
