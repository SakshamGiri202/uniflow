import { useState } from 'react'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return <Dashboard />
  }

  return (
    <>
      <LandingPage onGetStarted={() => setShowDashboard(true)} />
    </>
  )
}

export default App
