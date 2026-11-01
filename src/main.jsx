
import Studentcontext from './context/studentcontext.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Studentcontext>
      <App />
    </Studentcontext>
  </StrictMode>,
)
