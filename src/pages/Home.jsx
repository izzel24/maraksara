import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import backgroundAksara from '../assets/background-image.png'
import backgroundKuis from '../assets/background-hero.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { axiosInstance } from '../libs/axios'
import LoadingGif from '../assets/Loading.gif'
import Footer from '../components/Footer'

export default function Home() {

  const [dialect, setDialect] = useState("toba")
  const [aksara, setAksara] = useState([])
  const navigate = useNavigate()

  const getAksara = async(data="toba") => {
    try {
      setDialect(data)
      setAksara([])
      const response = await axiosInstance.get(`/translits/${data}?per_page=8`);
      console.log(response)
      setAksara(response.data.data)
    } catch (err) {
      console.error(err)
    }
  } 

  useEffect(() =>{
    getAksara()
  }, []);

  return (
    <>
      <Navbar />
      <div id='hero-section' className='bg-opacity-0 h-screen min-h-[500px]' style={{backgroundImage:`url(${backgroundAksara})` }}>
        <div className={` h-full pt-[90px]  bg-[color:hsl(0,97%,20%,95%)]`}>
            <div className='lg:w-[70%] lg:min-w-[800px] w-full flex items-center h-full lg:px-52 sm:px-20 px-10'>
              <div className='flex flex-col gap-5'>
                <h1 className='text-white font-inter text-6xl font-bold'>Kenali & Lestarikan Aksara Batak</h1>    
                <p className='text-white font-inter text-lg'>Aksara Batak adalah sistem tulisan tradisional masyarakat Batak. Mari kita pelajari dan lestarikan bersama</p>        
                <button className='bg-[#333333] py-3 px-5 md:max-w-[250px] w-full font-medium2 text-white text-xl rounded-xs cursor-pointer hover:bg-[#474747]' onClick={() => navigate('/belajar-aksara')}>Mulai Belajar</button>    
              </div>
            </div>
          </div>
      </div>
      <div id='sejarah-section' className='sm:px-20 px-10 py-20 flex items-center'>
        <div className='flex flex-col sm:gap-6 gap-3'>
          <h1 className='font-inter font-bold sm:text-5xl text-2xl'>Sejarah Aksara Batak</h1>
          <div className='flex flex-col sm:gap-3.5 gap-2 font-inter'>
            <p className=' sm:text-lg text-[16px]'>Aksara Batak adalah salah satu sistem tulisan tradisional Nusantara yang berasal dari wilayah Sumatera Utara. Aksara ini digunakan oleh berbagai subsuku Batak seperti Toba, Karo, Mandailing, Pakpak, Angkola, dan Simalungun. Meskipun memiliki beberapa perbedaan dalam bentuk dan pelafalan, seluruhnya masih berada dalam satu rumpun sistem penulisan.</p>
            <Link to={"/belajar-aksara#sejarah"}  className='flex items-center sm:text-[20px] text-[16px] font-bold'>Baca lebih lanjut <IoIosArrowRoundForward className='sm:text-[30px] text-[26px]  ' /></Link>
          </div>
        </div>
      </div>
      <div id='aksara-section' className='sm:px-20 px-10 pb-10 flex flex-col items-center justify-center'>
        <div className='flex gap-3 mb-5 py-2 w-full font-inter text-lg overflow-x-auto'>
          <button className={`px-10 py-2 cursor-pointer ${dialect === "toba" && "bg-[#333333] text-white rounded-xs"}  `} onClick={() => getAksara("toba")}>Toba</button>
          <button className={`px-10 py-2 cursor-pointer ${dialect === "pakpak" && "bg-[#333333] text-white rounded-xs"}`} onClick={() => getAksara("pakpak")}>Pakpak</button>
          <button className={`px-10 py-2 cursor-pointer ${dialect === "mandailing" && "bg-[#333333] text-white rounded-xs"}`} onClick={() => getAksara("mandailing")}>Mandailing</button>
          <button className={`px-10 py-2 cursor-pointer ${dialect === "karo" && "bg-[#333333] text-white rounded-xs"}`} onClick={() => getAksara("karo")}>Karo</button>
          <button className={`px-10 py-2 cursor-pointer ${dialect === "simalungun" && "bg-[#333333] text-white rounded-xs"}`} onClick={() => getAksara("simalungun")}>Simalungun</button>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full gap-10'>
          {aksara.length > 0 ? aksara.map((item, index) => (
            <div
              key={index}
              className='aspect-square shadow-s rounded-sm flex flex-col justify-between items-center p-4'
            >
              <div className='flex-grow flex items-center justify-center'>
                <h1 className='font-aksara lg:text-7xl md:text-6xl text-4xl select-none'>
                  {item.aksara_batak.glyph}
                </h1>
              </div>


              <div className='text-center mt-2'>
                <p className='font-inter lg:text-lg md:text-base text-sm'>{item.latin_translit}</p>
                <p className='font-inter lg:text-lg md:text-base text-sm'>{item.example}</p>
              </div>
            </div>
          )) :  <div className='h-[300px] col-span-4 flex flex-col justify-center items-center'>
                  <img src={LoadingGif} alt="Loading..." className='w-24 h-24'/>
                  <p className=''>Loading...</p>
                </div>
          }
        </div>
        <div className='flex w-full items-center py-5 justify-end'>
          <Link to={"/belajar-aksara#huruf-dasar"} className='flex font-inter m:text-[20px] text-[16px] items-center font-bold'>Lihat Selengkapanya <IoIosArrowRoundForward className='sm:text-[30px] text-[26px]' /></Link> 
        </div>
      </div>
      <div id='kuis-section' className='h-[450px]'>
          <div className='h-full w-full bg-size-[60%] flex justify-center items-center text-center' style={{backgroundImage:`url(${backgroundKuis})`}}>
            <div className='flex flex-col justify-center items-center text-white font-inter max-w-[500px] p-4 gap-5'>
              <h1 className='font-bold md:text-[40px] text-3xl'>TES PENGETAHUANMU!</h1>
              <p className='md:text-lg text-16px'>Sudah sejauh mana kamu kenal Aksara Batak?
                Uji seberapa jago kamu dan kumpulkan skor tertinggi.
              </p>
              <a href='/quiz' className='bg-[#333333] py-2.5 w-full font-medium roundd-xs md:text-lg text-[16px] cursor-pointer'>Ikuti Kuis Sekarang</a>
            </div>
          </div>
      </div>
      <div id='tentang-section' className='sm:px-20 px-10 py-20 flex min-h-[600px]'>
        <div className='flex flex-col font-inter sm:gap-2 gap-2'>
          <h1 className='font-bold sm:text-3xl text-2xl'>Tentang</h1>
          <div className='flex flex-col sm:gap-2 gap-2'>
            <p className='sm:text-lg text-[16px]'>MARAKSARA.ID hadir sebagai media pembelajaran digital untuk memperkenalkan, melestarikan, dan memudahkan siapa saja yang ingin mempelajari Aksara Batak. Kami percaya, Aksara Batak bukan sekedar simbol, tetapi juga identitas budaya yang patut dijaga dan diwariskan kepada generasi mendatang.</p>
            <p className='sm:text-lg text-[16px]'>Visi kami adalah menjadikan Aksara Batak sebagai bagian dari kehidupan sehari-hari, bukan hanya sebagai warisan di museum atau buku sejarah. Melalui teknologi, kita bisa belajar dan merawat budaya di mana pun dan kapan pun, tanpa batasan ruang dan waktu.</p>
          </div>
        
        </div>
      </div>
      <Footer />
    </>
  )
}
