import type { LocalStorageData } from '../../localstorage/interfaces/LocalStorageData';

export interface OllamaFeedbackItem {
  question: string;
  answer: string;
  score: number;
  reason?: string;
  like: boolean;
}

export interface OllamaFeedbackDatabase extends LocalStorageData {
  items: OllamaFeedbackItem[];
}
