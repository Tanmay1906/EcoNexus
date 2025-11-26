import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminSidebar from '../../../components/AdminDashboard/AdminSidebar'
import OverviewCards from '../../../components/AdminDashboard/OverviewCards'
import CollectorsPanel from '../../../components/AdminDashboard/CollectorsPanel'
import RecyclersPanel from '../../../components/AdminDashboard/RecyclersPanel'
import UpcyclersPanel from '../../../components/AdminDashboard/UpcyclersPanel'
import CorporatesPanel from '../../../components/AdminDashboard/CorporatesPanel'
import VerificationEngine from '../../../components/AdminDashboard/VerificationEngine'
import MintConsole from '../../../components/AdminDashboard/MintConsole'
import PaymentsCenter from '../../../components/AdminDashboard/PaymentsCenter'
import MarketplaceControl from '../../../components/AdminDashboard/MarketplaceControl'
import BlockchainAudit from '../../../components/AdminDashboard/BlockchainAudit'
import DisputeCenter from '../../../components/AdminDashboard/DisputeCenter'
import RolesPermissions from '../../../components/AdminDashboard/RolesPermissions'
import Analytics from '../../../components/AdminDashboard/Analytics'
import ActivityFeed from '../../../components/AdminDashboard/ActivityFeed'

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard')

  // Mock admin data
  const adminName = 'System Administrator'
  const adminRole = 'Super Admin'
  const systemHealth = 98

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <OverviewCards />
      case 'collectors':
        return <CollectorsPanel />
      case 'recyclers':
        return <RecyclersPanel />
      case 'upcyclers':
        return <UpcyclersPanel />
      case 'corporates':
        return <CorporatesPanel />
      case 'verification':
        return <VerificationEngine />
      case 'minting':
        return <MintConsole />
      case 'payments':
        return <PaymentsCenter />
      case 'marketplace':
        return <MarketplaceControl />
      case 'blockchain':
        return <BlockchainAudit />
      case 'disputes':
        return <DisputeCenter />
      case 'roles':
        return <RolesPermissions />
      case 'analytics':
        return <Analytics />
      case 'activity':
        return <ActivityFeed />
      default:
        return (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-slate-700">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold text-white mb-4">Section Under Development</h2>
            <p className="text-slate-400">This admin section is being built and will be available soon.</p>
          </div>
        )
    }
  }

  const getHeaderTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Global Admin Overview'
      case 'collectors':
        return 'Collectors Management'
      case 'recyclers':
        return 'Recyclers Management'
      case 'upcyclers':
        return 'Upcyclers Management'
      case 'corporates':
        return 'Corporates Management'
      case 'verification':
        return 'Verification Engine'
      case 'minting':
        return 'Plastic Credit Minting Console'
      case 'payments':
        return 'Payments Center'
      case 'marketplace':
        return 'Marketplace Control Panel'
      case 'blockchain':
        return 'Blockchain Audit Trail'
      case 'disputes':
        return 'Dispute Center'
      case 'roles':
        return 'Roles & Permissions'
      case 'analytics':
        return 'Analytics Center'
      case 'activity':
        return 'Activity Feed'
      default:
        return 'Admin Dashboard'
    }
  }

  const getHeaderDescription = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Complete ecosystem overview and system health monitoring'
      case 'collectors':
        return 'Manage and monitor all plastic collectors in the ecosystem'
      case 'recyclers':
        return 'Oversee recycling operations and material verification'
      case 'upcyclers':
        return 'Review upcycled products and marketplace submissions'
      case 'corporates':
        return 'Manage corporate clients and ESG compliance'
      case 'verification':
        return 'Review and approve submissions from all ecosystem participants'
      case 'minting':
        return 'Blockchain credit minting and transaction management'
      case 'payments':
        return 'Process and approve payments for ecosystem participants'
      case 'marketplace':
        return 'Control marketplace listings and corporate purchases'
      case 'blockchain':
        return 'Complete blockchain transaction history and audit trail'
      case 'disputes':
        return 'Handle user disputes and resolution cases'
      case 'roles':
        return 'Manage admin roles and system permissions'
      case 'analytics':
        return 'Comprehensive analytics and performance metrics'
      case 'activity':
        return 'Real-time system activity and event monitoring'
      default:
        return 'PLASTIFY administrative control center'
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        adminName={adminName}
        adminRole={adminRole}
        systemHealth={systemHealth}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header Bar */}
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 shadow-lg">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1
                  key={getHeaderTitle()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {getHeaderTitle()}
                </motion.h1>
                <motion.p
                  key={getHeaderDescription()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-400"
                >
                  {getHeaderDescription()}
                </motion.p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Blockchain Status */}
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">Blockchain Healthy</span>
                </div>
                
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-2xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </motion.button>
                
                {/* Admin Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    SA
                  </div>
                  <div>
                    <p className="font-semibold text-white">{adminName}</p>
                    <p className="text-sm text-slate-400">{adminRole}</p>
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

export default AdminDashboard
export { AdminDashboard }