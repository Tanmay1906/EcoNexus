import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VerificationItem {
  id: string
  date: string
  weight: number
  materialType: string
  ipfsHash: string
  status: 'pending' | 'approved' | 'rejected'
  adminNotes?: string
  paymentStatus: 'pending' | 'completed' | 'failed'
}

const VerificationHistory: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [isResubmitting, setIsResubmitting] = useState(false)
  // Dummy data
  const history: VerificationItem[] = [
    {
      id: '1',
      date: '2024-01-15',
      weight: 45.5,
      materialType: 'PET',
      ipfsHash: 'QmXyz123...abc',
      status: 'approved',
      adminNotes: 'Quality verified. Good recycling practice.',
      paymentStatus: 'completed'
    },
    {
      id: '2',
      date: '2024-01-14',
      weight: 32.0,
      materialType: 'HDPE',
      ipfsHash: 'QmDef456...def',
      status: 'pending',
      paymentStatus: 'pending'
    },
    {
      id: '3',
      date: '2024-01-13',
      weight: 28.3,
      materialType: 'LDPE',
      ipfsHash: 'QmGhi789...ghi',
      status: 'rejected',
      adminNotes: 'Photos unclear. Please resubmit with better documentation.',
      paymentStatus: 'failed'
    },
    {
      id: '4',
      date: '2024-01-12',
      weight: 51.2,
      materialType: 'PP',
      ipfsHash: 'QmJkl012...jkl',
      status: 'approved',
      adminNotes: 'Excellent material separation.',
      paymentStatus: 'completed'
    },
    {
      id: '5',
      date: '2024-01-11',
      weight: 19.8,
      materialType: 'MLP',
      ipfsHash: 'QmMno345...mno',
      status: 'pending',
      paymentStatus: 'pending'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30 shadow-emerald-400/20'
      case 'pending':
        return 'bg-amber-400/20 text-amber-400 border-amber-400/30 shadow-amber-400/20'
      case 'rejected':
        return 'bg-red-400/20 text-red-400 border-red-400/30 shadow-red-400/20'
      default:
        return 'bg-slate-700/20 text-slate-400 border-slate-600/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✅'
      case 'pending':
        return '⏳'
      case 'rejected':
        return '❌'
      default:
        return '📋'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400'
      case 'pending':
        return 'text-amber-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-slate-400'
    }
  }

  const handleViewDetails = (item: VerificationItem) => {
    setSelectedItem(item)
    setShowDetails(true)
  }

  const handleResubmit = async (item: VerificationItem) => {
    setIsResubmitting(true)
    
    // Simulate API call for resubmission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would call an API to resubmit the proof
    console.log('Resubmitting proof:', item.id)
    
    setIsResubmitting(false)
    alert('Proof resubmitted successfully! It will be reviewed by admin.')
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedItem(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">📋</span>
        Verification History
      </h2>

      <div className="space-y-6">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            className="relative"
          >
            {/* Timeline line */}
            {index < history.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-600" />
            )}

            <div className="flex gap-6">
              {/* Timeline dot */}
              <div className="relative flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold backdrop-blur-sm ${getStatusColor(item.status)}`}
                >
                  {getStatusIcon(item.status)}
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left side - Main info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-slate-400 font-medium">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400 block">Weight</span>
                        <span className="text-white font-semibold">{item.weight} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Material</span>
                        <span className="text-white font-semibold">{item.materialType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">IPFS Proof</span>
                        <a
                          href={`https://ipfs.io/ipfs/${item.ipfsHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 font-mono text-xs truncate block hover:underline"
                        >
                          {item.ipfsHash}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Payment</span>
                        <span className={`font-semibold ${getPaymentStatusColor(item.paymentStatus)}`}>
                          {item.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Admin notes */}
                    {item.adminNotes && (
                      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                        <p className="text-slate-300 text-sm">
                          <span className="font-medium text-slate-400">Admin Note:</span> {item.adminNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side - Actions */}
                  <div className="flex flex-col gap-2 lg:ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(item)}
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                    >
                      View Details
                    </motion.button>
                    {item.status === 'rejected' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResubmit(item)}
                        disabled={isResubmitting}
                        className="px-4 py-2 bg-emerald-400 text-slate-900 rounded-lg text-sm font-medium hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isResubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            Resubmitting...
                          </span>
                        ) : (
                          'Resubmit'
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-slate-400 text-lg">No verification history yet</p>
          <p className="text-slate-500 text-sm mt-2">Submit your first recycling proof to get started</p>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetails}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  Verification Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeDetails}
                  className="w-10 h-10 rounded-full bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors flex items-center justify-center"
                >
                  ×
                </motion.button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedItem.status)}`}>
                  {getStatusIcon(selectedItem.status)} {selectedItem.status.toUpperCase()}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">Submission Date</label>
                    <p className="text-white font-semibold">
                      {new Date(selectedItem.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">Weight</label>
                    <p className="text-white font-semibold text-lg">{selectedItem.weight} kg</p>
                  </div>
                  
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">Material Type</label>
                    <p className="text-white font-semibold">{selectedItem.materialType}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">IPFS Hash</label>
                    <div className="flex items-center gap-2">
                      <code className="text-blue-400 text-xs bg-slate-900 px-2 py-1 rounded font-mono">
                        {selectedItem.ipfsHash}
                      </code>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigator.clipboard.writeText(selectedItem.ipfsHash)}
                        className="w-8 h-8 rounded bg-slate-700 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        📋
                      </motion.button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">Payment Status</label>
                    <p className={`font-semibold ${getPaymentStatusColor(selectedItem.paymentStatus)}`}>
                      {selectedItem.paymentStatus.toUpperCase()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-slate-400 text-sm block mb-1">Estimated Earnings</label>
                    <p className="text-emerald-400 font-bold text-lg">
                      ₹{(selectedItem.weight * 50).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {selectedItem.adminNotes && (
                <div className="mb-6">
                  <label className="text-slate-400 text-sm block mb-2">Admin Notes</label>
                  <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <p className="text-slate-300">{selectedItem.adminNotes}</p>
                  </div>
                </div>
              )}

              {/* Verification Timeline */}
              <div className="mb-6">
                <label className="text-slate-400 text-sm block mb-3">Verification Timeline</label>
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                    <div>
                      <p className="text-white text-sm">Proof Submitted</p>
                      <p className="text-slate-400 text-xs">{new Date(selectedItem.date).toLocaleString()}</p>
                    </div>
                  </motion.div>
                  
                  {selectedItem.status !== 'pending' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        selectedItem.status === 'approved' ? 'bg-emerald-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <p className="text-white text-sm">
                          {selectedItem.status === 'approved' ? 'Proof Approved' : 'Proof Rejected'}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {new Date(Date.parse(selectedItem.date) + 24 * 60 * 60 * 1000).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  
                  {selectedItem.status === 'approved' && selectedItem.paymentStatus === 'completed' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-3 h-3 bg-blue-400 rounded-full" />
                      <div>
                        <p className="text-white text-sm">Payment Processed</p>
                        <p className="text-slate-400 text-xs">
                          {new Date(Date.parse(selectedItem.date) + 48 * 60 * 60 * 1000).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`https://ipfs.io/ipfs/${selectedItem.ipfsHash}`, '_blank')}
                  className="flex-1 px-4 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  View IPFS Proof
                </motion.button>
                
                {selectedItem.status === 'rejected' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleResubmit(selectedItem)
                      closeDetails()
                    }}
                    className="flex-1 px-4 py-3 bg-emerald-400 text-slate-900 rounded-lg font-medium hover:bg-emerald-500 transition-colors"
                  >
                    Resubmit Proof
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default VerificationHistory
