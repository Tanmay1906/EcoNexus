import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Dispute {
  id: string
  ticketNumber: string
  title: string
  description: string
  category: 'payment' | 'verification' | 'quality' | 'fraud' | 'account'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  submittedBy: string
  submittedByRole: 'collector' | 'recycler' | 'upcycler' | 'corporate'
  submittedDate: string
  assignedTo?: string
  lastUpdated: string
  attachments: string[]
  responses: Array<{
    id: string
    author: string
    role: string
    message: string
    timestamp: string
    isInternal?: boolean
  }>
}

const DisputeCenter: React.FC = () => {
  const [disputes] = useState<Dispute[]>([
    {
      id: '1',
      ticketNumber: 'DSP-2024-001',
      title: 'Payment not received for January collection',
      description: 'I submitted my plastic collection on January 15th but haven\'t received payment yet. The verification was approved but payment status is still pending.',
      category: 'payment',
      priority: 'high',
      status: 'open',
      submittedBy: 'Rajesh Kumar',
      submittedByRole: 'collector',
      submittedDate: '2024-01-28T10:30:00Z',
      lastUpdated: '2024-01-28T10:30:00Z',
      attachments: ['receipt.pdf', 'verification.png'],
      responses: []
    },
    {
      id: '2',
      ticketNumber: 'DSP-2024-002',
      title: 'Product quality dispute - Laptop Stand',
      description: 'The laptop stand I received has cracks and doesn\'t match the quality shown in the marketplace images. Requesting refund or replacement.',
      category: 'quality',
      priority: 'medium',
      status: 'investigating',
      submittedBy: 'Acme Corporation',
      submittedByRole: 'corporate',
      submittedDate: '2024-01-27T14:15:00Z',
      lastUpdated: '2024-01-28T09:45:00Z',
      assignedTo: 'Admin Team',
      attachments: ['product_photo1.jpg', 'product_photo2.jpg'],
      responses: [
        {
          id: '1',
          author: 'Support Team',
          role: 'admin',
          message: 'We are investigating this quality issue. Please provide more details about the defects.',
          timestamp: '2024-01-28T09:45:00Z',
          isInternal: false
        }
      ]
    },
    {
      id: '3',
      ticketNumber: 'DSP-2024-003',
      title: 'Verification rejected without proper reason',
      description: 'My material verification was rejected with generic reason. I need specific feedback to improve my process.',
      category: 'verification',
      priority: 'medium',
      status: 'resolved',
      submittedBy: 'GreenTech Recycling',
      submittedByRole: 'recycler',
      submittedDate: '2024-01-26T16:20:00Z',
      lastUpdated: '2024-01-27T11:30:00Z',
      assignedTo: 'Verification Team',
      attachments: ['material_batch.pdf'],
      responses: [
        {
          id: '1',
          author: 'Verification Team',
          role: 'admin',
          message: 'The rejection was due to contamination in the material batch. We\'ve provided detailed feedback.',
          timestamp: '2024-01-27T11:30:00Z',
          isInternal: false
        }
      ]
    },
    {
      id: '4',
      ticketNumber: 'DSP-2024-004',
      title: 'Suspicious activity detected',
      description: 'Noticed multiple accounts with similar names submitting unusually high volumes. Possible fraudulent activity.',
      category: 'fraud',
      priority: 'critical',
      status: 'investigating',
      submittedBy: 'System Alert',
      submittedByRole: 'corporate',
      submittedDate: '2024-01-29T08:00:00Z',
      lastUpdated: '2024-01-29T08:00:00Z',
      assignedTo: 'Security Team',
      attachments: ['suspicious_accounts.csv'],
      responses: []
    }
  ])

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || dispute.status === filterStatus
    const matchesCategory = filterCategory === 'all' || dispute.category === filterCategory
    const matchesPriority = filterPriority === 'all' || dispute.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'investigating':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'resolved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'closed':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'low':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment':
        return '💰'
      case 'verification':
        return '✅'
      case 'quality':
        return '🔍'
      case 'fraud':
        return '⚠️'
      case 'account':
        return '👤'
      default:
        return '📋'
    }
  }

  const handleAssign = (id: string) => {
    alert(`Assigning dispute ${id} to admin team`)
  }

  const handleResolve = (id: string) => {
    alert(`Resolving dispute ${id}`)
  }

  const handleEscalate = (id: string) => {
    alert(`Escalating dispute ${id}`)
  }

  const handleAddResponse = (id: string) => {
    alert(`Adding response to dispute ${id}`)
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
          <h2 className="text-2xl font-bold text-white mb-2">Dispute Center</h2>
          <p className="text-slate-400">Handle user disputes and resolution cases efficiently</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Open Tickets</p>
            <p className="text-2xl font-bold text-amber-400">
              {disputes.filter(d => d.status === 'open').length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">Critical Issues</p>
            <p className="text-2xl font-bold text-red-400">
              {disputes.filter(d => d.priority === 'critical').length}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Open</p>
              <p className="text-2xl font-bold text-amber-400">
                {disputes.filter(d => d.status === 'open').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-2xl">
              📂
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Investigating</p>
              <p className="text-2xl font-bold text-blue-400">
                {disputes.filter(d => d.status === 'investigating').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
              🔍
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Resolved</p>
              <p className="text-2xl font-bold text-emerald-400">
                {disputes.filter(d => d.status === 'resolved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-cyan-400">2.5d</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⏱️
            </div>
          </div>
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
              placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="payment">Payment</option>
              <option value="verification">Verification</option>
              <option value="quality">Quality</option>
              <option value="fraud">Fraud</option>
              <option value="account">Account</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterCategory('all')
                setFilterPriority('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Dispute Tickets */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute, index) => (
          <motion.div
            key={dispute.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.01,
              boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
            }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{dispute.title}</h3>
                  <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full border border-teal-500/30">
                    {dispute.ticketNumber}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dispute.status)}`}>
                    {dispute.status.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(dispute.priority)}`}>
                    {dispute.priority.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border bg-slate-700/50 text-slate-300 border-slate-600">
                    {getCategoryIcon(dispute.category)} {dispute.category.charAt(0).toUpperCase() + dispute.category.slice(1)}
                  </span>
                </div>
                
                <p className="text-slate-300 text-sm mb-3">{dispute.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>By: <span className="text-white">{dispute.submittedBy}</span></span>
                  <span>Role: <span className="text-white capitalize">{dispute.submittedByRole}</span></span>
                  <span>Submitted: <span className="text-white">{new Date(dispute.submittedDate).toLocaleDateString()}</span></span>
                  {dispute.assignedTo && (
                    <span>Assigned: <span className="text-white">{dispute.assignedTo}</span></span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                {dispute.attachments.length > 0 && (
                  <span className="text-slate-400 text-sm">
                    📎 {dispute.attachments.length} attachments
                  </span>
                )}
                {dispute.responses.length > 0 && (
                  <span className="text-slate-400 text-sm">
                    💬 {dispute.responses.length} responses
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDispute(dispute)}
                className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
              >
                View Details
              </motion.button>
              
              {dispute.status === 'open' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAssign(dispute.id)}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    Assign
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEscalate(dispute.id)}
                    className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Escalate
                  </motion.button>
                </>
              )}
              
              {dispute.status === 'investigating' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddResponse(dispute.id)}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
                  >
                    Add Response
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResolve(dispute.id)}
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Resolve
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredDisputes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No disputes found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDispute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDispute(null)}
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
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedDispute.title}</h3>
                  <p className="text-slate-400">{selectedDispute.ticketNumber}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDispute(null)}
                  className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-600"
                >
                  ×
                </motion.button>
              </div>

              {/* Dispute Details */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Dispute Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Category:</span>
                      <span className="text-white ml-2">{selectedDispute.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Priority:</span>
                      <span className="text-white ml-2 capitalize">{selectedDispute.priority}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <span className="text-white ml-2 capitalize">{selectedDispute.status}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Submitted By:</span>
                      <span className="text-white ml-2">{selectedDispute.submittedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Description</h4>
                  <p className="text-slate-300">{selectedDispute.description}</p>
                </div>

                {selectedDispute.attachments.length > 0 && (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {selectedDispute.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 text-cyan-400 text-sm">
                          📎 {attachment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Response History</h4>
                  <div className="space-y-3">
                    {selectedDispute.responses.map((response) => (
                      <div key={response.id} className="border-l-2 border-cyan-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{response.author}</span>
                          <span className="text-slate-400 text-sm">({response.role})</span>
                          <span className="text-slate-400 text-xs">
                            {new Date(response.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">{response.message}</p>
                      </div>
                    ))}
                    {selectedDispute.responses.length === 0 && (
                      <p className="text-slate-400 text-sm">No responses yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddResponse(selectedDispute.id)}
                  className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                >
                  Add Response
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDispute(null)}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
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

export default DisputeCenter
