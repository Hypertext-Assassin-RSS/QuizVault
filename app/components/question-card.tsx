import { CheckCircle, XCircle } from "lucide-react";
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
    if (selectedAnswer === null) return "hover:bg-gray-100";
    if (index === question.correct) return "bg-green-100 border-green-500";
    if (selectedAnswer === index) return "bg-red-100 border-red-500";
    return "opacity-50";
  };


  console.log('Question',question);

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
          <motion.button  key={index}
            onClick={() => selectedAnswer === null && onAnswerSelect(index)}
            className={`w-full p-4 text-left border rounded-lg transition-all duration-300 ${getButtonClass(
              index
            )}`}
            variants={optionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            >
              <div className="flex items-center justify-between text-black">
              <span>{option}</span>
              {selectedAnswer !== null && index === question.correct && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {selectedAnswer === index && index !== question.correct && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
