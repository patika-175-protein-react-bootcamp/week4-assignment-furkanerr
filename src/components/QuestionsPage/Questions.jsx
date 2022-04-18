/* Dependencies */
import React, { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// import the useWindowSize
import  useWindowSize  from "../../hooks/useWindowSize";

/*style*/
import "./QuestionsStyle.css";
/*Icons*/
import { SoruEkraniIcon,AnswerCircleIcon} from "../../constants/icons";

/**Context */
import { useScore } from "../../contexts/scoreContext";

function Questions() {
  const {
    checkAnswer,
        answers,
        question,
        correctAnswer,
        incorrectAnswer,
        score,
        tour,
        setTour,
        allQuestions,
        correctAnswersNumber,
        createQuestion,
        isCorrect,
        
  } = useScore();
  const [selectedOption, setSelectedOption] = useState();
  const [screenWidth,screenHeight] =useWindowSize();


  useEffect(() => {
    createQuestion();
  }, []);

  const backgrooundStyle = isCorrect === true ? 'containerGreen' : isCorrect===false ? 'containerRed' : 'container';

  return (
    <>
      <div className={backgrooundStyle}>
        <div className="left">
          <div className="QuestionTableAndMan">
            <SoruEkraniIcon width={screenWidth} height={screenHeight} />
          </div>
          <div className="question">
            {question}
          </div>
        </div>
        <div className="right">
          <div className="ScoreBoard">
            <div className="Score">Score: {score}</div>
            <div className="Tour">Tour: {tour}</div>
            <div className="Questions">
              Questions:{correctAnswersNumber}/{allQuestions.length}
            </div>
          </div>
          <div className="answers">
            {answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  className={`answer${index+1} answer`}
                  onClick={() =>{ 
                    setSelectedOption(answer);
                    checkAnswer(answer)}}
                >
                     {
                    //if isCorrect is null, Icon color is white
                    isCorrect === null && (  <AnswerCircleIcon color={'white'} width={screenWidth} height={screenHeight} />) 

                  }
                  {
                    // if isCorrect is true and selectedOption is equal to correctAnswer, Icon color is #2D2D2D else icon color is white
                    isCorrect === true &&(
                    <AnswerCircleIcon   width={screenWidth} height={screenHeight} 
                    color={answer === correctAnswer ? "#2D2D2D" : "white"}/>
                    ) 
                  }
                  {
                    // if isCorrect is false and option is equal to selectedOption,  Icon color is #2D2D2D  if option is equal to correctAnswer, Icon color is #00bf63 else icon color is white
                    isCorrect === false && (
                    <AnswerCircleIcon width={screenWidth} height={screenHeight} 
                    color={answer === selectedOption ? "#2D2D2D" :
                    answer === correctAnswer ? "#00bf63" : "white"}/>
                    )

                  }
                  <div className={`answerSayi${index+1}`}>
                  {answer}
                  </div>
                </div>
                
               

              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
