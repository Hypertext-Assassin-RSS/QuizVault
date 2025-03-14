import { Question } from "@/app/interface/quiz";

export const QUESTIONS: Question[] = [
  {
    question: "What does `useState` hook do in React?",
    options: ["Manages state in functional components", "Sets the initial state of a class component", "Handles side effects", "Updates the DOM directly"],
    correct: 0
  },
  {
    question: "Which of the following is used to render a React component?",
    options: ["render() method", "ReactDOM.render()", "useEffect() hook", "createElement() function"],
    correct: 1
  },
  {
    question: "What is the purpose of the `useEffect` hook in React?",
    options: ["To manage state", "To handle side effects in functional components", "To render UI", "To create components"],
    correct: 1
  },
  {
    question: "What is a controlled component in React?",
    options: ["A component that controls its own state", "A component that does not manage its state", "A component that does not re-render", "A component that manages its props"],
    correct: 0
  },
  {
    question: "Which method is used to update state in React class components?",
    options: ["setState()", "useState()", "useEffect()", "updateState()"],
    correct: 0
  }
];
