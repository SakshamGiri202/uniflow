import { useState } from 'react'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import StudentMarketplace from './components/StudentMarketplace'
import EventsPortal from './components/EventsPortal'
import EventDetail from './components/EventDetail'
import ChatPage from './components/ChatPage'

export type Page = 'landing' | 'dashboard' | 'marketplace' | 'events' | 'event-detail' | 'chat'

type ChatParams = {
  sellerName: string
  productTitle: string
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [chatParams, setChatParams] = useState<ChatParams | null>(null)

  const handleNavigate = (page: string, params?: ChatParams) => {
    setCurrentPage(page as Page)
    if (params) {
      setChatParams(params)
    }
  }

  const handleBack = () => {
    setCurrentPage('marketplace')
    setChatParams(null)
  }

  if (currentPage === 'chat' && chatParams) {
    return <ChatPage sellerName={chatParams.sellerName} productTitle={chatParams.productTitle} onBack={handleBack} />
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

  return (
    <>
      <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />
    </>
  )
}

export default App
