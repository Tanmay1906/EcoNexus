import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Activity {
  id: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error' | 'system'
  title: string
  description: string
  user?: string
  userRole?: string
  details?: any
  blockchainHash?: string
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000).toISOString(),
      type: 'success',
      title: 'Payment Processed',
      description: 'Payment of ₹45,000 processed for GreenTech Recycling',
      user: 'Payment System',
      userRole: 'system',
      details: { amount: 45000, recipient: 'GreenTech Recycling', paymentId: 'PAY-2024-001' }
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 5000).toISOString(),
      type: 'info',
      title: 'New User Registration',
      description: 'Rajesh Kumar registered as Collector',
      user: 'Rajesh Kumar',
      userRole: 'collector',
      details: { userId: 'USR-2024-123', location: 'Mumbai, Maharashtra' }
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 10000).toISOString(),
      type: 'system',
      title: 'Blockchain Transaction',
      description: 'Credit minted - PC-2024-000456',
      user: 'Mint Console',
      userRole: 'system',
      blockchainHash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      details: { tokenId: 'PC-2024-000456', amount: 500, recycler: 'GreenTech Recycling' }
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 15000).toISOString(),
      type: 'warning',
      title: 'Verification Delay',
      description: 'Material verification taking longer than expected',
      user: 'System Monitor',
      userRole: 'system',
      details: { submissionId: 'SUB-2024-789', delay: '45 minutes', threshold: '30 minutes' }
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 20000).toISOString(),
      type: 'success',
      title: 'Product Approved',
      description: 'Eco-Friendly Laptop Stand approved for marketplace',
      user: 'Marketplace Moderator',
      userRole: 'admin',
      details: { productId: 'PROD-2024-123', upcycler: 'EcoCraft Studio', price: 899 }
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 25000).toISOString(),
      type: 'error',
      title: 'Payment Failed',
      description: 'Payment processing failed for transaction PAY-2024-002',
      user: 'Payment System',
      userRole: 'system',
      details: { error: 'Insufficient balance', amount: 12000, attempt: 3 }
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 30000).toISOString(),
      type: 'info',
      title: 'Dispute Created',
      description: 'New dispute ticket DSP-2024-004 created',
      user: 'Acme Corporation',
      userRole: 'corporate',
      details: { ticketId: 'DSP-2024-004', category: 'quality', priority: 'high' }
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 35000).toISOString(),
      type: 'system',
      title: 'System Backup',
      description: 'Daily system backup completed successfully',
      user: 'System Admin',
      userRole: 'system',
      details: { backupSize: '2.4GB', duration: '3 minutes 45 seconds' }
    }
  ])

  const [filterType, setFilterType] = useState('all')
  const [isLive, setIsLive] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: ['info', 'success', 'warning', 'system'][Math.floor(Math.random() * 4)] as Activity['type'],
        title: 'Random System Event',
        description: 'This is a simulated live activity update',
        user: 'System',
        userRole: 'system'
      }

      setActivities(prev => [newActivity, ...prev].slice(0, 50)) // Keep only last 50 activities
    }, 8000) // Add new activity every 8 seconds

    return () => clearInterval(interval)
  }, [isLive])

  const filteredActivities = activities.filter(activity => {
    if (filterType === 'all') return true
    return activity.type === filterType
  })

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'warning':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'error':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'system':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      case 'system':
        return '⚙️'
      default:
        return 'ℹ️'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)

    if (diffSecs < 60) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const openEtherscan = (hash: string) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank')
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
          <h2 className="text-2xl font-bold text-white mb-2">Activity Feed</h2>
          <p className="text-slate-400">Real-time system activity and event monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
            <span className="text-slate-400 text-sm">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLive
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
            }`}
          >
            {isLive ? '⏸ Pause' : '▶ Resume'}
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Events</p>
              <p className="text-2xl font-bold text-cyan-400">{activities.length}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              📊
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-emerald-400">94.2%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Warnings</p>
              <p className="text-2xl font-bold text-amber-400">
                {activities.filter(a => a.type === 'warning').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⚠️
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Errors</p>
              <p className="text-2xl font-bold text-red-400">
                {activities.filter(a => a.type === 'error').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-2xl">
              ❌
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm font-medium">Filter:</span>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warnings' },
              { value: 'error', label: 'Errors' },
              { value: 'system', label: 'System' }
            ].map((filter) => (
              <motion.button
                key={filter.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === filter.value
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal-style Activity Feed */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-slate-400 text-sm font-mono ml-3">activity-feed.log</span>
            {isLive && (
              <span className="ml-auto text-emerald-400 text-xs font-mono animate-pulse">
                ● LIVE
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 font-mono text-sm max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 pb-4 border-b border-slate-800 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 text-xs">
                    [{formatTimestamp(activity.timestamp)}]
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getActivityColor(activity.type)}`}>
                        <span>{getActivityIcon(activity.type)}</span>
                        <span>{activity.type.toUpperCase()}</span>
                      </span>
                      <span className="text-white font-semibold">{activity.title}</span>
                    </div>
                    
                    <div className="text-slate-300 mb-2">{activity.description}</div>
                    
                    {activity.user && (
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                        <span>User: <span className="text-cyan-400">{activity.user}</span></span>
                        <span>Role: <span className="text-cyan-400">{activity.userRole}</span></span>
                      </div>
                    )}
                    
                    {activity.details && (
                      <div className="text-xs text-slate-500 mb-2">
                        {Object.entries(activity.details).map(([key, value]) => (
                          <span key={key} className="mr-4">
                            {key}: <span className="text-cyan-400">{String(value)}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {activity.blockchainHash && (
                      <div className="flex items-center gap-4 mt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEtherscan(activity.blockchainHash!)}
                          className="text-cyan-400 hover:text-cyan-300 text-xs underline"
                        >
                          🔍 View on Etherscan
                        </motion.button>
                        <div className="text-slate-500 text-xs">
                          HASH: <span className="text-cyan-400 font-mono">{activity.blockchainHash}</span>
                        </div>
                      </div>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedActivity(activity)}
                      className="text-teal-400 hover:text-teal-300 text-xs underline mt-2"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getActivityColor(selectedActivity.type)}`}>
                    <span>{getActivityIcon(selectedActivity.type)}</span>
                    <span>{selectedActivity.type.toUpperCase()}</span>
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedActivity.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedActivity(null)}
                  className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-600"
                >
                  ×
                </motion.button>
              </div>

              {/* Activity Details */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-white ml-2">
                        {new Date(selectedActivity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Description:</span>
                      <span className="text-white ml-2">{selectedActivity.description}</span>
                    </div>
                    {selectedActivity.user && (
                      <>
                        <div>
                          <span className="text-slate-400">User:</span>
                          <span className="text-white ml-2">{selectedActivity.user}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Role:</span>
                          <span className="text-white ml-2">{selectedActivity.userRole}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {selectedActivity.details && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Additional Details</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(selectedActivity.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-slate-400 capitalize">{key}:</span>
                          <span className="text-white ml-2">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedActivity.blockchainHash && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Blockchain Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-400">Transaction Hash:</span>
                        <span className="text-cyan-400 ml-2 font-mono">{selectedActivity.blockchainHash}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openEtherscan(selectedActivity.blockchainHash!)}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
                      >
                        🔍 View on Etherscan
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedActivity(null)}
                  className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ActivityFeed
