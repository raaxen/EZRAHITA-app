import React from 'react'
import '../Style/Navbar.css'
import '../Style/Font.css'
import '../Style/ColorPalette.css'

const Navbar = () => {

    
  return (
     <nav>
         <div className="division1">
             <h1>Kezia <span>Razakasoa</span></h1>
         </div>

         <div className="division2">
              <div className="link">
                <a href="About">
                    <link1>
                        About
                    </link1>
                </a>
                <a href="Experience">
                    <link2>
                        Experience
                    </link2>
                </a>
                <a href="Skills">
                    <link3>
                        Skills
                    </link3>
                </a>
                <a href="Contact">
                    <link4>
                        Contact
                    </link4>
                </a>
              </div>   
         </div>

     </nav>
  )
}

export default Navbar