export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD format
  mood: 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad';
  note: string;
  timestamp: number;
}

export interface GardenStage {
  name: string;
  emoji: string;
  description: string;
  minEntries: number;
}