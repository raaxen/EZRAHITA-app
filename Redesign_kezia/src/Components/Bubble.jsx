import React from 'react'
import '../Style/Bubble.css'
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconMail, IconBrandTiktok } from '@tabler/icons-react'

const icones = [IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconMail, IconBrandTiktok]

const genererBulles = (nombre) => {
  return Array.from({ length: nombre }, (_, i) => {
    const duration = 8 + Math.random() * 8
    return {
      Icon: icones[i % icones.length],
      left: `${Math.random() * 95}%`,
      size: 28 + Math.random() * 30,
      duration,
      delay: -Math.random() * duration,
    }
  })
}

const bulles = genererBulles(12)

const Bubble = () => {
  return (
    <div className="BubbleContainer">
      {bulles.map((b, i) => {
        const { Icon } = b
        return (
          <div
            key={i}
            className="bubble"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <Icon size={b.size * 0.45} color="#F5EFE6" />
          </div>
        )
      })}
    </div>
  )
}

export default Bubble