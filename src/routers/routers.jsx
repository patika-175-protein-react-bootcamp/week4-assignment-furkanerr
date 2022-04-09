import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/Home/HomePage';
import Questions from '../components/QuestionsPage/Questions';
import ResultPage from '../components/ResultPage/ResultPage';



function Routers() {
  return (
   <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/questions" element={<Questions/>} />
       <Route path="/results" element={<ResultPage/>} />

   </Routes>
  )
}

export default Routers
