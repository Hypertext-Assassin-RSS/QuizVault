"use client"

import { useEffect, useState } from "react";
import { GameState } from "@/app/interface/quiz";
import StartScreen from "@/app/components/start-screen";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
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
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto h-fit bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {gameState === "start" && <StartScreen onStart={handleStart} />}
      </div>
    </div>
  );
}