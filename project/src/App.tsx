import React, { useState } from 'react';
import { Home } from './components/Home';
import { Garden } from './components/Garden';
import { History } from './components/History';
import { Navigation } from './components/Navigation';
import { useMoodData } from './hooks/useMoodData';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'garden' | 'history'>('home');
  const { entries, todaysEntry, addEntry, gardenStage, entryCount } = useMoodData();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home todaysEntry={todaysEntry} onAddEntry={addEntry} />;
      case 'garden':
        return <Garden entryCount={entryCount} gardenStage={gardenStage} />;
      case 'history':
        return <History entries={entries} />;
      default:
        return <Home todaysEntry={todaysEntry} onAddEntry={addEntry} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </div>
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </div>
  );
}

export default App;



