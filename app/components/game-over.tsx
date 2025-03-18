import { DotLottieReact } from "@lottiefiles/dotlottie-react";


interface GameOverProps {
  onRestart: () => void;
  score: number;
  totalQuestions: number;
}
export default function GameOver({
  onRestart,
  score,
  totalQuestions,
}: GameOverProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  return (
    <div className="p-8 text-center">
      <DotLottieReact
        src="https://lottie.host/c3f3acb6-bc0e-4819-aba3-6d37091bff20/x63qGFVie7.json"
        loop
        autoplay
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
      <p className="text-lg text-gray-600">
        Final Score: {score}/{totalQuestions}
      </p>
      <p className="mt-2 text-gray-500">({percentage}% correct)</p>
      <button
        onClick={onRestart}
        className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors≈"
      >
        Play Again
      </button>
    </div>
  );
}
