import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Style/Font.css'
import App from './App.jsx'
import './Style/ColorPalette.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
