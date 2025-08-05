import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <div className='fixed w-full bg-white z-999'>
      <div className='h-[90px] font-inter'>
        <div className='h-full flex  items-center justify-between lg:px-16 px-8'>
          <div className='flex justify-between md:w-auto w-full'>
            <Link to={"/"} className='font-bold sm:text-xl md:text-2xl lg:text-3xl text-lg select-none'>MARAKSARA.ID</Link>
            <button className={`text-2xl md:hidden flex cursor-pointer  transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} onClick={() => setIsOpen(!isOpen)}><GiHamburgerMenu /></button>
          </div>
          <div className={`md:flex hidden gap-8 items-center h-full`}>
            <ul className='flex font-medium lg:text-lg md:text-[14px] sm:text-[12px] text-[10px] gap-8'>
              <li>
                <Link to={"/"} className={`hover:text-[#640101] ${currentPathName === '/' && "text-[#640101]"}`}>Beranda</Link>
              </li>
              <li>
                <Link to={'/belajar-aksara'} className={`hover:text-[#640101] ${currentPathName === "/belajar-aksara" && "text-[#640101]"}`}>Belajar Aksara</Link>
              </li>
              <li>
                <Link to={"/quiz"} className={`hover:text-[#640101] ${currentPathName === "/quiz" && "text-[#640101]"}`}>Quiz</Link>
              </li>
              <li>
                <Link className='hover:text-[#640101]'>Tentang</Link>
              </li>
            </ul>
            <button className='bg-[#333333] text-white font-medium  lg:px-3.5 px-2 py-2.5 rounded-xs cursor-pointer hover:bg-[#640101]' onClick={()=>navigate("/belajar-aksara")}>Mulai Belajar</button>
          </div>

        </div>
      </div>
      <div className={`bg-white sm:hidden ${isOpen ? "fixed" : "hidden"} w-full shadow px-8 py-2 pb-8`}>
          <div className='flex flex-col'>
          <ul className='flex md:flex-row flex-col font-medium lg:text-lg md:text-[14px] sm:text-[12px] text-[16px] gap-8'>
            <li>
              <Link to={"/"} className='hover:text-[#640101]'>Beranda</Link>
            </li>
            <li>
              <Link to={'/belajar-aksara'} className='hover:text-[#640101]'>Belajar Aksara</Link>
            </li>
            <li>
              <Link to={'/quiz'} className='hover:text-[#640101]'>Kuis</Link>
            </li>
            <li>
              <Link className='hover:text-[#640101]'>Tentang</Link>
            </li>
          </ul>
          </div>
      </div>
    </div>
  )
}
