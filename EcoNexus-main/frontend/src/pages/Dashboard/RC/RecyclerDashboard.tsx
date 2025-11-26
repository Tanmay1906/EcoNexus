import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../../components/RecyclerDashboard/Sidebar'
import ImpactOverview from '../../../components/RecyclerDashboard/ImpactOverview'
import SubmitProof from '../../../components/RecyclerDashboard/SubmitProof'
import VerificationHistory from '../../../components/RecyclerDashboard/VerificationHistory'
import PaymentStatus from '../../../components/RecyclerDashboard/PaymentStatus'
import MessagingCenter from '../../../components/RecyclerDashboard/MessagingCenter'
import ProfileSettings from '../../../components/RecyclerDashboard/ProfileSettings'

const RecyclerDashboard: React.FC = () => {
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
    totalWasteProcessed: 1240,
    approvedProofs: 42,
    pendingApprovals: 6,
    paymentsCompleted: 38,
    complianceScore: 92
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <ImpactOverview stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VerificationHistory />
              <PaymentStatus />
            </div>
          </div>
        )
      case 'submit-proof':
        return <SubmitProof />
      case 'verification-history':
        return <VerificationHistory />
      case 'payment-status':
        return <PaymentStatus />
      case 'messages':
        return <MessagingCenter />
      case 'profile':
        return <ProfileSettings />
      default:
        return (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-slate-400">The requested section is not available.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 text-white rounded-lg shadow-lg"
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
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  {activeSection === 'dashboard' && 'Recycler Dashboard'}
                  {activeSection === 'submit-proof' && 'Submit Recycling Proof'}
                  {activeSection === 'verification-history' && 'Verification History'}
                  {activeSection === 'payment-status' && 'Payment Status'}
                  {activeSection === 'messages' && 'Messages'}
                  {activeSection === 'profile' && 'Profile Settings'}
                </h1>
                <p className="text-slate-600">
                  {activeSection === 'dashboard' && 'Manage your recycling operations and track your impact'}
                  {activeSection === 'submit-proof' && 'Submit new recycling proofs for verification'}
                  {activeSection === 'verification-history' && 'View your verification timeline and status'}
                  {activeSection === 'payment-status' && 'Track your payments and earnings'}
                  {activeSection === 'messages' && 'Communicate with PLASTIFY admin team'}
                  {activeSection === 'profile' && 'Manage your facility and payment information'}
                </p>
              </div>

              {/* Quick Stats */}
              {activeSection === 'dashboard' && (
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Compliance Score</p>
                    <p className="text-2xl font-bold text-emerald-500">{stats.complianceScore}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-blue-900">₹6,715</p>
                  </div>
                </div>
              )}
            </div>
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

export default RecyclerDashboard
