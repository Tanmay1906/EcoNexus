import React from 'react'
import { motion } from 'framer-motion'
import { useCollectorStore } from '../../store/collectorStore'

const statusConfig = {
  approved: {
    bg: 'bg-emerald-500',
    ring: 'ring-emerald-500/30',
    text: 'text-emerald-400',
    label: 'Approved',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  rejected: {
    bg: 'bg-red-500',
    ring: 'ring-red-500/30',
    text: 'text-red-400',
    label: 'Rejected',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  },
  pending: {
    bg: 'bg-amber-500',
    ring: 'ring-amber-500/30',
    text: 'text-amber-400',
    label: 'Pending',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
}

const ProofTimeline = () => {
  const proofs = useCollectorStore((s) => s.proofs)

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl text-slate-100 font-bold mb-1">Proof History</h3>
        <p className="text-sm text-emerald-400/70">Track all your submitted proofs and their verification status</p>
      </div>
      
      <div className="mt-6 space-y-4">
        {proofs.length === 0 ? (
          <div className="py-12 text-center">
            <svg className="w-16 h-16 mx-auto text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400">No proofs submitted yet</p>
            <p className="text-sm text-slate-500 mt-1">Upload your first proof to get started</p>
          </div>
        ) : (
          proofs.map((p, index) => {
            const config = statusConfig[p.status] || statusConfig.pending
            return (
              <motion.div 
                key={p.id} 
                initial={{ x: -40, opacity: 0 }} 
                whileInView={{ x: 0, opacity: 1 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-5 bg-slate-800/50 border border-emerald-900/30 rounded-lg hover:border-emerald-800/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ring-4 ${config.ring} shadow-lg`}>
                    {config.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl font-bold text-slate-100">{p.weight} kg</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${config.bg} bg-opacity-20 ${config.text} border border-current border-opacity-30`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {new Date(p.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <span className="font-mono bg-slate-900/50 px-2 py-1 rounded">
                          Hash: {p.hash || '—'}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        Ref: <span className="font-mono text-emerald-400/70">TX-{p.id.slice(-6)}</span>
                      </div>
                    </div>
                    
                    {p.adminComment && (
                      <div className="mt-3 p-3 bg-slate-900/50 border border-emerald-900/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <div className="text-xs font-semibold text-emerald-400 mb-1">Admin Comment</div>
                            <div className="text-sm text-slate-300">{p.adminComment}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ProofTimeline