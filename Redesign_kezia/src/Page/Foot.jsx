import React from 'react'
import '../Style/Foot.css'
import Form from '../Components/Form.jsx'


const Foot = () => {
  return (
  <> 
    <section className='Contact'>
      <div className='INPUT'>
          <div className="contact_text">
            <input type="text" className='Nom' placeholder='' />
            <label htmlFor="Nom" >Votre Nom</label>
          </div>
          <div className='contact_form'>
            <input type="text" className='Email' placeholder=''/>
            <label htmlFor="Mail">Adresse Email</label>
          </div>
          <div className='contact_content'>
            <input type="text" className="message" placeholder=''/>
            <label htmlFor="Message">
              Votre demande ou remarque
            </label>
          </div>
      </div>
      <div className='Text'>
              
      </div>
    </section> 
  </>
  )
}

export default Foot