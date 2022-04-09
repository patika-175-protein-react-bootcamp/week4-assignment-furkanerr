import React, { useContext, useState, useEffect } from "react";

const ScoreContext = React.createContext();

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tour, setTour] = useState(1);
  const [questionList, setQuestionList] = useState([]);
  const [totalResults, setTotalResults] = useState([{
    totalScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  }]);
  const [soruSayisi, setSoruSayisi] = useState(1);

  let totalScore=0, totalQuestions, correctAnswers;
 

  useEffect(() => {
    totalScore += score;
    totalQuestions = 10;
    correctAnswers = questionList.filter(
      (item) => item.isCorrect === true
    ).length;
    
    setTotalResults([
      {
        totalScore: totalScore,
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
      }
    ]);
   
  }, [soruSayisi,score]);
   
 


 
  useEffect(() => {
   
    const total = JSON.parse(localStorage.getItem("total"));
    console.log("girdi");
    console.log(total);
    if (!total) {
      console.log("girdi");
      localStorage.setItem("total", JSON.stringify([
        {
          totalScore: 0,
          totalQuestions: 0,
          correctAnswers: 0,
        }
      ]));
    } else {
      if(soruSayisi >10){
      const newTotalResults = [{
       
        totalScore:totalResults[0].totalScore+parseInt(total[0].totalScore || 0),
        totalQuestions:totalResults[0].totalQuestions+parseInt(total[0].totalQuestions || 0),
        correctAnswers: totalResults[0].correctAnswers+parseInt(total[0].correctAnswers || 0),
      }]
      
      localStorage.setItem("total", JSON.stringify(newTotalResults));
      console.log(newTotalResults);
    }
    }
    
  }, [soruSayisi]);

 
 
  

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        tour,
        setTour,
        questionList,
        setQuestionList,
        soruSayisi,
        setSoruSayisi,
        totalResults,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
const useScore = () => useContext(ScoreContext);
export { ScoreProvider, ScoreContext, useScore };
