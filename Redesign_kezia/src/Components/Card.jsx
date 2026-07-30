import React from 'react'
import '../Style/Card.css'

const SkillCard = ({ Icon, titre, description }) => {
  return (
    <div className="card">
      <div className="containers">
        <div className="icon">
          <Icon size={28} />
        </div>
        <h3 className="title">{titre}</h3>
        <p className="subtitle">{description}</p>
      </div>
    </div>
  )
}

export default SkillCard