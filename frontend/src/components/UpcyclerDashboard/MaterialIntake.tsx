import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MaterialIntakeItem {
  id: string
  materialType: string
  weight: number
  fromRecycler: string
  intakeProof: string
  date: string
  status: 'pending' | 'verified'
}

const MaterialIntake: React.FC = () => {
  const [materialIntakes, setMaterialIntakes] = useState<MaterialIntakeItem[]>([
    {
      id: '1',
      materialType: 'PET',
      weight: 120.5,
      fromRecycler: 'Green Earth Recycling',
      intakeProof: 'QmPet123abc',
      date: '2024-01-15',
      status: 'verified'
    },
    {
      id: '2',
      materialType: 'HDPE',
      weight: 85.2,
      fromRecycler: 'EcoCycle Solutions',
      intakeProof: 'QmHdpe456def',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: '3',
      materialType: 'LDPE',
      weight: 45.8,
      fromRecycler: 'Sustainable Plastics',
      intakeProof: 'QmLdpe789ghi',
      date: '2024-01-13',
      status: 'verified'
    },
    {
      id: '4',
      materialType: 'PP',
      weight: 92.3,
      fromRecycler: 'Circular Materials Co',
      intakeProof: 'QmPp012jkl',
      date: '2024-01-12',
      status: 'pending'
    }
  ])

  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
      case 'pending':
        return 'text-amber-400 border-amber-400/50 bg-amber-400/10'
      default:
        return 'text-slate-400 border-slate-400/50 bg-slate-400/10'
    }
  }

  const handleAcknowledgeMaterial = async (id: string) => {
    setAcknowledgingId(id)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setMaterialIntakes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'verified' } : item
      )
    )
    
    setAcknowledgingId(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-slate rounded-2xl p-6 border border-cyan-500/30"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(255, 0, 127, 0.1)'
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">♻️</span>
        Material Intake
      </h2>

      <div className="space-y-4">
        <AnimatePresence>
          {materialIntakes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(0, 229, 255, 0.3)'
              }}
              className="p-4 rounded-xl border border-cyan-500/20 relative overflow-hidden"
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(255, 0, 127, 0.05) 100%)',
                  mixBlendMode: 'screen'
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Material Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400 block">Material Type</span>
                        <span className="text-cyan-300 font-semibold">{item.materialType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Weight</span>
                        <span className="text-white font-semibold">{item.weight} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">From Recycler</span>
                        <span className="text-pink-300 font-semibold">{item.fromRecycler}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Intake Proof</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://picsum.photos/seed/${item.intakeProof}/200/150`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 font-mono text-xs truncate block hover:underline"
                          >
                            {item.intakeProof}
                          </a>
                          <span className="text-xs text-slate-400">(View Image)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {item.status === 'pending' && (
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAcknowledgeMaterial(item.id)}
                        disabled={acknowledgingId === item.id}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                        style={{
                          boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)'
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {acknowledgingId === item.id ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Acknowledging...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="button"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              Acknowledge Material
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                    
                    {item.status === 'verified' && (
                      <div className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold border border-emerald-500/30 text-center">
                        Verified ✓
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {materialIntakes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-slate-400 text-lg">No material intake yet</p>
          <p className="text-slate-500 text-sm mt-2">Verified recyclers will send materials to your facility</p>
        </div>
      )}
    </motion.section>
  )
}

export default MaterialIntake
