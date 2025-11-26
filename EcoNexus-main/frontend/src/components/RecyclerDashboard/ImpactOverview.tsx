import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './shared/AnimatedCounter'

interface ImpactOverviewProps {
  stats: {
    totalWasteProcessed: number
    approvedProofs: number
    pendingApprovals: number
    paymentsCompleted: number
    complianceScore: number
  }
}

const ImpactOverview: React.FC<ImpactOverviewProps> = ({ stats }) => {
  const metrics = [
    {
      id: 'waste',
      label: 'Total Waste Processed (kg)',
      value: stats.totalWasteProcessed,
      icon: '♻️',
      color: 'from-blue-900 to-emerald-400'
    },
    {
      id: 'approved',
      label: 'Approved Proofs',
      value: stats.approvedProofs,
      icon: '✅',
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'pending',
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: '⏳',
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'payments',
      label: 'Payments Completed',
      value: stats.paymentsCompleted,
      icon: '💰',
      color: 'from-blue-900 to-purple-500'
    },
    {
      id: 'compliance',
      label: 'Compliance Score',
      value: stats.complianceScore,
      icon: '📊',
      color: 'from-blue-900 to-cyan-400',
      isScore: true
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative group"
          >
            {/* Glowing gradient edges */}
            <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm`} />
            
            <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl backdrop-blur-sm">
              {/* Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{metric.icon}</span>
                {metric.isScore && (
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    stats.complianceScore >= 80 ? 'bg-emerald-400/20 text-emerald-400' :
                    stats.complianceScore >= 60 ? 'bg-amber-400/20 text-amber-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {stats.complianceScore >= 80 ? 'Excellent' :
                     stats.complianceScore >= 60 ? 'Good' : 'Needs Work'}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <div className="text-slate-400 text-sm font-medium mb-2">
                {metric.label}
              </div>
              
              {/* Value */}
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter 
                  value={metric.value} 
                  suffix={metric.isScore ? '/100' : ''} 
                />
              </div>
              
              {/* Progress bar for compliance score */}
              {metric.isScore && (
                <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.complianceScore}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className={`h-2 rounded-full ${
                      stats.complianceScore >= 80 ? 'bg-emerald-400' :
                      stats.complianceScore >= 60 ? 'bg-amber-400' :
                      'bg-red-400'
                    }`}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default ImpactOverview
