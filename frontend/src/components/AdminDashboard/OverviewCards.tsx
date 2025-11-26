import React from 'react'
import { motion } from 'framer-motion'

interface KPICard {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease'
  icon: string
  color: string
}

const OverviewCards: React.FC = () => {
  const kpiCards: KPICard[] = [
    {
      title: 'Total Collectors',
      value: 1247,
      change: '+12%',
      changeType: 'increase',
      icon: '👥',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Total Recyclers', 
      value: 342,
      change: '+8%',
      changeType: 'increase',
      icon: '♻️',
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Total Upcyclers',
      value: 189,
      change: '+15%',
      changeType: 'increase',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Total Corporates',
      value: 67,
      change: '+23%',
      changeType: 'increase',
      icon: '🏢',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Plastic Collected',
      value: '2.4M kg',
      change: '+18%',
      changeType: 'increase',
      icon: '⚖️',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Total Verified',
      value: '1.8M kg',
      change: '+22%',
      changeType: 'increase',
      icon: '✅',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Credits Minted',
      value: 45678,
      change: '+31%',
      changeType: 'increase',
      icon: '🪙',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'Pending Verifications',
      value: 89,
      change: '-5%',
      changeType: 'decrease',
      icon: '⏳',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Pending Payments',
      value: 234,
      change: '+12%',
      changeType: 'increase',
      icon: '💰',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Blockchain Transactions',
      value: 1567,
      change: '+45%',
      changeType: 'increase',
      icon: '🔗',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'System Health',
      value: '98.2%',
      change: '+0.3%',
      changeType: 'increase',
      icon: '💚',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Active Disputes',
      value: 12,
      change: '-8%',
      changeType: 'decrease',
      icon: '⚠️',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {kpiCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 0 30px rgba(14, 116, 144, 0.3)'
          }}
          className="relative overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-sm"
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-50" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg`}>
                {card.icon}
              </div>
            </div>
            
            {card.change && (
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  card.changeType === 'increase' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <span>{card.changeType === 'increase' ? '↑' : '↓'}</span>
                  <span>{card.change}</span>
                </div>
                <span className="text-slate-500 text-xs">vs last period</span>
              </div>
            )}
          </div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  )
}

export default OverviewCards
