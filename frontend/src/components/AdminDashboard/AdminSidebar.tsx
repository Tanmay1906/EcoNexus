import React from 'react'
import { motion } from 'framer-motion'

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  adminName: string
  adminRole: string
  systemHealth: number
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
  adminName,
  adminRole,
  systemHealth
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🎛️', badge: null },
    { id: 'collectors', label: 'Collectors', icon: '👥', badge: '1247' },
    { id: 'recyclers', label: 'Recyclers', icon: '♻️', badge: '342' },
    { id: 'upcyclers', label: 'Upcyclers', icon: '🎨', badge: '189' },
    { id: 'corporates', label: 'Corporates', icon: '🏢', badge: '67' },
    { id: 'verification', label: 'Verification Engine', icon: '🔍', badge: '89' },
    { id: 'minting', label: 'Mint Credits', icon: '🪙', badge: '12' },
    { id: 'payments', label: 'Payments', icon: '💰', badge: '234' },
    { id: 'marketplace', label: 'Marketplace Control', icon: '🛒', badge: null },
    { id: 'blockchain', label: 'Blockchain Audit', icon: '🔗', badge: null },
    { id: 'disputes', label: 'Dispute Center', icon: '⚖️', badge: '12' },
    { id: 'roles', label: 'Roles & Permissions', icon: '🛡️', badge: null },
    { id: 'analytics', label: 'Analytics', icon: '📈', badge: null },
    { id: 'activity', label: 'Activity Feed', icon: '📡', badge: null },
    { id: 'logout', label: 'Logout', icon: '🚪', badge: null }
  ]

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    window.location.href = '/auth/cume/login'
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'bg-emerald-500'
    if (health >= 80) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-gradient-to-b from-slate-900 to-slate-950 min-h-screen shadow-2xl border-r border-slate-800"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            🏛️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">PLASTIFY Control Tower</h1>
            <p className="text-slate-400 text-sm">Admin Portal</p>
          </div>
        </div>
        
        {/* Admin Info */}
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Administrator</span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30">
              SUPER ADMIN
            </span>
          </div>
          <p className="text-white font-semibold">{adminName}</p>
          <p className="text-slate-400 text-sm">{adminRole}</p>
        </div>
      </div>

      {/* System Health */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm font-medium">System Health</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${getHealthColor(systemHealth)} rounded-full animate-pulse`} />
            <span className="text-white font-bold">{systemHealth}%</span>
          </div>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${getHealthColor(systemHealth)}`}
            style={{ width: `${systemHealth}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-emerald-400 text-xs">Blockchain: Healthy</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-6 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <motion.li key={item.id}>
              {item.id === 'logout' ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 shadow-lg border-l-4 border-teal-500'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      activeSection === item.id
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute right-2 w-2 h-2 bg-teal-400 rounded-full"
                    />
                  )}
                </motion.button>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="p-6 border-t border-slate-800">
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg p-4 border border-amber-500/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚡</span>
            <span className="text-amber-400 font-medium">System Status</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Active Users:</span>
              <span className="text-white font-semibold">1,845</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Daily Transactions:</span>
              <span className="text-white font-semibold">1,567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pending Actions:</span>
              <span className="text-amber-400 font-semibold">89</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

export default AdminSidebar
