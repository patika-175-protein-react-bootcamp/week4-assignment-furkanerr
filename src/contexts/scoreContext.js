import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const ScoreContext = React.createContext();

const ScoreProvider = ({ children }) => {
  const [question, setQuestion] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [correctAnswer,setCorrectAnswer] = useState(0);
  const [correctAnswersNumber, setCorrectAnswersNumber] = useState(0);
  const [incorrectAnswer,setIncorrectAnswer] = useState([]);
  const [score,setScore] = useState(0);
  const [tour,setTour] = useState(1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

 
    const createQuestion = () => {
      setIsCorrect(null);
    let  randomNumber1 = Math.floor(Math.random() * 9)+1;
    let  randomNumber2 = Math.floor(Math.random() * 9)+1;
    setQuestion(`${randomNumber1} x ${randomNumber2}`);
    setCorrectAnswer( randomNumber1 * randomNumber2);
     setIncorrectAnswer([randomNumber2 * (randomNumber1 + 1), randomNumber1 * (randomNumber2 - 1)]);
    let allOptions = [randomNumber1 * randomNumber2, randomNumber2 * (randomNumber1 + 1), randomNumber1 * (randomNumber2 - 1)];
    let shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    setAnswers(shuffledOptions);
    };

let checkAnswer
    if (isCorrect === null) {
     checkAnswer = (answer) => {
      if (answer === correctAnswer) {
        setIsCorrect(true);
        setScore((prev) => prev + Math.ceil(Math.sqrt(correctAnswer)));
        setAllQuestions(  [...allQuestions, { question:question, correct:correctAnswer, isCorrect:true }]);
        setCorrectAnswersNumber(correctAnswersNumber + 1);
        setTimeout(() => {
          createQuestion();
          setIsCorrect(null);
        }, 3000);
      } if (answer !== correctAnswer) {
        setIsCorrect(false);
        setAllQuestions(  [...allQuestions, { question:question, correct:correctAnswer, isCorrect:false }]);
        setTimeout(() => {
          createQuestion();
          setIsCorrect(null);
        }, 3000);
      }
    };
  }
  useEffect(() => {
    if (allQuestions.length === 10) {
      setTimeout(() => {
        navigate('/results');
      }, 2500);

      if (localStorage.getItem('totalScore')) {
        const pointsFromStorage = +localStorage.getItem('totalScore');
        localStorage.setItem('totalScore', pointsFromStorage + +score);
      } else {
        localStorage.setItem('totalScore', score);
      }

      if (localStorage.getItem('totalQuestions')) {
        const questionsFromStorage = +localStorage.getItem('totalQuestions');
        localStorage.setItem(
          'totalQuestions',
          questionsFromStorage + allQuestions.length
        );
      } else {
        localStorage.setItem('totalQuestions', allQuestions.length);
      }

      if (localStorage.getItem('totalCorrectAnswers')) {
        const correctAnswersFromStorage = +localStorage.getItem(
          'totalCorrectAnswers'
        );
        localStorage.setItem(
          'totalCorrectAnswers',
          correctAnswersFromStorage + correctAnswersNumber
        );
      } else {
        localStorage.setItem('totalCorrectAnswers', correctAnswersNumber);
      }
    }
  }, [allQuestions]);

 


  return (
    <ScoreContext.Provider
      value={{
        checkAnswer,
        answers,
        question,
        correctAnswer,
        incorrectAnswer,
        score,
        tour,
        setScore,
        setTour,
        allQuestions,
        correctAnswersNumber,
        createQuestion,
        isCorrect,
        setCorrectAnswer,
        setCorrectAnswersNumber,
        setIncorrectAnswer,
        setQuestion,
        setIsCorrect,
        setAllQuestions,
        
        
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
const useScore = () => useContext(ScoreContext);
export { ScoreProvider, ScoreContext, useScore };
