import { useState } from 'react'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import StudentMarketplace from './components/StudentMarketplace'
import EventsPortal from './components/EventsPortal'
import EventDetail from './components/EventDetail'
import Coach from './components/Coach'

export type Page = 'landing' | 'dashboard' | 'marketplace' | 'events' | 'event-detail' | 'coach'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page)
  }

  if (currentPage === 'dashboard') {
    return <Dashboard onNavigate={handleNavigate} />
  }

  if (currentPage === 'marketplace') {
    return <StudentMarketplace onNavigate={handleNavigate} />
  }

  if (currentPage === 'events') {
    return <EventsPortal onNavigate={handleNavigate} />
  }

  if (currentPage === 'event-detail') {
    return <EventDetail onBack={() => setCurrentPage('events')} />
  }

  if (currentPage === 'coach') {
    return <Coach onNavigate={handleNavigate} />
  }

  return (
    <>
      <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />
    </>
  )
}

export default App
