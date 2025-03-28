"use client"

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameState, Question } from "@/app/interface/quiz";
import StartScreen from "@/app/components/start-screen";
import Timer from "@/app/components/timer";
import QuestionCard from "@/app/components/question-card";
import GameOver from "@/app/components/game-over";
import Welcome from "@/app/components/welcome";
import { User } from "./interface/user";
import PocketBase from 'pocketbase';
import { Bounce, toast, ToastContainer } from "react-toastify";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_URL);

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [user, setUser] = useState<User>();
  const [questions, setQuestions] = useState<Question[]>([]);

  const changeGameState = (newState: GameState, delay: number = 1500) => {
    setTimeout(() => {
      setGameState(newState);
    }, delay);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      toast.info("Welcome back!");
      changeGameState("start");
    } else {
      toast.info("Enter Your Info First!");
      changeGameState("welcome");
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
      } else {
        changeGameState("end");
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState, currentQuestion, questions.length]);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!user) return;
      try {
        const resultList = await pb.collection('Questions').getList(1, 50, {
          filter: `grade="${user.grade}"`,
        });
        setQuestions(resultList.items as Question[]);
      } catch (error) {
        console.error("Error fetching Questions:", error);
      }
    };

    fetchQuestion();
  }, [user]);

  const handleStart = () => {
    changeGameState("playing");
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleUserRegistered = () => {
    changeGameState("start");
  };

  const handleAnswer = (index: number): void => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        changeGameState("end");
      }
    }, 1500);
  };

  const handlePrevious = () => {
    if (selectedAnswer !== null) return; 
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    }
  };

  const handleSkip = () => {
    if (selectedAnswer !== null) return; 
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      changeGameState("end");
    }
  };

  const transitionSettings = { duration: 0.5, delay: 0.2 };
  const fadeTransition = { duration: 0.5 };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <AnimatePresence>
          {gameState === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={transitionSettings}
            >
              <Welcome onUserRegistered={handleUserRegistered} />
            </motion.div>
          )}

          {gameState === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={transitionSettings}
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={fadeTransition}
              className="p-6"
            >
              <Timer timeLeft={timeLeft} />
              <QuestionCard
                question={questions[currentQuestion]}
                onAnswerSelect={handleAnswer}
                selectedAnswer={selectedAnswer}
                totalQuestions={questions.length}
                currentQuestion={currentQuestion}
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || selectedAnswer !== null}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={handleSkip}
                  disabled={selectedAnswer !== null}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}

          {gameState === "end" && (
            <motion.div
              key="end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={transitionSettings}
            >
              <GameOver
                score={score}
                totalQuestions={questions.length}
                onRestart={handleStart}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}
