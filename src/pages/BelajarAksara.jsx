import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { axiosInstance } from '../libs/axios'
import LoadingGif from '../assets/Loading.gif'

export default function BelajarAksara() {

  const [dialect, setDialect] = useState('toba')
  const [aksara, setAksara] = useState([])
  const [links, setLinks] = useState([])

  const getAksara = async(data="toba") => {
    setDialect(data)
    setAksara([])
    try {
      const response = await axiosInstance.get(`/translits/${data}`)
      setAksara(response.data.data)
      setLinks(response.data.links)
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }
  const getAksaraByPage = async(data) => {
    setAksara([])
    try {
      const response = await axiosInstance.get(`${data}`)
      console.log(response)
      setAksara(response.data.data)
      setLinks(response.data.links)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAksara()
  }, [])


  return (
    <>
      <Navbar />
      <div className='min-h-screen pt-[100px] font-inter sm:px-20 px-10 py-20'>
        {/*      
      <SideBar /> */}
        <h1 className='font-bold text-4xl mb-10'>Mengenal Aksara Batak</h1>
        <ul className='flex flex-col gap-10'>
          <li id='sejarah'>
            <div>
              <h1 className='font-semibold text-2xl mb-5'>Asal Usul & Sejarah</h1>
              <div className='flex flex-col gap-2 text-justify'>
                <p className='text-lg'>Aksara Batak adalah salah satu sistem tulisan tradisional Nusantara yang berasal dari wilayah Sumatera Utara. Aksara ini digunakan oleh berbagai subsuku Batak seperti Toba, Karo, Mandailing, Pakpak, Angkola, dan Simalungun. Meskipun memiliki beberapa perbedaan dalam bentuk dan pelafalan, seluruhnya masih berada dalam satu rumpun sistem penulisan.</p>
                <p className='text-lg'>Secara historis, aksara Batak merupakan turunan dari aksara Brahmi India yang menyebar ke Asia Tenggara melalui perdagangan dan penyebaran budaya, termasuk melalui kerajaan-kerajaan Hindu-Buddha di Sumatera seperti Sriwijaya. Dari sinilah muncul berbagai aksara lokal seperti aksara Rejang, Lampung, dan Batak.</p>
                <p className='text-lg'>Aksara Batak umumnya digunakan dalam konteks adat, kepercayaan, dan ilmu pengetahuan tradisional. Naskah-naskah kuno yang ditemukan biasanya ditulis di atas bambu, kulit kayu (laklak), atau tulang. Tulisan ini memuat beragam hal, mulai dari mantra, ajaran spiritual, pengobatan tradisional, hingga surat pribadi atau hukum adat. Uniknya, sistem penulisannya tidak mengenal spasi antar kata dan menggunakan sistem aksara silabis, yaitu satu huruf mewakili satu suku kata.</p>
              </div>
            </div>
          </li>
          <li id='huruf-dasar'>
            <h1 className='font-semibold text-2xl mb-5'>Huruf Dasar</h1>
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
              )) : <div className='h-[300px] col-span-4 flex flex-col justify-center items-center'>
                <img src={LoadingGif} alt="Loading..." className='w-24 h-24' />
                <p className=''>Loading...</p>
              </div>
              }
            </div>
            <div className='flex gap-2 justify-center mt-10'>
            {links.map((item, index) => {
              return(
                <button key={index} className={`py-2 px-5 cursor-pointer ${item.url === null && "text-gray-400 !cursor-default"} ${item.active && "bg-[#333333] text-white"}`} disabled={item.url === null || item.active ? true : false } onClick={() => getAksaraByPage(item.url)}><p dangerouslySetInnerHTML={{__html: item.label}}/></button>
              )
            })}
            </div>
          </li>
          <li>
            <h1 className='font-semibold text-2xl mb-5'>Vokal & Diakritik</h1>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  )
}