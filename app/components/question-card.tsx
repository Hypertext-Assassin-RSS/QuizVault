
import { Question } from "@/app/interface/quiz";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  totalQuestions: number;
  currentQuestion: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  totalQuestions,
  currentQuestion,
}: QuestionCardProps) {
  const getButtonClass = (index: number): string => {
    return selectedAnswer === index 
      ? "bg-blue-200 border-blue-500"
      : "hover:bg-gray-100";
  };

  const optionVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Question {currentQuestion + 1} of {totalQuestions}
      </h2>
      <p className="text-gray-600 mb-4">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => selectedAnswer === null && onAnswerSelect(index)}
            className={`w-full p-4 text-left border rounded-lg transition-all duration-300 ${getButtonClass(index)}`}
            variants={optionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center text-black">
              <span>{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
