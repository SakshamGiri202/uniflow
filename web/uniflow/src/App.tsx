import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import LandingPage from './components/LandingPage.tsx'
import Dashboard from './components/Dashboard.tsx'
import StudentMarketplace from './components/StudentMarketplace.tsx'
import EventsPortal from './components/EventsPortal.tsx'
import Coach from './components/Coach.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<StudentMarketplace />} />
        <Route path="/events" element={<EventsPortal />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
