import { MoodEntry } from '../types/mood';

const MOOD_ENTRIES_KEY = 'mood-garden-entries';

export const getMoodEntries = (): MoodEntry[] => {
  try {
    const stored = localStorage.getItem(MOOD_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading mood entries from localStorage:', error);
    return [];
  }
};
//
//
export const saveMoodEntries = (entries: MoodEntry[]): void => {
  try {
    localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving mood entries to localStorage:', error);
  }
};

export const addMoodEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry => {
  const entries = getMoodEntries();
  const newEntry: MoodEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  // Remove any existing entry for the same date
  const filteredEntries = entries.filter(e => e.date !== entry.date);
  const updatedEntries = [...filteredEntries, newEntry].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  saveMoodEntries(updatedEntries);
  return newEntry;
};

export const clearAllEntries = (): void => {
  try {
    localStorage.removeItem(MOOD_ENTRIES_KEY);
  } catch (error) {
    console.error('Error clearing mood entries:', error);
  }
};

export const getTodaysEntry = (): MoodEntry | null => {
  const entries = getMoodEntries();
  const today = new Date().toISOString().split('T')[0];
  return entries.find(entry => entry.date === today) || null;
};