import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../libs/axios';
import { CircularProgress } from '../components/CircullarProgress';
import { useNavigate } from 'react-router-dom';


export default function QuizResult() {

    const [score, setScore] = useState(0);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate()


    const finishQuiz = async() => {
        const token = localStorage.getItem("session_token")
        const response = await axiosInstance.post(`/quiz/${token}/finish`)
        console.log(response)
        setScore(response.data.final_score)
        setDetails(response.data.details)
        // localStorage.removeItem("session_token")
        localStorage.removeItem("current_question")
    }

    const endQuiz = async() => {
      const token = localStorage.getItem('session_token')
      const response = await axiosInstance.post(`/quiz/${token}/end`)
      console.log(response)
      localStorage.removeItem("session_token")
      navigate('/quiz')
    }

    useEffect(() => {
        finishQuiz();
      if (!localStorage.getItem("session_token")) {
        console.log("tesss")
        return (navigate("/quiz"))
      }
    }, [])


  return (
    <div className='min-h-screen'>
      <div className='min-h-screen flex justify-center items-center flex-col p-4'>
        <div className='w-[80%] min-h-full h-full flex flex-col justify-around items-center p-2 '>
          <div className='flex flex-col items-center justify-center gap-2'> 
            <CircularProgress score={score} />
            <p className='m-0 p-0 font-inter text-lg font-bold mb-4'>Nilai</p>
          </div>
        
          <div className='w-full flex flex-col gap-2'>
            {details.map((item,index)=>{
              return(
                <details key={index} className={`w-full p-4 shadow-s rounded-xs hover:cursor-pointer ${item.is_correct ? "bg-green-100" : "bg-red-100" }`}>
                  <summary>{item.question}</summary>
                  <ul className='mt-2'>
                    <li>Jawaban anda: {item.correct_answer}</li>
                    {!item.is_correct && <li>Jawaban yang benar: {item.user_answer}</li>}
                  </ul>
                </details>
              )
            })}
          </div>
        </div>
        
        <div className='w-full mt-auto'>
          <button className='py-2.5 px-10 bg-[#333333] rounded-xs text-white float-end hover:bg-[#474747] cursor-pointer' onClick={()=> endQuiz()}>Kambali</button>
        </div>
        
      </div>
    </div>
  )
}
