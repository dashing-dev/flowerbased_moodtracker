import React, { useState } from 'react';
import { MoodEntry } from '../types/mood';
import { Smile, Frown, Meh, FrownIcon, SmileIcon } from 'lucide-react';

interface HomeProps {
  todaysEntry: MoodEntry | null;
  onAddEntry: (mood: MoodEntry['mood'], note: string) => void;
}

export const Home: React.FC<HomeProps> = ({ todaysEntry, onAddEntry }) => {
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { value: 'very-sad', label: 'Very Sad', icon: FrownIcon, color: 'text-red-500', bg: 'bg-red-50 border-red-200' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200' },
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-50 border-green-200' },
    { value: 'very-happy', label: 'Very Happy', icon: SmileIcon, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Smooth animation
    onAddEntry(selectedMood, note);
    setSelectedMood(null);
    setNote('');
    setIsSubmitting(false);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (todaysEntry) {
    const moodData = moods.find(m => m.value === todaysEntry.mood);
    const MoodIcon = moodData?.icon || Meh;

    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mood Garden</h1>
          <p className="text-gray-600">{today}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border-2 border-green-200">
              <MoodIcon size={32} className={moodData?.color || 'text-gray-500'} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Today's mood logged!</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Mood: <span className="font-medium">{moodData?.label}</span></p>
              {todaysEntry.note && (
                <p className="text-sm text-gray-700 italic">"{todaysEntry.note}"</p>
              )}
            </div>
            <p className="text-sm text-green-600">Your garden is growing! Check the Garden tab to see your progress.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mood Garden</h1>
        <p className="text-gray-600 mb-4">{today}</p>
        <p className="text-sm text-gray-500">How are you feeling today?</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select your mood</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {moods.map((mood) => {
              const MoodIcon = mood.icon;
              const isSelected = selectedMood === mood.value;
              
              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? `${mood.bg} border-current transform scale-105`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <MoodIcon size={24} className={isSelected ? mood.color : 'text-gray-400'} />
                  <span className={`text-xs font-medium ${isSelected ? 'text-gray-700' : 'text-gray-500'}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind? (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share your thoughts, experiences, or what influenced your mood today..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">{note.length}/200 characters</p>
        </div>

        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? 'Planting your mood...' : 'Plant Today\'s Mood 🌱'}
        </button>
      </form>
    </div>
  );
};