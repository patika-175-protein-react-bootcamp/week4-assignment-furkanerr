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
    tour,
    setTour,
    questionList,
    setQuestionList,
    setSoruSayisi,
    totalResults,
  } = useScore();

  



  const IconStyle = {
    display: "block",
    marginRight: "6rem",
  };

  const handleRestart = () => {
    // tur sayısını 1 arttırır. scor ve soru sayısını sıfırlar. soruListesini sıfırlar
    setTour((x) => x + 1);
    setScore(0);
    setQuestionList([]);
    setSoruSayisi(1);
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
            Questions: {questionList.length ? questionList.length : 0}
          </div>
          <div className="CorrectAnswersText">
            Correct Answers:{" "}
            {questionList.filter((item) => item.isCorrect === true).length}
          </div>
        </div>
        <Link to={"/questions"} onClick={handleRestart}>
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
          {questionList.map((item, index) => {
            return (
              <div className="QuestionsResults" key={index}>
                <div className="QuestionResult">
                  {item.soru}={item.cevap}
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
