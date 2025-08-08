import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

export default function Tentang() {
  return (
    <>
      <Navbar />
      <div className='h-screen pt-[90px] sm:px-20 px-10 flex flex-col gap-5  font-inter'>
        <h1 className='text-3xl font-bold'>Tentang</h1>
        <div className='flex flex-col gap-2'>
          <p className='sm:text-xl text-lg'>MARAKSARA.ID adalah sebuah situs web yang didedikasikan untuk mengajarkan dan melestarikan aksara Batak. Kami meyakini bahwa aksara Batak bukan sekadar kumpulan simbol, melainkan representasi dari identitas dan budaya yang patut dijaga serta diwariskan kepada generasi mendatang.</p>
          <p className='sm:text-xl text-lg'>Tujuan kami adalah menghadirkan aksara Batak sebagai bagian dari kehidupan sehari-hari, bukan hanya sebagai peninggalan sejarah, tetapi sebagai unsur budaya yang hidup dan bisa dipelajari serta dimanfaatkan melalui teknologi. Dengan MARAKSARA.ID, siapa pun dapat belajar kapan saja dan di mana saja tanpa batasan waktu dan tempat.</p>
          <p className='sm:text-xl text-lg'>Saat ini, fitur yang tersedia mencakup pengenalan dasar karakter aksara dan kuis latihan membaca. Kami menyadari bahwa ini baru merupakan langkah awal dari perjalanan yang panjang.</p>
          <p className='sm:text-xl text-lg'>Ke depannya, kami berharap dapat menambah berbagai fitur interaktif dan edukatif yang lebih memudahkan pengguna dalam memahami dan mengaplikasikan Aksara Batak secara menyenangkan dan bermakna.</p>
        </div>
        </div>
      <Footer/>
    </>
  )
}
