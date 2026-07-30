import React, { useEffect, useRef } from 'react'
import '../Style/Experience.css'
import { IconBriefcase, IconMessage2, IconHeadset, IconTool } from '@tabler/icons-react'

const experiences = [
  {
    periode: "2024 — Aujourd'hui",
    poste: "Assistante Virtuelle Indépendante",
    entreprise: "FREELANCE",
    description: "Gestion de la relation client, organisation des tâches quotidiennes, création de contenu et suivi de commandes.",
    icon: <IconBriefcase size={18} />,
    active: true,
  },
  {
    periode: "2020 — 2023",
    poste: "Community Manager",
    entreprise: "MARQUES LOCALES — INDÉPENDANTE",
    description: "Gestion et animation de pages sur Facebook et Instagram. Création de contenus, modération de la communauté et suivi des performances.",
    icon: <IconMessage2 size={18} />,
  },
  {
    periode: "2017 — 2019",
    poste: "Conseillère Client Francophone",
    entreprise: "EUFONIE",
    description: "Traitement des demandes clients en appels entrants et sortants, résolution de litiges et suivi après-vente.",
    icon: <IconHeadset size={18} />,
  },
  {
    periode: "2016",
    poste: "Conseillère Technique Client",
    entreprise: "INTELCIA",
    description: "Assistance technique en appels entrants dans le domaine de la téléphonie mobile, diagnostic et résolution de pannes.",
    icon: <IconTool size={18} />,
  },
]

const Experience = () => {
  const refsItems = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entree) => {
          if (entree.isIntersecting) {
            entree.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    refsItems.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="experience-section">
        <div className="experience_text">
      <p className="experience-label">PARCOURS</p>
      <h2 className="experience-titre">
        Expériences <span className="experience-titre-italic">professionnelles</span>
      </h2>
        </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => (refsItems.current[i] = el)}
            className="timeline-item"
          >
            <div className={`timeline-icon ${exp.active ? 'active' : ''}`}>
              {exp.icon}
            </div>
            <div className="timeline-content">
              <p className="timeline-periode">{exp.periode}</p>
              <h3 className="timeline-poste">{exp.poste}</h3>
              <p className="timeline-entreprise">{exp.entreprise}</p>
              <p className="timeline-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience