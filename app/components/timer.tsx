import { TimerIcon } from "lucide-react";
import React from "react";

interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  const progressPercentage = (timeLeft / 30) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-gray-700">
        <TimerIcon className="w-6 h-6" />
        <span>{timeLeft}s</span>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}