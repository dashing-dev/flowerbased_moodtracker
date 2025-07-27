import React from 'react';
import { useMoodData } from '../hooks/useMoodData';

interface GardenProps {
  entryCount: number;
  gardenStage: {
    name: string;
    emoji: string;
    description: string;
    minEntries: number;
  };
}

export const Garden: React.FC<GardenProps> = ({ entryCount, gardenStage }) => {
  const { resetGarden } = useMoodData();

  const getProgressToNextStage = () => {
    if (entryCount === 0) return { current: 0, next: 1, progress: 0 };
    if (entryCount === 1) return { current: 1, next: 2, progress: 50 };
    if (entryCount <= 3) return { current: entryCount, next: 4, progress: ((entryCount - 1) / 2) * 100 };
    if (entryCount <= 6) return { current: entryCount, next: 7, progress: ((entryCount - 3) / 3) * 100 };
    return { current: entryCount, next: null, progress: 100 };
  };

  const { current, next, progress } = getProgressToNextStage();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your garden? This will delete all your mood entries and cannot be undone.')) {
      resetGarden();
    }
  };

  const renderGardenVisualization = () => {
    if (entryCount === 0) {
      return (
        <div className="flex items-center justify-center h-48 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl border-2 border-dashed border-green-200">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-pulse">🌱</div>
            <p className="text-gray-600 font-medium">Your garden awaits...</p>
          </div>
        </div>
      );
    }

    if (entryCount === 1) {
      return (
        <div className="flex items-center justify-center h-48 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl border border-green-200 relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-bounce">🌱</div>
            <p className="text-gray-600 font-medium">A tiny seed has been planted!</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-100 to-transparent"></div>
        </div>
      );
    }

    if (entryCount <= 3) {
      return (
        <div className="flex items-center justify-center h-48 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl border border-green-200 relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-pulse">🌿</div>
            <p className="text-gray-600 font-medium">Your sprout is growing strong!</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-200 to-transparent"></div>
        </div>
      );
    }

    if (entryCount <= 6) {
      return (
        <div className="flex items-center justify-center h-48 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl border border-green-200 relative overflow-hidden">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-pulse">🌸</div>
            <p className="text-gray-600 font-medium">A beautiful flower has bloomed!</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-200 to-green-100"></div>
          <div className="absolute bottom-2 left-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌱</div>
          <div className="absolute bottom-3 right-6 text-xl animate-bounce" style={{ animationDelay: '1s' }}>🌿</div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-48 bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl border border-green-200 relative overflow-hidden">
        <div className="grid grid-cols-3 gap-4 items-end">
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🌼</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>🌻</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>🌷</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-300 to-green-100"></div>
        <div className="absolute bottom-1 left-2 text-lg animate-pulse">🌱</div>
        <div className="absolute bottom-2 left-8 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌿</div>
        <div className="absolute bottom-1 right-2 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🌱</div>
        <div className="absolute bottom-3 right-8 text-xl animate-pulse" style={{ animationDelay: '1.5s' }}>🌿</div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Mood Garden</h1>
        <p className="text-gray-600">Nurture your emotional well-being</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 space-y-6">
        {renderGardenVisualization()}
        
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{gardenStage.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{gardenStage.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">
                {entryCount} {entryCount === 1 ? 'entry' : 'entries'}
              </span>
            </div>
            
            {next && (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {next - current} more {next - current === 1 ? 'entry' : 'entries'} until next growth stage
                </p>
              </>
            )}
            
            {!next && (
              <div className="text-green-600 text-sm font-medium">
                🎉 Your garden is fully flourishing! Keep nurturing it daily.
              </div>
            )}
          </div>
        </div>
      </div>

      {entryCount > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Garden Management</h3>
          <p className="text-gray-600 text-sm mb-4">
            Need a fresh start? This will permanently delete all your mood entries.
          </p>
          <button
            onClick={handleReset}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Reset Garden 🗑️
          </button>
        </div>
      )}
    </div>
  );
};