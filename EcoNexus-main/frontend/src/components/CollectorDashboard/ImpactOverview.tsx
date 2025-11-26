import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './shared/AnimatedCounter'

const metrics = [
  { id: 'collected', label: 'Total Plastic Collected (kg)', value: 1240 },
  { id: 'credits', label: 'Plastic Credits Earned', value: 320 },
  { id: 'pending', label: 'Pending Verifications', value: 6 },
  { id: 'approved', label: 'Approved Proofs', value: 402 },
  { id: 'rank', label: 'Leaderboard Rank', value: 12 },
]

const ImpactOverview = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.1 }} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6"
      >
        {metrics.map((m, i) => (
          <motion.div 
            key={m.id} 
            whileHover={{ y: -6, scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 p-5 sm:p-6 rounded-xl flex flex-col shadow-lg hover:shadow-emerald-900/20 hover:border-emerald-800/60 transition-all"
          >
            <div className="text-xs sm:text-sm text-emerald-400/80 mb-3 font-medium uppercase tracking-wide">
              {m.label}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-100 flex items-center mb-2">
              <AnimatedCounter value={m.value} />
            </div>
            <div className="mt-auto pt-2 text-xs text-emerald-500/60 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Updated just now
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-6 lg:mt-8 bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 rounded-xl p-6 sm:p-8 overflow-hidden relative shadow-lg" 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-transparent" />
        
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl text-slate-100 font-bold mb-2">
            3D Waste → Token Flow
          </h3>
          <p className="text-sm sm:text-base text-emerald-400/70 mb-6">
            Animated particle preview of collected waste transforming into glowing tokens.
          </p>

          <div className="mt-6 h-48 sm:h-56 flex items-center justify-center">
            <motion.div 
              animate={{ 
                x: [0, 15, 0], 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1]
              }} 
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }} 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-2xl shadow-emerald-500/50"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ImpactOverview