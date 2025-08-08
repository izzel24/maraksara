import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { axiosInstance } from '../libs/axios'
import LoadingGif from '../assets/Loading.gif'
import { IoIosCheckmark } from 'react-icons/io'

export default function BelajarAksara() {

  const [dialect, setDialect] = useState('toba')
  const [aksara, setAksara] = useState([])
  const [links, setLinks] = useState([])
  const [diacritics, setDiacritics] = useState([])

  const [isAnswer1Correct, setIsAnswer1Correct] = useState()
  const [input1, setInput1] = useState()

  const [isAnswer2Correct, setIsAnswer2Correct] = useState()
  const [input2, setInput2] = useState()

  const [isAnswer3Correct, setIsAnswer3Correct] = useState()
  const [input3, setInput3] = useState()


  const [isAnswer4Correct, setIsAnswer4Correct] = useState()
  const [input4, setInput4] = useState()

  const [isAnswer5Correct, setIsAnswer5Correct] = useState()
  const [input5, setInput5] = useState()

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

  const getDiacritics = async () => {
    try {
      const response = await axiosInstance.get('/diacritics')
      console.log(response)
      setDiacritics(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAksara()
    getDiacritics()
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
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full gap-10'>
            {diacritics.map((item,index) => {
              return(
                <div
                  key={index}
                  className='aspect-square shadow-s rounded-sm flex flex-col justify-between items-center p-4'
                >
                  <div className='flex-grow flex items-center justify-center'>
                    <h1 className='font-aksara lg:text-7xl md:text-6xl text-4xl select-none'>{item.symbol}</h1>
                  </div>
                  <div className='text-center mt-2'>
                    <p className='font-inter lg:text-lg md:text-base text-sm'>{item.latin_translit ? item.latin_translit : item.type}</p>
                    <p className='font-inter lg:text-lg md:text-base text-sm'>{item.example}</p>
                  </div>
                </div>
              )
            })}
            </div>
          </li>
          {/* <li>
            <h1 className='font-semibold text-2xl mb-5'>Gabungan Kata</h1>
          </li> */}
          <li className='h-screen'> 
            <h1 className='font-semibold text-2xl mb-5'>Latihan</h1>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4'>
              <div className='aspect-video shadow-s rounded-xs flex flex-col items-center justify-center p-5'>
                <div className='font-aksara h-[80%] flex items-center text-4xl'>ᯀ + ᯖ?</div>
                <p className={`${isAnswer1Correct ? "text-green-300" : "text-red-300"}`}>{isAnswer1Correct === true && "benar"} {isAnswer1Correct === false && "salah"}</p>
                <div className='flex items-center gap-2'>
                  <input type="text" className='border-1 p-1 rounded-xs text-sm' placeholder='jawab' onChange={(e) => setInput1(e.target.value)} value={input1} />
                  <button className='bg-[#333333] rounded-xs'><IoIosCheckmark size={30} className='text-white cursor-pointer' onClick={() => (input1 == "ata" ? setIsAnswer1Correct(true) : setIsAnswer1Correct(false) )} /></button>
                </div>
              </div>
              <div className='aspect-video shadow-s rounded-xs flex flex-col items-center justify-center p-5'>
                <div className='font-aksara h-[80%] flex items-center text-4xl'>ᯖ + ᯠ?</div>
                <p className={`${isAnswer2Correct ? "text-green-300" : "text-red-300"}`}>{isAnswer2Correct === true && "benar"} {isAnswer2Correct === false && "salah"}</p>
                <div className='flex items-center gap-2'>
                  <input type="text" className='border-1 p-1 rounded-xs text-sm' placeholder='jawab' onChange={(e) => setInput2(e.target.value) } />
                  <button className='bg-[#333333] rounded-xs'><IoIosCheckmark size={30} className='text-white' onClick={() => (input2 == "tanya" ? setIsAnswer2Correct(true) : setIsAnswer2Correct(false))} /></button>
                </div>
              </div>
              <div className='aspect-video shadow-s rounded-xs flex flex-col items-center justify-center p-5'>
                <div className='font-aksara h-[70%] flex flex-col justify-center items-center text-4xl'> 
                  <p>ᯖ + ᯄ᯦ +  ᯲?</p>
                </div>
                <div className='h-[10%]'>
                  <p className={`${isAnswer3Correct ? "text-green-300" : "text-red-300"}`}>{isAnswer3Correct === true && "benar"} {isAnswer3Correct === false && "salah"}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="text" className='border-1 p-1 rounded-xs text-sm' placeholder='jawab' onChange={(e) => setInput3(e.target.value)} />
                  <button className='bg-[#333333] rounded-xs cursor-pointer'><IoIosCheckmark size={30} className='text-white' onClick={() => (input3 == "tak" ? setIsAnswer3Correct(true) : setIsAnswer3Correct(false))} /></button>
                </div>
              </div>
              <div className='aspect-video shadow-s rounded-xs flex flex-col items-center justify-center p-5'>
                <div className='font-aksara h-[70%] flex flex-col justify-center items-center text-4xl'> 
                  <p>ᯏ + ᯓ?</p>
                </div>
                <div className='h-[10%]'>
                  <p className={`${isAnswer4Correct ? "text-green-300" : "text-red-300"}`}>{isAnswer4Correct === true && "benar"} {isAnswer4Correct === false && "salah"}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="text" className='border-1 p-1 rounded-xs text-sm' placeholder='jawab' onChange={(e) => setInput4(e.target.value)} />
                  <button className='bg-[#333333] rounded-xs cursor-pointer'><IoIosCheckmark size={30} className='text-white' onClick={() => (input4 == "gara" ? setIsAnswer4Correct(true) : setIsAnswer4Correct(false))} /></button>
                </div>
              </div>
              <div className='aspect-video shadow-s rounded-xs flex flex-col items-center justify-center p-5'>
                <div className='font-aksara h-[70%] flex flex-col justify-center items-center text-4xl'> 
                  <p>ᯊ + ᯋ?</p>
                </div>
                <div className='h-[10%]'>
                  <p className={`${isAnswer5Correct ? "text-green-300" : "text-red-300"}`}>{isAnswer5Correct === true && "benar"} {isAnswer5Correct === false && "salah"}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type="text" className='border-1 p-1 rounded-xs text-sm' placeholder='jawab' onChange={(e) => setInput5(e.target.value)} />
                  <button className='bg-[#333333] rounded-xs cursor-pointer'><IoIosCheckmark size={30} className='text-white' onClick={() => (input5 == "nawa" ? setIsAnswer5Correct(true) : setIsAnswer5Correct(false))} /></button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  )
}