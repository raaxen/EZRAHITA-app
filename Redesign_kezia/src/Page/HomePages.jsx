import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import Main from '../Page/Main.jsx'
import Bubble from '../Components/Bubble.jsx'
import About from './About.jsx'
import Nav_vertical from '../Components/Nav_vertical.jsx'
import Experience from './Experience.jsx'
import Skills from './Skills.jsx'
import Foot from './Foot.jsx'

const HomePages = () => {
  return (
    <>
        <Bubble />
        <Navbar />
        <Main />
        <Nav_vertical/> 
        <About />
        <Experience />
        <Skills />
        <Foot />
    </>
  )
}

export default HomePages