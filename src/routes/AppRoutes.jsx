import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Quiz from '../pages/Quiz'
import QuizStart from '../pages/QuizStart'
import QuizResult from '../pages/QuizResult'
import BelajarAksara from '../pages/BelajarAksara'
import Tentang from '../pages/Tentang'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/start' element={<QuizStart />} />
        <Route path='/quiz/result' element={<QuizResult />} />
        <Route path='/belajar-aksara' element={<BelajarAksara />} />
        <Route path='/tentang' element={<Tentang />}/>
    </Routes>
  )
}
