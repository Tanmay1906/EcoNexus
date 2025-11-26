import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../../components/UpcyclerDashboard/Sidebar'
import UpcyclerOverview from '../../../components/UpcyclerDashboard/UpcyclerOverview'
import MaterialIntake from '../../../components/UpcyclerDashboard/MaterialIntake'
import ImpactLab from '../../../components/UpcyclerDashboard/ImpactLab'
import Portfolio from '../../../components/UpcyclerDashboard/Portfolio'
import Marketplace from '../../../components/UpcyclerDashboard/Marketplace'
import CorporateOrders from '../../../components/UpcyclerDashboard/CorporateOrders'
import MessagingCenter from '../../../components/UpcyclerDashboard/MessagingCenter'
import ProfileSettings from '../../../components/UpcyclerDashboard/ProfileSettings'
import Wallet from '../../../components/UpcyclerDashboard/Wallet'

const UpcyclerDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Dummy stats data
  const stats = {
    totalMaterialReceived: 344.8,
    totalProductsCreated: 47,
    marketplaceListings: 12,
    completedOrders: 23,
    impactScore: 85
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <UpcyclerOverview stats={stats} />
      case 'material-intake':
        return <MaterialIntake />
      case 'impact-lab':
        return <ImpactLab />
      case 'portfolio':
        return <Portfolio />
      case 'marketplace':
        return <Marketplace />
      case 'corporate-orders':
        return <CorporateOrders />
      case 'wallet':
        return <Wallet />
      case 'messages':
        return <MessagingCenter />
      case 'profile':
        return <ProfileSettings />
      default:
        return (
          <div className="bg-cyber-slate rounded-xl p-12 text-center border border-cyan-500/30"
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-slate-400">The requested section is not available.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0F24' }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-cyber-slate text-cyan-300 rounded-lg shadow-lg"
        style={{
          background: 'rgba(17, 24, 39, 0.9)',
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Fixed position for sticky behavior */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen || isDesktop ? 0 : -300 }}
        exit={{ x: -300 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed lg:fixed left-0 top-0 z-30 h-screen w-72 lg:block hidden"
      >
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={(section: string) => {
            setActiveSection(section)
            setIsMobileMenuOpen(false)
          }} 
        />
      </motion.aside>

      {/* Main Content - with left margin for sidebar */}
      <main className="lg:ml-72 min-h-screen p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2"
                  style={{
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
                  }}
                >
                  {activeSection === 'dashboard' && 'Upcycler Dashboard'}
                  {activeSection === 'material-intake' && 'Material Intake'}
                  {activeSection === 'impact-lab' && 'Impact Lab'}
                  {activeSection === 'portfolio' && 'Portfolio Gallery'}
                  {activeSection === 'marketplace' && 'Marketplace Listings'}
                  {activeSection === 'corporate-orders' && 'Corporate Orders'}
                  {activeSection === 'wallet' && 'Wallet & Payments'}
                  {activeSection === 'messages' && 'Messages'}
                  {activeSection === 'profile' && 'Profile Settings'}
                </h1>
                <p className="text-slate-400">
                  {activeSection === 'dashboard' && 'Transform recycled materials into premium products'}
                  {activeSection === 'material-intake' && 'Manage incoming verified materials from recyclers'}
                  {activeSection === 'impact-lab' && 'Create and log new upcycled products'}
                  {activeSection === 'portfolio' && 'Showcase your upcycled product collection'}
                  {activeSection === 'marketplace' && 'List products for corporate buyers'}
                  {activeSection === 'corporate-orders' && 'Track and fulfill corporate orders'}
                  {activeSection === 'wallet' && 'Manage earnings and withdrawals via bank/UPI'}
                  {activeSection === 'messages' && 'Communicate with buyers and PLASTIFY team'}
                  {activeSection === 'profile' && 'Manage your organization and compliance details'}
                </p>
              </div>

              {/* Quick Stats */}
              {activeSection === 'dashboard' && (
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Impact Score</p>
                    <p className="text-2xl font-bold text-violet-400">{stats.impactScore}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Active Orders</p>
                    <p className="text-2xl font-bold text-cyan-400">{stats.completedOrders}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Neon Underline */}
            <div className="mt-4 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00E5FF 0%, #FF007F 50%, #6D28D9 100%)',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
              }}
            />
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default UpcyclerDashboard
