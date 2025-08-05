import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { axiosInstance } from '../libs/axios'
import { useNavigate } from 'react-router-dom';
import background from '../assets/jesman-fabio-wE3aVj9V9nw-unsplash.jpg'

export default function Quiz() {

  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      const response = await axiosInstance.post('/quiz/start');
      console.log(response)
      const token = response.data.session.token;
      console.log(token)
      localStorage.setItem("session_token", token)
      navigate("/quiz/start")
    } catch (error) {
      console.log(error)
    }
   
  }

  // const fetchQuestion = async () => {
  //   const token = localStorage.getItem("session_token")
  //   const response = await axiosInstance.get(`/quiz/${token}/next`)
  //   setQuestion(response.data.question.question_text)

  //   if (response.data.question.type === "multiple_choice") {
  //     console.log(response.data.question.answers)
  //     setOptions(response.data.question.answers)
  //   } else if (response.data.question.type === "matching") {
  //     console.log(response.data.question.pairs)
  //     setPairs(response.data.question.pairs)
  //   }
  //   console.log(response.data.question.question_text)
  //   console.log(response)
  // }

  // const finishQuiz = async () => {
  //   const token = localStorage.getItem("session_token")
  //   const response = await axiosInstance.post(`/quiz/${token}/finish`);
  //   console.log(response)
  //   localStorage.removeItem("session_token")
  //   setIsStart(false)
  //   setQuestion("")
  //   setOptions([])
  //   setPairs([])
  //   navigate("/Quiz")

  // }

  // useEffect(() => {
  //   if (localStorage.getItem("session_token")) {
  //     fetchQuestion()
  //   }
  // }, [])

  return (
    <>
      <Navbar />
      <div className='h-screen pt-[100px] flex items-center justify-center p-10 font-inter bg-cover bg-bottom' style={{backgroundImage:`url(${background})`}}>
        <div className='flex flex-col justify-center items-center gap-10 h-full w-[80%] text-center'>
          <h1 className='text-5xl text-white '>Ketahui seberapa jago pengetahuanmu tentang aksara batak melalui quiz</h1>
          <button className='bg-[#333333] rounded-xs text-white py-2.5 px-10 cursor-pointer hover:bg-[#474747]' onClick={() => startQuiz()}>Mulai Quiz</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
