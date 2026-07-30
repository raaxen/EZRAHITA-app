import React from 'react'
import '../Style/Form.css'

const Form = () => {
  return (
    <div className='Form'>
        <div className='form_input1'>
            <div className='name'>
                <input className='input_name' placeholder=' ' />
                <label className='name_label'>
                    Votre Nom
                </label>
            </div>
            <div className='mail'>
                <input className='input_mail' placeholder=' ' />
                <label className='mail_input'>
                    Adresse Mail
                </label>
            </div>
        </div>
        <div className='form_selection'>

        </div>
    </div>    
)
}

export default Form