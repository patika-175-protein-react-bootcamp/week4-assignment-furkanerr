import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { LineUnderHeader, StartCircleIcon } from '../../constants/icons';
import  './HomeStyle.css';
function HomePage() {

const [result,setResult] = useState([]);

  useEffect(() => {
    
   setResult(JSON.parse(localStorage.getItem('total')));
    
  }, [])
  
 

  return (
      <div className='HomeContainer' >
          <div className='Header'>
            <div className='HeaderText'>Mathematics Game</div>
            <LineUnderHeader/>
          </div>
          <div className='Results'>
            <div className='TotalPointText'>Total Point: {result[0]?.totalScore}</div>
            <div className='TotalQuestionsText'>Total Questions: {result[0]?.totalQuestions  }</div>
            <div className='CorrectAnswersText'>Correct Answers: {result[0]?.correctAnswers  }</div>
          </div>
          <Link to="questions">
          <div className='StartButton'>
            <div className='StartButtonText'>Start</div>
            <StartCircleIcon/>
          </div>
          </Link>
</div>


  )
}

export default HomePage