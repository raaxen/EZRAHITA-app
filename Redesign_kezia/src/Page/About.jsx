import React from 'react'
import '../Style/About.css'

const About = () => {
  return (
    <>
        <section className="section">
            <div className="Division1">
            <span className='About' style={{color:'#D68A4C' , fontFamily:'Italiana'}}>A PROPOS</span>
                <h1>
                    Une Professionelle <span> à votre service</span>
                </h1>
                <p>
                    Forte de plusieurs années d'expérience dans la <strong>relation client</strong>  et la <strong> gestion des réseaux sociaux</strong>, j'accompagne les entrepreneurs et les équipes dans leur organisation quotidienne.
                    Mon parcours m'a permis de développer une réelle polyvalence : du support client en appels entrants à la modération de communautés en ligne, je maîtrise les outils et les codes de la communication digitale.
                    Disponible en full remote, aux horaires français (8h–17h), je m'adapte aux besoins de chaque client avec rigueur et réactivité.
                </p>
            </div>
            <div className="Division2">
                <div className="Experience">
                        <span>8+</span>
                    <p>
                        Année d'experience professionnelle
                    </p>
                </div>
                <div className="Année">
                    <span>3</span>
                    <p>
                        Ans en Community Management
                    </p>
                </div>
                <div className="Language">
                    <span>
                        FR
                    </span>
                    <p>
                        Conseillere francophone certifiée 
                    </p>
                </div>
            </div>
        </section>
    </>
)
}

export default About