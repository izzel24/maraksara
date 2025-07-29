import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import QuizStart from '../pages/QuizStart'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/mulai' element={<QuizStart />} />
    </Routes>
  )
}
