import React from 'react'
import { motion } from 'framer-motion'

interface KPICard {
  title: string
  value: string | number
  subtitle: string
  color: string
  highlight: boolean
  icon: string
}

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2000, suffix = '' }) => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}

const CorporateOverview: React.FC = () => {
  const kpis: KPICard[] = [
    {
      title: 'Plastic Credits Owned',
      value: 15420,
      subtitle: 'Verified NFTs',
      color: 'from-blue-500 to-cyan-500',
      highlight: true,
      icon: '🏆'
    },
    {
      title: 'Total Plastic Offset',
      value: 87500,
      subtitle: 'kg recycled',
      color: 'from-emerald-500 to-teal-500',
      highlight: false,
      icon: '♻️'
    },
    {
      title: 'CO₂ Equivalent Saved',
      value: 125000,
      subtitle: 'kg CO₂',
      color: 'from-green-500 to-emerald-500',
      highlight: true,
      icon: '🌍'
    },
    {
      title: 'Blockchain Transactions',
      value: 3247,
      subtitle: 'Verified on-chain',
      color: 'from-purple-500 to-blue-500',
      highlight: false,
      icon: '⛓️'
    },
    {
      title: 'EPR Compliance',
      value: 94,
      subtitle: '% compliant',
      color: 'from-indigo-500 to-purple-500',
      highlight: true,
      icon: '📊'
    },
    {
      title: 'Sustainability Score',
      value: 87,
      subtitle: 'out of 100',
      color: 'from-amber-500 to-orange-500',
      highlight: false,
      icon: '⭐'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Corporate Overview</h2>
        <p className="text-slate-600">Track your ESG performance and plastic credit portfolio</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            className={`relative overflow-hidden rounded-2xl ${
              kpi.highlight 
                ? 'bg-gradient-to-br ' + kpi.color + ' text-white' 
                : 'bg-white border border-slate-200'
            } shadow-lg`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className={`text-sm font-medium ${
                    kpi.highlight ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {kpi.title}
                  </p>
                  <div className="flex items-baseline mt-2">
                    <h3 className={`text-3xl font-bold ${
                      kpi.highlight ? 'text-white' : 'text-slate-900'
                    }`}>
                      {typeof kpi.value === 'number' ? (
                        <AnimatedCounter value={kpi.value} />
                      ) : (
                        kpi.value
                      )}
                      {kpi.title.includes('%') && '%'}
                    </h3>
                    {kpi.highlight && (
                      <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                        TOP
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${
                    kpi.highlight ? 'text-white/70' : 'text-slate-500'
                  }`}>
                    {kpi.subtitle}
                  </p>
                </div>
                <div className={`text-3xl ${
                  kpi.highlight ? 'opacity-80' : 'opacity-60'
                }`}>
                  {kpi.icon}
                </div>
              </div>

              {/* Progress Bar for compliance/score metrics */}
              {(kpi.title.includes('Compliance') || kpi.title.includes('Score')) && (
                <div className="mt-4">
                  <div className={`h-2 rounded-full ${
                    kpi.highlight ? 'bg-white/20' : 'bg-slate-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${kpi.value}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        kpi.highlight ? 'bg-white' : 'bg-gradient-to-r ' + kpi.color
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Subtle gradient overlay for highlight cards */}
            {kpi.highlight && (
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { title: 'Buy Credits', icon: '🛒', color: 'from-blue-500 to-cyan-500' },
          { title: 'ESG Report', icon: '📊', color: 'from-emerald-500 to-teal-500' },
          { title: 'Blockchain Audit', icon: '🔍', color: 'from-purple-500 to-indigo-500' },
          { title: 'Order Products', icon: '📦', color: 'from-amber-500 to-orange-500' }
        ].map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white text-center shadow-lg`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="font-semibold">{action.title}</div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}

export default CorporateOverview
