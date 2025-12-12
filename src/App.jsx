import { useState } from 'react';
import TopicCard from './components/TopicCard';
import TopicModal from './components/TopicModal';
import topics from './data/topics';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Pandora Box</h1>
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
    </div>
  );
}

export default App;
