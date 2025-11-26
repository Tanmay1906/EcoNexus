import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Corporate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  registeredDate: string
  industry: string
  status: 'active' | 'pending' | 'suspended' | 'flagged'
  kycStatus: 'verified' | 'pending' | 'rejected'
  esgScore: number
  totalCredits: number
  purchaseHistory: number
  disputeCount: number
  walletConnected: boolean
  eprCompliance: number
}

const CorporatesPanel: React.FC = () => {
  const [corporates] = useState<Corporate[]>([
    {
      id: '1',
      name: 'Acme Corporation Ltd',
      email: 'csr@acme.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      registeredDate: '2024-01-10',
      industry: 'Manufacturing',
      status: 'active',
      kycStatus: 'verified',
      esgScore: 87,
      totalCredits: 12500,
      purchaseHistory: 850000,
      disputeCount: 0,
      walletConnected: true,
      eprCompliance: 94
    },
    {
      id: '2',
      name: 'Global Industries Inc',
      email: 'sustainability@global.com',
      phone: '+91 87654 32109',
      location: 'Bangalore, Karnataka',
      registeredDate: '2024-01-15',
      industry: 'Technology',
      status: 'pending',
      kycStatus: 'pending',
      esgScore: 72,
      totalCredits: 0,
      purchaseHistory: 0,
      disputeCount: 0,
      walletConnected: false,
      eprCompliance: 65
    },
    {
      id: '3',
      name: 'EcoSolutions Pvt Ltd',
      email: 'green@ecosolutions.com',
      phone: '+91 76543 21098',
      location: 'Delhi, NCR',
      registeredDate: '2024-01-05',
      industry: 'Consulting',
      status: 'active',
      kycStatus: 'verified',
      esgScore: 91,
      totalCredits: 18900,
      purchaseHistory: 1250000,
      disputeCount: 1,
      walletConnected: true,
      eprCompliance: 98
    },
    {
      id: '4',
      name: 'TechCorp Systems',
      email: 'esg@techcorp.com',
      phone: '+91 65432 10987',
      location: 'Chennai, Tamil Nadu',
      registeredDate: '2024-01-20',
      industry: 'Software',
      status: 'flagged',
      kycStatus: 'rejected',
      esgScore: 45,
      totalCredits: 3400,
      purchaseHistory: 180000,
      disputeCount: 3,
      walletConnected: false,
      eprCompliance: 52
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterKYC, setFilterKYC] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')

  const filteredCorporates = corporates.filter(corporate => {
    const matchesSearch = corporate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         corporate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         corporate.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || corporate.status === filterStatus
    const matchesKYC = filterKYC === 'all' || corporate.kycStatus === filterKYC
    const matchesIndustry = filterIndustry === 'all' || corporate.industry === filterIndustry
    
    return matchesSearch && matchesStatus && matchesKYC && matchesIndustry
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

  const getESGColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getEPRColor = (compliance: number) => {
    if (compliance >= 90) return 'text-emerald-400'
    if (compliance >= 70) return 'text-amber-400'
    return 'text-red-400'
  }

  const handleApprove = (id: string) => {
    alert(`Approving corporate ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting corporate ${id}`)
  }

  const handleSuspend = (id: string) => {
    alert(`Suspending corporate ${id}`)
  }

  const handleFlag = (id: string) => {
    alert(`Flagging corporate ${id}`)
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
          <h2 className="text-2xl font-bold text-white mb-2">Corporates Management</h2>
          <p className="text-slate-400">Monitor and manage all corporate clients and ESG compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {corporates.length} Total Corporates
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search corporates..."
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
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Industries</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Technology">Technology</option>
              <option value="Consulting">Consulting</option>
              <option value="Software">Software</option>
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
                setFilterIndustry('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Corporates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCorporates.map((corporate, index) => (
          <motion.div
            key={corporate.id}
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
                <h3 className="text-lg font-semibold text-white mb-1">{corporate.name}</h3>
                <p className="text-slate-400 text-sm">{corporate.email}</p>
                <p className="text-slate-400 text-sm">{corporate.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(corporate.status)}`}>
                  {corporate.status.toUpperCase()}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getKYCColor(corporate.kycStatus)}`}>
                  KYC: {corporate.kycStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* ESG & EPR Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">ESG Score</p>
                <p className={`text-lg font-bold ${getESGColor(corporate.esgScore)}`}>{corporate.esgScore}/100</p>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-full rounded-full ${
                      corporate.esgScore >= 80 ? 'bg-emerald-500' : 
                      corporate.esgScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${corporate.esgScore}%` }}
                  />
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">EPR Compliance</p>
                <p className={`text-lg font-bold ${getEPRColor(corporate.eprCompliance)}`}>{corporate.eprCompliance}%</p>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div 
                    className={`h-full rounded-full ${
                      corporate.eprCompliance >= 90 ? 'bg-emerald-500' : 
                      corporate.eprCompliance >= 70 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${corporate.eprCompliance}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Total Credits</p>
                <p className="text-white font-bold">{corporate.totalCredits.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Purchase History</p>
                <p className="text-white font-bold">₹{corporate.purchaseHistory.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Industry:</span>
                <span className="text-white">{corporate.industry}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{corporate.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Registered:</span>
                <span className="text-white">{new Date(corporate.registeredDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Wallet:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  corporate.walletConnected 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {corporate.walletConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Disputes:</span>
                <span className={`font-semibold ${corporate.disputeCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {corporate.disputeCount} {corporate.disputeCount === 1 ? 'case' : 'cases'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {corporate.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(corporate.id)}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(corporate.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </motion.button>
                </>
              )}
              
              {corporate.status === 'active' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuspend(corporate.id)}
                    className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Suspend
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFlag(corporate.id)}
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

      {filteredCorporates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No corporates found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </motion.div>
  )
}

export default CorporatesPanel
