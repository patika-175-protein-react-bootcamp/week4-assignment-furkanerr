import React, { useEffect, useState } from "react";
import {
  FalseIcon,
  LineUnderAllQuestion,
  LineUnderFinal,
  TrueIcon,
} from "../../constants/icons";
import RestartIcon from "../../constants/icons/restartIcon";
import "./ResultStyle.css";
import { useScore } from "../../contexts/scoreContext";
import { Link } from "react-router-dom";
function ResultPage() {
  const {
  
    score,
    setScore,
    setTour,
    allQuestions,
    correctAnswersNumber,
    setCorrectAnswer,
    setCorrectAnswersNumber,
    setIncorrectAnswer,
    setQuestion,
    setIsCorrect,
    setAllQuestions,
  
  } = useScore();

  



  const IconStyle = {
    display: "block",
    marginRight: "6rem",
  };

  const handleRestart = () => {
   setAllQuestions([]);
    setCorrectAnswer(0);
    setIncorrectAnswer(0);
    setCorrectAnswersNumber(0);
    setQuestion("");
    setIsCorrect(null);
    setTour((x) => x + 1);
    setScore(0);

  };
  return (
    <div className="ResultPageContainer">
      <div className="Left">
        <div className="FinalHeader">
          <div className="FinalHeaderText">Final</div>
          <LineUnderFinal />
        </div>
        <div className="GameResult">
          <div className="PointText">Point: {score}</div>
          <div className="QuestionsText">
            Questions: {allQuestions.length}
          </div>
          <div className="CorrectAnswersText">
            Correct Answers:{" "}
            {correctAnswersNumber}
          </div>
        </div>
        <Link to={"/questions"} onClick={handleRestart} style={{textDecoration:'none'}}>
          <div className="RestartButton">
            <div className="RestartButtonText">Restart</div>

            <RestartIcon />
          </div>
        </Link>
      </div>

      <div className="Right">
        <div className="AllQuestionsHeader">
          <div className="AllQuestionsHeaderText">All Questions</div>
          <LineUnderAllQuestion />
        </div>
        <div className="QuestionsResultsContainer">
          {allQuestions.map((item, index) => {
            return (
              <div className="QuestionsResults" key={index}>
                <div className="QuestionResult">
                  {item.question}={item.correct}
                </div>
                {item.isCorrect ? (
                  <TrueIcon style={IconStyle} />
                ) : (
                  <FalseIcon style={IconStyle} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
