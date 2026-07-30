import React, { useState, useEffect } from 'react'
import '../Style/Nav_vertical.css'
import { IconHome, IconUser, IconBriefcase, IconStars, IconSend } from '@tabler/icons-react'

const etapes = [
  { id: 'home', icon: <IconHome size={20} /> },
  { id: 'about', icon: <IconUser size={20} /> },
  { id: 'experience', icon: <IconBriefcase size={20} /> },
  { id: 'skills', icon: <IconStars size={20} /> },
  { id: 'contact', icon: <IconSend size={20} /> },
]

const Nav_vertical = () => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const gererScroll = () => {
      const scrollY = window.scrollY
      const distanceFondu = 300
      const nouvelleOpacite = Math.min(1, scrollY / distanceFondu)
      setOpacity(nouvelleOpacite)
    }

    window.addEventListener('scroll', gererScroll)
    return () => window.removeEventListener('scroll', gererScroll)
  }, [])

  return (
    <div
      className="stepper"
      style={{
        opacity,
        transition: 'opacity 0.1s linear',
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
      }}
    >
      <div className="stepper-dot" />
      {etapes.map((e, i) => (
        <React.Fragment key={i}>
          <div className="stepper-line" />
          <div className="stepper-icon">{e.icon}</div>
        </React.Fragment>
      ))}
      <div className="stepper-line" />
      <div className="stepper-dot" />
    </div>
  )
}

export default Nav_vertical