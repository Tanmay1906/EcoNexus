import React from 'react'
import { motion } from 'framer-motion'
import { useCollectorStore } from '../../store/collectorStore'

// We'll compute the 'You' contribution from collector proofs so quick links and leaderboard match
const staticLeaders = [
  { name: 'Asha K.', kg: 1240, badge: 'Green Warrior 2025', rank: 1 },
  { name: 'Ravi P.', kg: 980, badge: 'Verified Champion', rank: 2 },
]

const rankColors = {
  1: { bg: 'bg-amber-500', ring: 'ring-amber-500/30', text: 'text-amber-400' },
  2: { bg: 'bg-slate-400', ring: 'ring-slate-400/30', text: 'text-slate-400' },
  3: { bg: 'bg-orange-600', ring: 'ring-orange-600/30', text: 'text-orange-400' },
}

const Leaderboard = () => {
  const proofs = useCollectorStore((s) => s.proofs)
  const youKg = proofs.reduce((sum, p) => sum + (p.weight || 0), 0)

  const leaders = [
    ...staticLeaders,
    { name: 'You', kg: youKg, badge: 'Upcycler', rank: 3 },
  ]

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 p-4 rounded-lg">
      <h3 className="text-lg text-slate-100 font-semibold">Leaderboard</h3>
      <div className="mt-3 space-y-3">
        {leaders.map((l, i) => {
          const isYou = l.name === 'You'
          const rankColor = rankColors[l.rank] || { bg: 'bg-emerald-600', ring: 'ring-emerald-600/30', text: 'text-emerald-400' }

          return (
            <motion.div
              key={l.name}
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-3 bg-slate-800/50 border rounded-lg flex items-center gap-3 ${
                isYou
                  ? 'border-emerald-600/50 bg-emerald-900/10'
                  : 'border-emerald-900/30'
              } hover:border-emerald-700/60 transition-all`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${rankColor.bg} ring-4 ${rankColor.ring} font-bold text-white text-sm`}>
                {l.rank}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className={`font-semibold ${isYou ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {l.name}
                  </div>
                  {isYou && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-600/30">
                      You
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">{l.badge}</div>
              </div>

              <div className="text-slate-100 font-bold tabular-nums">{l.kg} <span className="text-sm text-slate-400">kg</span></div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Leaderboard