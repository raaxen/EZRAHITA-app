import React from 'react'
import SkillCard from '../Components/Card'
import '../Style/Skills.css'
import { IconHeadset, IconUsers, IconClipboardList, IconKeyboard } from '@tabler/icons-react'

const competences = [
  { Icon: IconHeadset, titre: 'Service Client & SAV', description: 'Gestion des demandes, suivi après-vente, résolution de litiges et fidélisation client — en appels, chat ou e-mail.' },
  { Icon: IconUsers, titre: 'Community Management', description: 'Animation de communautés, création de contenus, modération et analyse de performances sur les réseaux sociaux.' },
  { Icon: IconClipboardList, titre: 'Assistance Personnelle', description: 'Organisation du quotidien, gestion administrative et coordination des tâches pour les entrepreneurs et équipes à distance.' },
  { Icon: IconKeyboard, titre: 'Dactylographie', description: "Frappe rapide et précise à l'aveuglette — un atout pour la productivité en environnement de travail à distance." },
]

const outils = ['Zendesk', 'Meta Business Suite', 'Slack', 'Pipedrive']

const Skills = () => (
  <>
    <section id="Skills" className="Skills">  
      <div className="div1">
        <p>SAVOIR-FAIRE</p>
        <h1>Competence <span>clé</span></h1>
      </div>
      <div className="div2">
        {competences.map((c, i) => (
          <SkillCard key={i} Icon={c.Icon} titre={c.titre} description={c.description} />
        ))}
      </div>

    <div className='outils'>
      <div className='outils_title'>
          <h2>OUTILS MAITRISE</h2>
      </div>
      <div className='outils_content'>
          {
        outils.map((outil , i) => 
          <React.Fragment key={i}>
              <span className="outil-item">{outil}</span>
            {i < outils.length - 1 && <span className="outil-separateur" aria-hidden="true">·</span>}
          </React.Fragment>
        )
      }
      </div>
    </div>
    </section>
  </>
)

export default Skills