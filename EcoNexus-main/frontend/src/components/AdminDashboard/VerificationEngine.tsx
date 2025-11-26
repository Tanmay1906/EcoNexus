import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VerificationItem {
  id: string
  type: 'collector' | 'recycler' | 'upcycler'
  userName: string
  role: string
  dateSubmitted: string
  images: string[]
  weight?: number
  materialType?: string
  gpsLocation?: string
  ipfsHash: string
  blockchainMetadata?: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'audit'
}

const VerificationEngine: React.FC = () => {
  const [verifications] = useState<VerificationItem[]>([
    {
      id: '1',
      type: 'collector',
      userName: 'Rajesh Kumar',
      role: 'Collector',
      dateSubmitted: '2024-01-29T10:30:00Z',
      images: ['https://picsum.photos/seed/collector1/400/300', 'https://picsum.photos/seed/collector2/400/300'],
      weight: 125,
      materialType: 'PET Bottles',
      gpsLocation: '19.0760° N, 72.8777° E',
      ipfsHash: 'QmXxx...123',
      reason: 'Daily plastic collection from residential area',
      status: 'pending'
    },
    {
      id: '2',
      type: 'recycler',
      userName: 'GreenTech Recycling',
      role: 'Recycler',
      dateSubmitted: '2024-01-29T14:15:00Z',
      images: ['https://picsum.photos/seed/recycler1/400/300'],
      weight: 500,
      materialType: 'Mixed Plastics',
      gpsLocation: '28.6139° N, 77.2090° E',
      ipfsHash: 'QmYyy...456',
      blockchainMetadata: 'Batch #2024-REC-001',
      reason: 'Processing batch verification',
      status: 'pending'
    },
    {
      id: '3',
      type: 'upcycler',
      userName: 'EcoCraft Studio',
      role: 'Upcycler',
      dateSubmitted: '2024-01-29T16:45:00Z',
      images: ['https://picsum.photos/seed/upcycler1/400/300', 'https://picsum.photos/seed/upcycler2/400/300', 'https://picsum.photos/seed/upcycler3/400/300'],
      materialType: 'Recycled PET',
      ipfsHash: 'QmZzz...789',
      reason: 'New product submission for marketplace approval',
      status: 'pending'
    }
  ])

  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null)
  const [activeTab, setActiveTab] = useState<'collector' | 'recycler' | 'upcycler'>('collector')

  const filteredVerifications = verifications.filter(v => v.type === activeTab)

  const handleApprove = (id: string) => {
    alert(`Approving verification ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting verification ${id}`)
  }

  const handleRequestInfo = (id: string) => {
    alert(`Requesting more info for verification ${id}`)
  }

  const handleMarkForAudit = (id: string) => {
    alert(`Marking verification ${id} for audit`)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'collector':
        return 'from-blue-500 to-cyan-500'
      case 'recycler':
        return 'from-emerald-500 to-green-500'
      case 'upcycler':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-slate-500 to-slate-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'collector':
        return '👥'
      case 'recycler':
        return '♻️'
      case 'upcycler':
        return '🎨'
      default:
        return '📋'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Verification Engine</h2>
          <p className="text-slate-400">Review and approve submissions from all ecosystem participants</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {verifications.filter(v => v.status === 'pending').length} Pending
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['collector', 'recycler', 'upcycler'] as const).map(tab => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-600'
            }`}
          >
            <span className="mr-2">{getTypeIcon(tab)}</span>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}s
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
              {verifications.filter(v => v.type === tab).length}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Verification Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVerifications.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
            }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className={`h-2 bg-gradient-to-r ${getTypeColor(item.type)}`} />
            
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.userName}</h3>
                  <p className="text-slate-400 text-sm">{item.role}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTypeColor(item.type)} flex items-center justify-center text-white font-bold shadow-lg`}>
                  {getTypeIcon(item.type)}
                </div>
              </div>

              {/* Images Preview */}
              <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto">
                  {item.images.slice(0, 3).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Proof ${imgIndex + 1}`}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-slate-600"
                    />
                  ))}
                  {item.images.length > 3 && (
                    <div className="w-20 h-20 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-medium border border-slate-600">
                      +{item.images.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Submitted:</span>
                  <span className="text-white">{new Date(item.dateSubmitted).toLocaleString()}</span>
                </div>
                {item.weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Weight:</span>
                    <span className="text-white">{item.weight} kg</span>
                  </div>
                )}
                {item.materialType && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Material:</span>
                    <span className="text-white">{item.materialType}</span>
                  </div>
                )}
                {item.gpsLocation && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white text-xs">{item.gpsLocation}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">IPFS:</span>
                  <span className="text-cyan-400 text-xs font-mono">{item.ipfsHash}</span>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <p className="text-slate-400 text-sm mb-1">Reason:</p>
                <p className="text-white text-sm">{item.reason}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedItem(item)}
                    className="flex-1 px-3 py-2 bg-teal-500/20 text-teal-400 rounded-lg font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Approve
                  </motion.button>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(item.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRequestInfo(item.id)}
                    className="flex-1 px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                  >
                    Request Info
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMarkForAudit(item.id)}
                    className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Audit
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Verification Details</h3>
                  <p className="text-slate-400">{selectedItem.userName} - {selectedItem.role}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-600"
                >
                  ×
                </motion.button>
              </div>

              {/* Images Gallery */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Submitted Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedItem.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Proof ${index + 1}`}
                      className="w-full h-48 rounded-lg object-cover border border-slate-600"
                    />
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Submission Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date Submitted:</span>
                      <span className="text-white">{new Date(selectedItem.dateSubmitted).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-white capitalize">{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-amber-400 capitalize">{selectedItem.status}</span>
                    </div>
                    {selectedItem.weight && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Weight:</span>
                        <span className="text-white">{selectedItem.weight} kg</span>
                      </div>
                    )}
                    {selectedItem.materialType && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Material Type:</span>
                        <span className="text-white">{selectedItem.materialType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Blockchain Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">IPFS Hash:</span>
                      <span className="text-cyan-400 text-xs font-mono">{selectedItem.ipfsHash}</span>
                    </div>
                    {selectedItem.blockchainMetadata && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Metadata:</span>
                        <span className="text-white text-xs">{selectedItem.blockchainMetadata}</span>
                      </div>
                    )}
                    {selectedItem.gpsLocation && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">GPS Location:</span>
                        <span className="text-white text-xs">{selectedItem.gpsLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Submission Reason</h4>
                <p className="text-slate-300 bg-slate-800/50 rounded-lg p-4">{selectedItem.reason}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleApprove(selectedItem.id)
                    setSelectedItem(null)
                  }}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Approve Verification
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleReject(selectedItem.id)
                    setSelectedItem(null)
                  }}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Reject Submission
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VerificationEngine
