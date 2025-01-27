import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div className='main__container'>
        <Header/>
        <HeroSection/>
        <Footer/>
    </div>
  )
}

export default Main