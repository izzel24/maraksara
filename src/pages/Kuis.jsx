import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Kuis() {
  
  return (
    <>
        <Navbar />
        <div className='h-screen pt-[100px] flex items-center justify-center p-10 '>
          <div id='card' className='h-full w-full rounded-xs shadow-s flex flex-col   '>
            <button className='py-2.5 px-4 bg-amber-300'>Mulai Quiz</button>
          </div>
        </div>
        <Footer />
    </>
  )
}
