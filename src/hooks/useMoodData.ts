import { useState, useEffect } from 'react';
import { MoodEntry } from '../types/mood';
import { getMoodEntries, addMoodEntry, clearAllEntries, getTodaysEntry } from '../utils/localStorage';

export const useMoodData = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);

  const loadEntries = () => {
    const storedEntries = getMoodEntries();
    setEntries(storedEntries);
    setTodaysEntry(getTodaysEntry());
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const addEntry = (mood: MoodEntry['mood'], note: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = addMoodEntry({ date: today, mood, note });
    loadEntries();
    return newEntry;
  };

  const resetGarden = () => {
    clearAllEntries();
    loadEntries();
  };

  const getGardenStage = () => {
    const count = entries.length;
    if (count === 0) return { name: 'Empty Garden', emoji: '🌱', description: 'Plant your first seed by logging your mood!', minEntries: 0 };
    if (count === 1) return { name: 'Tiny Seed', emoji: '🌱', description: 'Your journey begins! One more entry to see growth.', minEntries: 0 };
    if (count <= 3) return { name: 'Growing Sprout', emoji: '🌿', description: 'Your garden is taking root! Keep nurturing it.', minEntries: 2 };
    if (count <= 6) return { name: 'Blooming Flower', emoji: '🌸', description: 'Beautiful! Your consistency is paying off.', minEntries: 4 };
    return { name: 'Flourishing Garden', emoji: '🌼🌻🌷', description: 'Amazing! Your garden is thriving with regular care.', minEntries: 7 };
  };

  return {
    entries,
    todaysEntry,
    addEntry,
    resetGarden,
    gardenStage: getGardenStage(),
    entryCount: entries.length
  };
};

