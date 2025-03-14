
"use client"

import { useEffect, useState } from "react";
import { GameState } from "@/app/interface/quiz";
import StartScreen from "@/app/components/start-screen";
import Timer from "@/app/components/timer";
import QuestionCard from "@/app/components/question-card";
import { QUESTIONS } from "@/app/data/questions";
import GameOver from "@/app/components/game-over";
import Welcome from "./components/welcome";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("end");
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const handleStart = () => {
    setGameState("playing");
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number): void => {
    setSelectedAnswer(index);
    const isCorrect = index === QUESTIONS[currentQuestion].correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30); // Reset timer next question after answering
      } else {
        setGameState("end");
      }
    }, 1500);
  };

  const handlePrevious = () => {
    if (selectedAnswer !== null) return; // stop changing question if answered
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
      setTimeLeft(30); // reset timer when previous question
    }
  };

  const handleSkip = () => {
    if (selectedAnswer !== null) return; // stop skipping if  answered
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setGameState("end");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto h-fit bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {gameState == "welcome" && (
          <Welcome />
        )}
        {gameState === "start" && <StartScreen onStart={handleStart} />}
        {gameState === "playing" && (
          <div className="p-8">
            <Timer timeLeft={timeLeft} />
            <QuestionCard
              question={QUESTIONS[currentQuestion]}
              onAnswerSelect={handleAnswer}
              selectedAnswer={selectedAnswer}
              totalQuestions={QUESTIONS.length}
              currentQuestion={currentQuestion}
            />
            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || selectedAnswer !== null}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Question
              </button>
              <button
                onClick={handleSkip}
                disabled={selectedAnswer !== null}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Skip Question
              </button>
            </div>
          </div>
        )}
        {gameState === "end" && (
          <GameOver
            score={score}
            totalQuestions={QUESTIONS.length}
            onRestart={handleStart}
          />
        )}
      </div>
    </div>
  );
}
