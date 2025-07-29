import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Kuis from '../pages/Kuis'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kuis' element={<Kuis />} />
    </Routes>
  )
}
