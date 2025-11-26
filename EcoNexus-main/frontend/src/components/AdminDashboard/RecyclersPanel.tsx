import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Recycler {
  id: string
  name: string
  email: string
  phone: string
  location: string
  registeredDate: string
  totalProcessed: number
  status: 'active' | 'pending' | 'suspended' | 'flagged'
  verificationStats: {
    verified: number
    rejected: number
    pending: number
  }
  paymentHistory: number
  rating: number
  certifications: string[]
}

const RecyclersPanel: React.FC = () => {
  const [recyclers] = useState<Recycler[]>([
    {
      id: '1',
      name: 'GreenTech Recycling',
      email: 'contact@greentech.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      registeredDate: '2024-01-10',
      totalProcessed: 45000,
      status: 'active',
      verificationStats: {
        verified: 156,
        rejected: 12,
        pending: 8
      },
      paymentHistory: 125000,
      rating: 4.9,
      certifications: ['ISO 14001', 'EPR Certified']
    },
    {
      id: '2',
      name: 'EcoProcess Industries',
      email: 'info@ecoprocess.com',
      phone: '+91 87654 32109',
      location: 'Delhi, NCR',
      registeredDate: '2024-01-15',
      totalProcessed: 32000,
      status: 'pending',
      verificationStats: {
        verified: 89,
        rejected: 8,
        pending: 5
      },
      paymentHistory: 0,
      rating: 4.6,
      certifications: ['ISO 9001']
    },
    {
      id: '3',
      name: 'Circular Solutions',
      email: 'hello@circular.com',
      phone: '+91 76543 21098',
      location: 'Bangalore, Karnataka',
      registeredDate: '2024-01-05',
      totalProcessed: 58000,
      status: 'active',
      verificationStats: {
        verified: 234,
        rejected: 15,
        pending: 12
      },
      paymentHistory: 189000,
      rating: 4.8,
      certifications: ['ISO 14001', 'EPR Certified', 'Green Seal']
    },
    {
      id: '4',
      name: 'PlasticRecover Ltd',
      email: 'operations@plasticrecover.com',
      phone: '+91 65432 10987',
      location: 'Chennai, Tamil Nadu',
      registeredDate: '2024-01-20',
      totalProcessed: 15000,
      status: 'flagged',
      verificationStats: {
        verified: 45,
        rejected: 18,
        pending: 3
      },
      paymentHistory: 45000,
      rating: 3.5,
      certifications: ['ISO 9001']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCertification, setFilterCertification] = useState('all')

  const filteredRecyclers = recyclers.filter(recycler => {
    const matchesSearch = recycler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recycler.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recycler.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || recycler.status === filterStatus
    const matchesCert = filterCertification === 'all' || 
                       recycler.certifications.includes(filterCertification)
    
    return matchesSearch && matchesStatus && matchesCert
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

  const handleApprove = (id: string) => {
    alert(`Approving recycler ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting recycler ${id}`)
  }

  const handleSuspend = (id: string) => {
    alert(`Suspending recycler ${id}`)
  }

  const handleFlag = (id: string) => {
    alert(`Flagging recycler ${id}`)
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
          <h2 className="text-2xl font-bold text-white mb-2">Recyclers Management</h2>
          <p className="text-slate-400">Monitor and manage all plastic recycling operations</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {recyclers.length} Total Recyclers
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
              placeholder="Search recyclers..."
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Certification</label>
            <select
              value={filterCertification}
              onChange={(e) => setFilterCertification(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Certifications</option>
              <option value="ISO 14001">ISO 14001</option>
              <option value="ISO 9001">ISO 9001</option>
              <option value="EPR Certified">EPR Certified</option>
              <option value="Green Seal">Green Seal</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterCertification('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Recyclers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecyclers.map((recycler, index) => (
          <motion.div
            key={recycler.id}
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
                <h3 className="text-lg font-semibold text-white mb-1">{recycler.name}</h3>
                <p className="text-slate-400 text-sm">{recycler.email}</p>
                <p className="text-slate-400 text-sm">{recycler.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(recycler.status)}`}>
                  {recycler.status.toUpperCase()}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-white text-sm">{recycler.rating}</span>
                </div>
              </div>
            </div>

            {/* Verification Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-emerald-400 text-lg font-bold">{recycler.verificationStats.verified}</p>
                <p className="text-slate-400 text-xs">Verified</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-amber-400 text-lg font-bold">{recycler.verificationStats.pending}</p>
                <p className="text-slate-400 text-xs">Pending</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-red-400 text-lg font-bold">{recycler.verificationStats.rejected}</p>
                <p className="text-slate-400 text-xs">Rejected</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Total Processed</p>
                <p className="text-white font-bold">{recycler.totalProcessed.toLocaleString()} kg</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Payment History</p>
                <p className="text-white font-bold">₹{recycler.paymentHistory.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{recycler.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Registered:</span>
                <span className="text-white">{new Date(recycler.registeredDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Certifications:</span>
                <div className="flex gap-1">
                  {recycler.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full border border-teal-500/30">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {recycler.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(recycler.id)}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(recycler.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </motion.button>
                </>
              )}
              
              {recycler.status === 'active' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuspend(recycler.id)}
                    className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Suspend
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFlag(recycler.id)}
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

      {filteredRecyclers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No recyclers found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </motion.div>
  )
}

export default RecyclersPanel
