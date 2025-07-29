import React from 'react'
import {  FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import { MdOutlineWeb } from 'react-icons/md'

export default function Footer() {
  return (
    <div id='footer' className='bg-[#1E1E1E] mt-auto text-white font-inter px-10 pt-5'>
        <div className='grid sm:grid-cols-3 grid-cols-2 h-[270px] py-5'>
            <div className='w-full h-full flex flex-col justify-center items-center sm:col-span-1 col-span-2'>
                <h1 className='font-bold text-3xl'>MARAKSARA.ID</h1>
                <p className='font-medium text-center'>Mari pelajari dan lesatarikan Aksara Batak</p>
            </div>
              <div className='flex flex-col justify-center place-self-center gap-5'>
                <p className='text-xl font-medium sm:flex hidden'>Navigasi</p>
                <div className='flex flex-col justify-center gap-2'>
                    <a href='' className=''>Beranda</a>
                    <a href='' className=''>Belajar Aksara</a>
                    <a href='' className=''>Kuis</a>
                    <a href='' className=''>Tentang</a>
                </div>
            </div>
          
            <div className='flex flex-col justify-center items-center gap-5'>
                  <p className='text-xl font-medium sm:flex hidden'>Media Sosial</p>
                <div className='flex flex-col gap-2 '>
                    <a href="" className='flex gap-2'><FaLinkedin  size={26} /> LinkedIn</a>
                      <a href="" className='flex gap-2'><FaInstagramSquare size={26} /> Instagram</a>
                    <a href="" className='flex gap-2'><FaGithubSquare  size={26} /> Github</a>
                      <a href="" className='flex gap-2'><MdOutlineWeb size={26} /> Website</a>
                </div>
            </div>
            
        </div>
        <div className='flex justify-center font-inter text-sm border-t-1 items-center text-center h-[60px] '>
              <p>© 2025 Maraksara.id - Developed and Design by Henry Frizzel Johanis</p> 
        </div>
    </div>  
  )
}
