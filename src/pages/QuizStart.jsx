import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../libs/axios';
import ProggressBar from '../components/ProggressBar';
import Draggable from '../components/Draggable';
import { DndContext } from '@dnd-kit/core';
import Droppable from '../components/Droppable';

export default function QuizStart() {

    const [draggables, setDraggables] = useState([]);
    const [droppedItems, setDroppedItems] = useState({});
    const [question, setQuestion] = useState("");
    const [questionId, setQuestionId] = useState(0)
    const [questionNumber, setQuestionNumber] = useState()
    const [options, setOptions] = useState([]);
    const [pairs, setPairs] = useState([])
    const [answer, setAnswer] = useState(0)
    const [answerData, setAnswerData] = useState()

    const getQuestion = async () => {
        const token = localStorage.getItem("session_token")
        const response = await axiosInstance.get(`/quiz/${token}/next`);

        console.log(response)

        const data = response.data

        localStorage.setItem("current_question", JSON.stringify(data))


        setQuestion(data.question.question_text)
        setQuestionId(data.question.id)
        setQuestionNumber(data.answered_count + 1)
        if (data.question.type === "matching") {
            setPairs(data.question.pairs)
            setDraggables(data.question.pairs.map(pair => pair.left));
        } else if (data.question.type === "multiple_choice") {
            setOptions([...data.question.answers].sort(() => Math.random() - 0.5));
        }
    }

    const submitQuiz = async () => {

        const token = localStorage.getItem("session_token")
        const response = await axiosInstance.post(`/quiz/${token}/submit`, {

            question_id: questionId,
            answer_data: answerData,
            answer_id: answer

        })

        setAnswer(0)
        setQuestion("")
        setOptions([])
        setAnswerData()
        setPairs([])

        console.log(response)
        getQuestion();
    }

    const finishQuiz = async () => {
        const token = localStorage.getItem("session_token")
        const response = await axiosInstance.post(`/quiz/${token}/finish`)
        console.log(response)
        localStorage.removeItem("session_token")
        localStorage.removeItem("current_question")
    }


    useEffect(() => {
        const savedQuestion = localStorage.getItem("current_question")
        if (savedQuestion) {
            const data = JSON.parse(savedQuestion)
            setQuestion(data.question.question_text)
            setQuestionId(data.question.id)
            setQuestionNumber(data.answered_count + 1)
            if (data.question.type === "matching") {
                setPairs(data.question.pairs)
            } else if (data.question.type === "multiple_choice") {
                setOptions([...data.question.answers].sort(() => Math.random() - 0.5));
            }
        } else {
            getQuestion()
        }

    }, [])

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over) {
            setDroppedItems((prev) => ({
                ...prev,
                [over.id]: active.id,
            }));
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
        <div className='h-screen font-inter px-5 py-10'>
            <div className='flex flex-col h-full gap-4'>
                <ProggressBar current={questionNumber} total={5} />
                
                <div className='flex flex-col h-full justify-around'>
                    <div id='question' className='flex flex-col h-[25%] '>
                        <div className='h-full flex items-center justify-center'>
                            <h1 className='text-center text-3xl font-medium'>{question}</h1>
                        </div>
                    </div>
                    {
                        options.length > 0 ?
                            (
                                <div className='grid grid-cols-2 gap-5 h-[50%] '>
                                    {
                                        options.map((option, index) => {
                                            return (
                                                <button key={index} className={`px-10 py-4 shadow-s cursor-pointer flex items-center gap-5 ${answer == option.id ? "bg-blue-700/10" : "bg-white"}`} onClick={() => setAnswer(option.id)}>
                                                    <p className='bg-[#333333] w-10 h-10 rounded-full text-white flex items-center justify-center'>{String.fromCharCode(index + 65)}</p>
                                                    <p className='text-xl'>{option.answer_text}</p>
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            )
                            :
                            (
                                <div className='h-full'>
                                        <div className="flex flex-col h-full">
                                            <div className="grid grid-cols-4 w-full h-[80%] justify-items-center gap-2">
                                                {pairs.map((pair, index) => {
                                                    const droppedId = droppedItems[index];
                                                    return (
                                                        <Droppable key={index} id={index} name={pair.right}>
                                                            {
                                                                droppedId ? (
                                                                    <Draggable id={droppedId} name={droppedId} />
                                                                ) : (
                                                                    <p className="text-gray-400"></p>
                                                                )
                                                            }
                                                        </Droppable>
                                                    );
                                                })} 
                                            </div>
                                            <div className="flex gap-4 ">
                                                {pairs.map((pair, index) => {
                                                    const isDropped = Object.values(droppedItems).includes(pair.left);
                                                    if (isDropped) return null;

                                                    return (
                                                        <Draggable key={pair.left} id={pair.left} name={pair.left} />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                  

                                </div>
                            )
                    }
                </div>

                <div className='flex gap-4 w-full justify-end'>
                    <button className='bg-[#333333] px-10 py-2.5 text-white cursor-pointer' onClick={() => submitQuiz()}>Next</button>
                    <button className='bg-[#333333] px-10 py-2.5 text-white cursor-pointer' onClick={() => finishQuiz()}>Finish</button>
                </div>
            </div>
        </div>
        </DndContext >
    )
}
