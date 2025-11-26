import React from 'react'
import { motion } from 'framer-motion'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🌆' },
    { id: 'material-intake', label: 'Material Intake', icon: '♻️' },
    { id: 'impact-lab', label: 'Impact Lab', icon: '🧪' },
    { id: 'portfolio', label: 'Portfolio', icon: '🖼️' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
    { id: 'corporate-orders', label: 'Corporate Orders', icon: '🏢' },
    { id: 'wallet', label: 'Wallet', icon: '💳' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
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
      className="w-72 min-h-screen bg-cyber-slate border-r border-cyan-500/30 shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(10, 15, 36, 0.95) 0%, rgba(17, 24, 39, 0.9) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 40px rgba(0, 229, 255, 0.3), inset 0 0 20px rgba(255, 0, 127, 0.1)'
      }}
    >
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #FF007F 100%)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
            }}
          >
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold text-white">PLASTIFY</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                x: 4,
                boxShadow: '0 0 20px rgba(255, 0, 127, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border-l-4 border-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                ...(activeSection === item.id && {
                  boxShadow: 'inset 0 0 20px rgba(0, 229, 255, 0.2), 0 0 15px rgba(255, 0, 127, 0.3)'
                })
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-xl"
                  style={{ mixBlendMode: 'screen' }}
                />
              )}
            </motion.button>
          ))}
          
          {/* Logout separator */}
          <div className="pt-4 mt-4 border-t border-slate-700/50">
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                x: 4,
                boxShadow: '0 0 20px rgba(255, 0, 127, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-pink-400 hover:text-pink-300 hover:bg-red-900/20 border border-red-900/30"
              style={{
                boxShadow: '0 0 10px rgba(255, 0, 127, 0.2)'
              }}
            >
              <span className="text-xl">🚨</span>
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.aside>
  )
}

export default Sidebar
