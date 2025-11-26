import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'submit-proof', label: 'Submit Proof', icon: '📤' },
    { id: 'payment-status', label: 'Payment Status', icon: '💰' },
    { id: 'verification-history', label: 'Verification History', icon: '📋' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    
    // Navigate to login page
    window.location.href = '/auth/rc/login'
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 min-h-screen bg-slate-900 border-r border-blue-900/30 shadow-2xl"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-emerald-400 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold text-white">PLASTIFY</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-900/50 to-emerald-400/20 text-emerald-400 border-l-4 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
          
          {/* Logout separator */}
          <div className="pt-4 mt-4 border-t border-slate-700">
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-900/30"
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
