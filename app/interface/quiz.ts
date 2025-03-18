export type GameState = "welcome" | "start" | "playing" | "end";

export interface Question {
  collectionId: string,
  collectionName: string,
  id: string,
  question: string;
  options: string[];
  correct: number;
}