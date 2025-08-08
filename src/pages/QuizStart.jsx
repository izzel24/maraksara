import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../libs/axios';
import ProggressBar from '../components/ProggressBar';
import Draggable from '../components/Draggable';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import Droppable from '../components/Droppable';
import { useNavigate } from 'react-router-dom';
import spinner from '../assets/loading_spinner.gif'
import { IoIosArrowRoundBack } from 'react-icons/io';
import Quiz from './Quiz';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { Dialog } from '@headlessui/react';

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
    const [isLoading, setIsLoading] = useState(false)

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);

    const sensors = useSensors(mouseSensor, touchSensor)

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);


    const getQuestion = async () => {

        const token = localStorage.getItem("session_token")
        try {

            setIsLoading(true)
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
        catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const submitQuiz = async () => {

        const token = localStorage.getItem("session_token")
        try {
            setIsLoading(true)
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
            if (questionNumber < 5) {
                getQuestion();
            }
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }

    }

    const finishQuiz = async () => {
        await submitQuiz();
        navigate("/quiz/result")
    }

    const back = () => {
        localStorage.removeItem("session_token")
        localStorage.removeItem("current_question")
        navigate('/quiz')
    }


    useEffect(() => {
        if (!localStorage.getItem("session_token")) {
            return (navigate("/quiz"))
        }
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

    // const handleDragEnd = (event) => {
    //     const { active, over } = event;

    //     if (!over) {
    //         setDroppedItems((prev) => {
    //             const updated = Object.fromEntries(
    //                 Object.entries(prev).filter(([key, value]) => value !== active.id)
    //             );
    //             return updated;
    //         });
    //         return;
    //     }

    //     setDroppedItems((prev) => {
    //         const updated = { ...prev };
    //         const previousSlot = Object.keys(prev).find((key) => prev[key] === active.id);
    //         if (previousSlot !== undefined) {
    //             delete updated[previousSlot];
    //         }

    //         const existingItem = prev[over.id];
    //         if (existingItem && existingItem !== active.id) {
    //         }
    //         updated[over.id] = active.id;

    //         return updated;
    //     });
    // };

    return (
        // <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className='min-h-screen h-screen font-inter px-5 py-10 overflow-hidden'>
                <div className='flex flex-col h-full gap-4'>
                    <ProggressBar current={questionNumber} total={5} />
                <button className='flex items-center self-start cursor-pointer' onClick={() => setIsOpen(true)}> 
                    <IoIosArrowRoundBack size={40} />
                    <span>Kembali</span>
                </button>
                <Dialog as="div" className="relative z-50" open={isOpen} onClose={() => setIsOpen(false)}>
                    {/* Background overlay */}
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                    {/* Modal wrapper */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md rounded-xs bg-white p-6 shadow-lg">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                Yakin mau keluar?
                            </Dialog.Title>
                            <div className="mt-2 text-sm text-gray-600">
                                Kalau kamu keluar sekarang, progres kuis kamu akan hilang.
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm bg-[#333333] hover:bg-[#333333]/90 cursor-pointer text-white"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={back}
                                    className="px-4 py-2 text-sm bg-[#640101] hover:bg-[#640101]/90 cursor-pointer text-white"
                                >
                                    Keluar
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
                    <div className='flex flex-col h-full justify-around'>
                        <div id='question' className='flex flex-col h-[25%] '>
                            <div className='h-full flex items-center justify-center'>
                                <h1 className='text-center md:text-3xl text-xl font-medium'>{question}</h1>
                            </div>
                        </div>
                        {
                            options.length > 0 ?
                                (
                                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 sm:h-[60%] h-[80%] '>
                                        {
                                            options.map((option, index) => {
                                                return (
                                                    <button key={index} className={`md:px-10 md:py-4 px-5 shadow-s cursor-pointer flex items-center gap-5 ${answer == option.id ? "bg-blue-700/10" : "bg-white"}`} onClick={() => setAnswer(option.id)}>
                                                        <p className='bg-[#333333] md:w-10 w-7 md:h-10 h-7 rounded-full text-white flex items-center justify-center'>{String.fromCharCode(index + 65)}</p>
                                                        <p className='md:text-xl text-lg'>{option.answer_text}</p>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                )
                                :
                                (<></>
                                    // <div className='h-full'>
                                    //         <div className="flex flex-col h-full gap-4">
                                    //             <div className="grid sm:grid-cols-4 sm:grid-rows-1 grid-cols-2 grid-rows-2  h-full gap-2">
                                    //                 {pairs.map((pair, index) => {
                                    //                     const droppedId = droppedItems[index];
                                    //                     return (
                                    //                         <Droppable key={index} id={index} name={pair.right}>
                                    //                             {
                                    //                                 droppedId ? (
                                    //                                     <Draggable id={droppedId} name={droppedId} />
                                    //                                 ) : (
                                    //                                     <p className="text-gray-400"></p>
                                    //                                 )
                                    //                             }
                                    //                         </Droppable>
                                    //                     );
                                    //                 })} 
                                    //             </div>
                                    //             <div className="flex gap-4">
                                    //                 {pairs.map((pair, index) => {
                                    //                     const isDropped = Object.values(droppedItems).includes(pair.left);
                                    //                     if (isDropped) return null;

                                    //                     return (
                                    //                         <Draggable key={pair.left} id={pair.left} name={pair.left} />
                                    //                     );
                                    //                 })}
                                    //             </div>
                                    //         </div>
                                    // </div>
                                )
                        }
                    </div>

                    <div className='flex gap-4 w-full justify-end'>
                    <button className={`bg-[#333333] flex px-10 py-2.5 text-white cursor-pointer hover:bg-[#474747] ${isLoading && "bg-gray-200 hover:bg-gray-200 !cursor-not-allowed"} ${answer == 0 && "bg-gray-200 hover:bg-gray-200 !cursor-not-allowed"}`} disabled={isLoading || answer == 0 ? true : false } onClick={() => { questionNumber < 5 ? submitQuiz() : finishQuiz() }}>{questionNumber < 5 ? "Next" : "Finish"} {isLoading && <img src={spinner} alt="" width={20} />}</button>
                        
                        {/* <button className='bg-[#333333] px-10 py-2.5 text-white cursor-pointer' onClick={() => finishQuiz()}>Finish</button> */}
                    </div>
                </div>
            </div>
        // </DndContext >
    )
}
