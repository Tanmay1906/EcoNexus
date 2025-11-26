import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './shared/AnimatedCounter'

interface OverviewStats {
  totalMaterialReceived: number
  totalProductsCreated: number
  marketplaceListings: number
  completedOrders: number
  impactScore: number
}

interface UpcyclerOverviewProps {
  stats: OverviewStats
}

const UpcyclerOverview: React.FC<UpcyclerOverviewProps> = ({ stats }) => {
  const statsCards = [
    {
      title: 'Material Received',
      value: stats.totalMaterialReceived,
      suffix: ' kg',
      icon: '♻️',
      color: 'from-cyan-500/20 to-cyan-600/10',
      borderColor: 'border-cyan-500/50',
      glowColor: 'rgba(0, 229, 255, 0.4)'
    },
    {
      title: 'Products Created',
      value: stats.totalProductsCreated,
      suffix: '',
      icon: '🧪',
      color: 'from-pink-500/20 to-pink-600/10',
      borderColor: 'border-pink-500/50',
      glowColor: 'rgba(255, 0, 127, 0.4)'
    },
    {
      title: 'Marketplace Listings',
      value: stats.marketplaceListings,
      suffix: '',
      icon: '🛒',
      color: 'from-violet-500/20 to-violet-600/10',
      borderColor: 'border-violet-500/50',
      glowColor: 'rgba(109, 40, 217, 0.4)'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      suffix: '',
      icon: '🏢',
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/50',
      glowColor: 'rgba(74, 222, 128, 0.4)'
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Hero Panel */}
      <div 
        className="rounded-2xl p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: '0 0 40px rgba(0, 229, 255, 0.2), inset 0 0 30px rgba(255, 0, 127, 0.1)'
        }}
      >
        {/* Floating holographic circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 127, 0.3) 0%, transparent 70%)',
            filter: 'blur(25px)'
          }}
        />

        {/* Header */}
        <div className="relative z-10 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-4xl">🌆</span>
            Upcycler Overview
          </h2>
          <p className="text-slate-400">Track your impact and performance in the circular economy</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px ${card.glowColor}`
              }}
              className={`p-6 rounded-xl border ${card.borderColor} relative overflow-hidden`}
              style={{
                background: `linear-gradient(135deg, ${card.color.split(' ')[0]} 0%, ${card.color.split(' ')[1]} 100%)`,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 20px ${card.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.05)`
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${card.glowColor} 0%, transparent 50%)`,
                  opacity: 0.3,
                  mixBlendMode: 'screen'
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{card.icon}</span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: card.glowColor }} />
                </div>
                
                <div className="text-slate-400 text-sm mb-2">{card.title}</div>
                
                <div className="text-2xl font-bold text-white flex items-baseline">
                  <AnimatedCounter 
                    value={card.value} 
                    suffix={card.suffix}
                    className="text-transparent bg-clip-text"
                    style={{
                      background: `linear-gradient(135deg, #00E5FF 0%, #FF007F 100%)`,
                      WebkitBackgroundClip: 'text'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 rounded-xl border border-violet-500/50 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.2) 0%, rgba(109, 40, 217, 0.1) 100%)',
            boxShadow: '0 0 30px rgba(109, 40, 217, 0.3), inset 0 0 20px rgba(109, 40, 217, 0.1)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Impact Score</h3>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={stats.impactScore} suffix="/100" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.impactScore}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #6D28D9 0%, #00E5FF 100%)',
                        boxShadow: '0 0 10px rgba(109, 40, 217, 0.5)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-5xl"
            >
              ⚡
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default UpcyclerOverview
