import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { LineUnderHeader, StartCircleIcon } from '../../constants/icons';
import  './HomeStyle.css';
function HomePage() {

  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('totalScore')) {
      setTotalScore(localStorage.getItem('totalScore'));
    }

    if (localStorage.getItem('totalQuestions')) {
      setTotalQuestions(localStorage.getItem('totalQuestions'));
    }

    if (localStorage.getItem('totalCorrectAnswers')) {
      setTotalCorrectAnswers(localStorage.getItem('totalCorrectAnswers'));
    }
  }, []);
  
 

  return (
      <div className='HomeContainer' >
          <div className='Header'>
            <div className='HeaderText'>Mathematics Game</div>
            <LineUnderHeader/>
          </div>
          <div className='Results'>
            <div className='TotalPointText'>Total Point: {totalScore}</div>
            <div className='TotalQuestionsText'>Total Questions: {totalQuestions}</div>
            <div className='CorrectAnswersText'>Correct Answers: {totalCorrectAnswers}</div>
          </div>
          <Link to="questions" style={{textDecoration:'none'}}>
          <div className='StartButton'>
            <div className='StartButtonText'>Start</div>
            <StartCircleIcon/>
          </div>
          </Link>
</div>


  )
}

export default HomePage