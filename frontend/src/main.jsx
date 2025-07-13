import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TeamMembers from './Pages/TeamMems.jsx'
import PastEvents from './Pages/PastEvents.jsx'
import QuizSetup from './Pages/QuizSetup.jsx';
import ApplyNow from './Pages/ApplyNow.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> 
      <Route path="/team" element={<TeamMembers />} />
      <Route path="/event" element={<PastEvents />} />
      <Route path="/apply" element={<ApplyNow />} />
      <Route path="/quiz" element={<QuizSetup />} />
    </Routes>
  </Router>
  </StrictMode>,
)
