import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Collector {
  id: string
  name: string
  email: string
  phone: string
  location: string
  registeredDate: string
  totalCollected: number
  status: 'active' | 'pending' | 'suspended' | 'flagged'
  kycStatus: 'verified' | 'pending' | 'rejected'
  lastSubmission: string
  paymentHistory: number
  rating: number
}

const CollectorsPanel: React.FC = () => {
  const [collectors] = useState<Collector[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      registeredDate: '2024-01-15',
      totalCollected: 12500,
      status: 'active',
      kycStatus: 'verified',
      lastSubmission: '2024-01-28',
      paymentHistory: 45000,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      location: 'Delhi, NCR',
      registeredDate: '2024-01-20',
      totalCollected: 8900,
      status: 'pending',
      kycStatus: 'pending',
      lastSubmission: '2024-01-27',
      paymentHistory: 0,
      rating: 4.5
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      location: 'Ahmedabad, Gujarat',
      registeredDate: '2024-01-10',
      totalCollected: 15600,
      status: 'active',
      kycStatus: 'verified',
      lastSubmission: '2024-01-29',
      paymentHistory: 62000,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 65432 10987',
      location: 'Bangalore, Karnataka',
      registeredDate: '2024-01-25',
      totalCollected: 3400,
      status: 'flagged',
      kycStatus: 'rejected',
      lastSubmission: '2024-01-26',
      paymentHistory: 12000,
      rating: 3.2
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterKYC, setFilterKYC] = useState('all')

  const filteredCollectors = collectors.filter(collector => {
    const matchesSearch = collector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collector.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collector.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || collector.status === filterStatus
    const matchesKYC = filterKYC === 'all' || collector.kycStatus === filterKYC
    
    return matchesSearch && matchesStatus && matchesKYC
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'flagged':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getKYCColor = (kycStatus: string) => {
    switch (kycStatus) {
      case 'verified':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const handleApprove = (id: string) => {
    alert(`Approving collector ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting collector ${id}`)
  }

  const handleSuspend = (id: string) => {
    alert(`Suspending collector ${id}`)
  }

  const handleFlag = (id: string) => {
    alert(`Flagging collector ${id}`)
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
          <h2 className="text-2xl font-bold text-white mb-2">Collectors Management</h2>
          <p className="text-slate-400">Monitor and manage all plastic collectors in the ecosystem</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {collectors.length} Total Collectors
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search collectors..."
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">KYC Status</label>
            <select
              value={filterKYC}
              onChange={(e) => setFilterKYC(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All KYC</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterKYC('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Collectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCollectors.map((collector, index) => (
          <motion.div
            key={collector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
            }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{collector.name}</h3>
                <p className="text-slate-400 text-sm">{collector.email}</p>
                <p className="text-slate-400 text-sm">{collector.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(collector.status)}`}>
                  {collector.status.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getKYCColor(collector.kycStatus)}`}>
                  KYC: {collector.kycStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Total Collected</p>
                <p className="text-white font-bold">{collector.totalCollected.toLocaleString()} kg</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Payment History</p>
                <p className="text-white font-bold">₹{collector.paymentHistory.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{collector.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Registered:</span>
                <span className="text-white">{new Date(collector.registeredDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Submission:</span>
                <span className="text-white">{new Date(collector.lastSubmission).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Rating:</span>
                <span className="text-yellow-400">⭐ {collector.rating}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {collector.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(collector.id)}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(collector.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </motion.button>
                </>
              )}
              
              {collector.status === 'active' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuspend(collector.id)}
                    className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Suspend
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFlag(collector.id)}
                    className="flex-1 px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                  >
                    Flag
                  </motion.button>
                </>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-2 bg-teal-500/20 text-teal-400 rounded-lg font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCollectors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No collectors found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </motion.div>
  )
}

export default CollectorsPanel
