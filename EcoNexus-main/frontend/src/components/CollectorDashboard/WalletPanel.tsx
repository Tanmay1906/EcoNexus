import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './shared/AnimatedCounter'
import { useWalletStore } from '../../store/walletStore'

const WalletPanel = () => {
  const balance = useWalletStore((s) => s.balance)
  const recentPayout = useWalletStore((s) => s.recentPayout)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 p-6 sm:p-8 rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <div className="text-xs sm:text-sm font-medium text-emerald-400/80 uppercase tracking-wide">
            Total Earnings
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl text-slate-300">₹</span>
            <div className="text-3xl sm:text-4xl font-bold text-slate-100">
              <AnimatedCounter value={balance} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400/70">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Next payout: <span className="font-semibold text-emerald-400">Dec 5, 2025</span>
          </div>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-600/20"
          >
            Withdraw Funds
          </motion.button>
          
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent payout: <span className="text-emerald-400 font-semibold">₹{recentPayout.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WalletPanel