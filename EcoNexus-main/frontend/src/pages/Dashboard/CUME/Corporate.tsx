import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CorporateSidebar from '../../../components/CorporateDashboard/CorporateSidebar'
import CorporateOverview from '../../../components/CorporateDashboard/CorporateOverview'
import PlasticCreditWallet from '../../../components/CorporateDashboard/PlasticCreditWallet'
import CreditMarketplace from '../../../components/CorporateDashboard/CreditMarketplace'
import UpcycledProducts from '../../../components/CorporateDashboard/UpcycledProducts'
import ESGAnalytics from '../../../components/CorporateDashboard/ESGAnalytics'
import BlockchainAudit from '../../../components/CorporateDashboard/BlockchainAudit'
import MessagingCenter from '../../../components/CorporateDashboard/MessagingCenter'
import CorporateProfile from '../../../components/CorporateDashboard/CorporateProfile'

const CorporateDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard')

  // Mock corporate data
  const companyName = 'Acme Corporation Ltd'
  const eprCompliance = 94

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CorporateOverview />
      case 'wallet':
        return <PlasticCreditWallet />
      case 'marketplace':
        return <CreditMarketplace />
      case 'products':
        return <UpcycledProducts />
      case 'analytics':
        return <ESGAnalytics />
      case 'blockchain':
        return <BlockchainAudit />
      case 'messages':
        return <MessagingCenter />
      case 'profile':
        return <CorporateProfile />
      default:
        return (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Section Not Found</h2>
            <p className="text-slate-600">The requested section is not available.</p>
          </div>
        )
    }
  }

  const getHeaderTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Corporate Dashboard'
      case 'wallet':
        return 'Plastic Credit Wallet'
      case 'marketplace':
        return 'Credit Marketplace'
      case 'products':
        return 'Upcycled Products'
      case 'analytics':
        return 'ESG Analytics'
      case 'blockchain':
        return 'Blockchain Audit & Compliance'
      case 'messages':
        return 'Messages & Communication'
      case 'profile':
        return 'Corporate Profile & Settings'
      default:
        return 'Corporate Dashboard'
    }
  }

  const getHeaderDescription = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Track your ESG performance and sustainability metrics'
      case 'wallet':
        return 'Manage your blockchain-verified plastic credits'
      case 'marketplace':
        return 'Purchase verified plastic credits from certified recyclers'
      case 'products':
        return 'Browse sustainable corporate gifts and upcycled products'
      case 'analytics':
        return 'Comprehensive environmental, social, and governance metrics'
      case 'blockchain':
        return 'Complete transparent blockchain transaction history'
      case 'messages':
        return 'Communicate with upcyclers and PLASTIFY team'
      case 'profile':
        return 'Manage company information and compliance settings'
      default:
        return 'Your corporate sustainability platform'
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <CorporateSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        companyName={companyName}
        eprCompliance={eprCompliance}
        walletConnected={false}
        walletAddress=""
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1
                  key={getHeaderTitle()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-slate-800"
                >
                  {getHeaderTitle()}
                </motion.h1>
                <motion.p
                  key={getHeaderDescription()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-600 mt-1"
                >
                  {getHeaderDescription()}
                </motion.p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <span className="text-2xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </motion.button>
                
                {/* User Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    AC
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{companyName}</p>
                    <p className="text-sm text-slate-600">Corporate Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
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
        </main>
      </div>
    </div>
  )
}

export default CorporateDashboard
export { CorporateDashboard }