export type GameState = "welcome" | "start" | "playing" | "end";

export interface Question {
  question: string;
  options: string[];
  correct: number;
}