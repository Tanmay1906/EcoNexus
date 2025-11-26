import React from 'react'
import { motion } from 'framer-motion'

interface CorporateSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  companyName: string
  eprCompliance: number
  walletConnected: boolean
  walletAddress?: string
}

const CorporateSidebar: React.FC<CorporateSidebarProps> = ({
  activeSection,
  onSectionChange,
  companyName,
  eprCompliance,
  walletConnected,
  walletAddress
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'wallet', label: 'Plastic Credit Wallet', icon: '🏆' },
    { id: 'marketplace', label: 'Credit Marketplace', icon: '🛒' },
    { id: 'products', label: 'Upcycled Products', icon: '📦' },
    { id: 'analytics', label: 'ESG Analytics', icon: '📈' },
    { id: 'blockchain', label: 'Blockchain Audit', icon: '🔍' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile Settings', icon: '👤' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    window.location.href = '/auth/cume/login'
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-gradient-to-b from-blue-600 to-blue-800 min-h-screen shadow-2xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            🏢
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{companyName}</h1>
            <p className="text-blue-200 text-sm">Corporate Portal</p>
          </div>
        </div>
        
        {/* EPR Compliance Badge */}
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100 text-sm font-medium">EPR Compliance</span>
            <span className="text-white font-bold">{eprCompliance}%</span>
          </div>
          <div className="w-full bg-blue-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${eprCompliance}%` }}
            />
          </div>
        </div>
      </div>

      {/* MetaMask Connection */}
      <div className="p-6 border-b border-blue-700">
        {walletConnected ? (
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-sm font-medium">MetaMask Connected</span>
            </div>
            <p className="text-blue-200 text-xs font-mono truncate">
              {walletAddress}
            </p>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
          >
            Connect MetaMask
          </motion.button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <motion.li key={item.id}>
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-white/20 text-white shadow-lg border-l-4 border-white'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Notifications */}
      <div className="p-6 border-t border-blue-700">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔔</span>
            <span className="text-white font-medium">Notifications</span>
          </div>
          <div className="space-y-2">
            <div className="text-blue-100 text-sm">
              <span className="font-medium">New ESG Report</span>
              <p className="text-xs text-blue-200">Ready for download</p>
            </div>
            <div className="text-blue-100 text-sm">
              <span className="font-medium">Credit Purchase</span>
              <p className="text-xs text-blue-200">3 transactions pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-blue-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-red-500/20 text-red-300 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default CorporateSidebar
