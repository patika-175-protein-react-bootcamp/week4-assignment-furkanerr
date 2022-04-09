import React, { useState, useEffect } from "react";
import "./QuestionsStyle.css";
import { SoruEkraniIcon, AnswerCircleIcon } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import {useScore} from '../../contexts/scoreContext';
function Questions() {
  const {score,setScore,tour,questionList,setQuestionList,soruSayisi, setSoruSayisi} = useScore();

  let navigate = useNavigate();

  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
 const [containerStyle, setContainerStyle] = useState("container");
  const [correct, setCorrect] = useState(0);
 // const [score, setScore] = useState(0);
  const [dogruSoru, setDogruSoru] = useState(0);
 // const [soruSayisi, setSoruSayisi] = useState(1);
  const [disable, setDisable] = useState(false);
  //push correct answer, firstWrong answer, secondWrong answer to array
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    //set first with random number between 1 and 9
    setFirstNumber(Math.floor(Math.random() * 9) + 1);
    //set second with random number between 1 and 9
    setSecondNumber(Math.floor(Math.random() * 9) + 1);
  }, [soruSayisi]);
  


    //set Wrong with( (fist-1)*second )
    useEffect(() => {
     
       setCorrect(firstNumber * secondNumber);
       //sorunun ilk yanlış, ikinci yanlış,doğru  cevabını set ediyoruz.
       setAnswers([(firstNumber - 1) * secondNumber, (secondNumber + 1) * firstNumber, firstNumber * secondNumber]);
       
     }, [firstNumber, secondNumber]);

    let shuffledAnswers= answers.sort(() => Math.random() - 0.5); // şıklar hep aynı yere denk gelmesin diye answer arrayını random olarak sıralıyoruz.
    


  const handleAnswer = (e) => {
 
 
    //tıklandıktan butonlar sonra disable olacak
    setDisable(true);
    if (soruSayisi <= 10) {
      //soru sayısı 10 dan küçük olduğu sürece olack olan işlemler
      setTimeout(() => {
        //srou sayısını 1 arttırır 3 sn sonra
        setSoruSayisi(soruSayisi + 1);
      }, 3000);
     
    }
    if (parseInt(e.target.innerText) === correct) {
      //eğer cevap doğru ise bilbileri state atar
      setQuestionList([...questionList,{
        soru: firstNumber + " x " + secondNumber,
        cevap: correct,
        isCorrect: true
        }]);
      //arka planı yeşil yapar
      setContainerStyle("containerGreen");
      setTimeout(() => {
        setDisable(false); // butonları tekrardan aktif hale getirir
      setDogruSoru(dogruSoru + 1);
      setScore(Math.floor(Math.sqrt(correct)) + score);
      setContainerStyle("container");
      //3 saniye sonra arka planı siyah yapar, scoru girer, doğru soru sayısını 1 arttırır
      }, 3000);
    }
    else {
      setQuestionList([...questionList,{
        soru: firstNumber + " x " + secondNumber,
        cevap: correct,
        isCorrect: false
        }]);
      setContainerStyle("containerRed");
      setTimeout(() => {
        setDisable(false);
        setContainerStyle("container");
      }, 3000);
    }
  };
  if(soruSayisi===11){
    navigate("/results"); //soru sayısı 11 olunca oyun bitmiş demektir ve sonuç sayfasına yönlendirir
  }
  return (
    <>
      <div className={containerStyle}>
        <div className="left">
          <div className="QuestionTableAndMan">
            <SoruEkraniIcon />
          </div>
          <div className="question">
            {firstNumber} x {secondNumber}
          </div>
        </div>
        <div className="right">
          <div className="ScoreBoard">
            <div className="Score">Score: {score}</div>
            <div className="Tour">Tour: {tour}</div>
            <div className="Questions">
              Questions:{dogruSoru}/{soruSayisi}
            </div>
          </div>
          <div className="answers">
           <div className="answer1 answer">
              <div className="answerSayi1 ans" style={{ pointerEvents: disable ? 'none' : 'auto' }} onClick={(e) => handleAnswer(e)}>
                {shuffledAnswers[0]} {/* birinci şık */}
               
              </div>
              <div id={shuffledAnswers[0]}>    <AnswerCircleIcon  /></div>
              
            </div>
            <div className="answer2 answer">
              <div className="answerSayi2 ans" style={{ pointerEvents: disable ? 'none' : 'auto' }} onClick={(e) => handleAnswer(e)}>
                {shuffledAnswers[1]} {/* ikinci  şık */}
               
              </div>
             <div id={shuffledAnswers[1]}> <AnswerCircleIcon ></AnswerCircleIcon></div>
            </div>
            <div className="answer3 answer">
              <div className="answerSayi3 ans" style={{ pointerEvents: disable ? 'none' : 'auto' }} onClick={(e) => handleAnswer(e)}>
                {shuffledAnswers[2]} {/* üçüncü  şık */}
                
              </div>
              <div id={shuffledAnswers[2]}><AnswerCircleIcon  /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
