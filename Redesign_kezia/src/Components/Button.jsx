import React from 'react'
import '../Style/Button.css'

const Button = ({texte , style ,onCLick}) => {
  return (
    <button className={`btn ${style}`}>
      {texte}
    </button>
  )
}

export default Button