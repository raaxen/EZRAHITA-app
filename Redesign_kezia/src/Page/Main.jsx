import React from 'react'
import '../Style/Main.css'
import '../Style/Font.css'
import '../Style/ColorPalette.css'
import Bubble from '../Components/Bubble.jsx'
import Avatar from '../assets/Kezia.png'
import Button from '../Components/Button.jsx'


const Main = () => {
  return (
      <>
          <div className="Bg" id='#home'>
            <div className="Container">
              <div className="Image">
                    <img src={Avatar} />
              </div>
              <div className="About">
                    <div className="Title">
                        <h1>
                          Kezia <span>Razakasoa</span>
                        </h1>
                    </div>

                <div className="paragraph">
                    <p>
                      Assistante virtuelle polyvalente, spécialisée dans le service <br /> 
                      client et le suivi après-vente — j'aide les entrepreneurs à<br />
                      mieux organiser et gérer leurs activités au quotidien.
                    </p>
                    <div className="button">
                            <Button texte='Me contacter' style="btn-0"/>
                            <Button texte="Mes experience" style="btn-1" />
                            <Button texte="Mes Compétence" style="btn-2"/>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </>
  )
}

export default Main