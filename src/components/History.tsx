import React, { useState } from 'react';
import { MoodEntry } from '../types/mood';
import { Smile, Frown, Meh, FrownIcon, SmileIcon, Search, Calendar } from 'lucide-react';

interface HistoryProps {
  entries: MoodEntry[];
}

export const History: React.FC<HistoryProps> = ({ entries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const moods = {
    'very-sad': { label: 'Very Sad', icon: FrownIcon, color: 'text-red-500', bg: 'bg-red-50' },
    'sad': { label: 'Sad', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50' },
    'neutral': { label: 'Neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    'happy': { label: 'Happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-50' },
    'very-happy': { label: 'Very Happy', icon: SmileIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  };

  const filteredEntries = entries.filter(entry => 
    entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
    moods[entry.mood].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.date.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getMoodStats = () => {
    if (entries.length === 0) return null;
    
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<MoodEntry['mood'], number>);

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0] as MoodEntry['mood']] > moodCounts[b[0] as MoodEntry['mood']] ? a : b
    );

    return {
      total: entries.length,
      mostCommonMood: mostCommon[0] as MoodEntry['mood'],
      streak: calculateCurrentStreak(entries)
    };
  };

  const calculateCurrentStreak = (entries: MoodEntry[]) => {
    if (entries.length === 0) return 0;
    
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const stats = getMoodStats();

  if (entries.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mood History</h1>
          <p className="text-gray-600 mb-8">Track your emotional journey over time</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100 text-center">
          <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No entries yet</h3>
          <p className="text-gray-600">Start logging your daily moods to see your history here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mood History</h1>
        <p className="text-gray-600">Track your emotional journey over time</p>
      </div>

      {stats && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Journey</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-blue-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-xs text-blue-600">Total Entries</div>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">{stats.streak}</div>
              <div className="text-xs text-green-600">Day Streak</div>
            </div>
            <div className="text-center bg-purple-50 rounded-xl p-3">
              <div className="text-2xl">{moods[stats.mostCommonMood].label === 'Very Happy' ? '😊' : moods[stats.mostCommonMood].label === 'Happy' ? '🙂' : moods[stats.mostCommonMood].label === 'Neutral' ? '😐' : moods[stats.mostCommonMood].label === 'Sad' ? '🙁' : '😢'}</div>
              <div className="text-xs text-purple-600">Most Common</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredEntries.map((entry) => {
            const moodData = moods[entry.mood];
            const MoodIcon = moodData.icon;

            return (
              <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${moodData.bg} flex items-center justify-center border-2 border-white shadow-sm`}>
                  <MoodIcon size={20} className={moodData.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800">{moodData.label}</h4>
                    <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-600 leading-relaxed">{entry.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredEntries.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <Search size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No entries found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};