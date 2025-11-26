import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Payment {
  id: string
  personName: string
  role: 'collector' | 'recycler' | 'upcycler'
  workDescription: string
  amount: number
  paymentMode: 'bank' | 'upi' | 'crypto'
  accountInfo: string
  kycStatus: 'verified' | 'pending' | 'rejected'
  status: 'pending' | 'approved' | 'paid'
  submittedDate: string
  utrNumber?: string
  workCompleted: number
  workUnit: 'kg' | 'products'
}

const PaymentsCenter: React.FC = () => {
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      personName: 'Rajesh Kumar',
      role: 'collector',
      workDescription: 'Plastic collection from Mumbai area',
      amount: 12500,
      paymentMode: 'bank',
      accountInfo: 'HDFC Bank ****1234',
      kycStatus: 'verified',
      status: 'pending',
      submittedDate: '2024-01-29T10:30:00Z',
      workCompleted: 125,
      workUnit: 'kg'
    },
    {
      id: '2',
      personName: 'GreenTech Recycling',
      role: 'recycler',
      workDescription: 'Processing of PET bottles batch #001',
      amount: 45000,
      paymentMode: 'upi',
      accountInfo: 'greentech@upi',
      kycStatus: 'verified',
      status: 'approved',
      submittedDate: '2024-01-28T14:15:00Z',
      workCompleted: 500,
      workUnit: 'kg'
    },
    {
      id: '3',
      personName: 'EcoCraft Studio',
      role: 'upcycler',
      workDescription: 'Upcycled products for marketplace',
      amount: 28000,
      paymentMode: 'crypto',
      accountInfo: '0x742d...44e',
      kycStatus: 'verified',
      status: 'paid',
      submittedDate: '2024-01-27T16:45:00Z',
      utrNumber: 'TXN-2024-0127-001',
      workCompleted: 45,
      workUnit: 'products'
    },
    {
      id: '4',
      personName: 'Priya Sharma',
      role: 'collector',
      workDescription: 'Plastic collection from Delhi NCR',
      amount: 8900,
      paymentMode: 'bank',
      accountInfo: 'ICICI Bank ****5678',
      kycStatus: 'pending',
      status: 'pending',
      submittedDate: '2024-01-29T11:00:00Z',
      workCompleted: 89,
      workUnit: 'kg'
    },
    {
      id: '5',
      personName: 'Circular Solutions',
      role: 'recycler',
      workDescription: 'HDPE processing batch #002',
      amount: 67000,
      paymentMode: 'bank',
      accountInfo: 'SBI Bank ****9012',
      kycStatus: 'verified',
      status: 'approved',
      submittedDate: '2024-01-26T09:30:00Z',
      workCompleted: 750,
      workUnit: 'kg'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [filterKYC, setFilterKYC] = useState('all')
  const [showUTRModal, setShowUTRModal] = useState<string | null>(null)
  const [utrInput, setUtrInput] = useState('')

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.workDescription.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
    const matchesRole = filterRole === 'all' || payment.role === filterRole
    const matchesKYC = filterKYC === 'all' || payment.kycStatus === filterKYC
    
    return matchesSearch && matchesStatus && matchesRole && matchesKYC
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'approved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'paid':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'collector':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'recycler':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'upcycler':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
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
    alert(`Approving payment ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting payment ${id}`)
  }

  const handleMarkPaid = (id: string) => {
    setShowUTRModal(id)
  }

  const confirmPayment = (id: string) => {
    alert(`Marking payment ${id} as paid with UTR: ${utrInput}`)
    setShowUTRModal(null)
    setUtrInput('')
  }

  const getPaymentModeIcon = (mode: string) => {
    switch (mode) {
      case 'bank':
        return '🏦'
      case 'upi':
        return '📱'
      case 'crypto':
        return '₿'
      default:
        return '💳'
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
          <h2 className="text-2xl font-bold text-white mb-2">Payments Center</h2>
          <p className="text-slate-400">Process and approve payments for all ecosystem participants</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Total Pending</p>
            <p className="text-2xl font-bold text-amber-400">
              ₹{payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-amber-400">
                {payments.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Approved</p>
              <p className="text-2xl font-bold text-blue-400">
                {payments.filter(p => p.status === 'approved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Paid Today</p>
              <p className="text-2xl font-bold text-emerald-400">
                {payments.filter(p => p.status === 'paid').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-cyan-400">
                ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              💵
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
              placeholder="Search payments..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="collector">Collectors</option>
              <option value="recycler">Recyclers</option>
              <option value="upcycler">Upcyclers</option>
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
                setFilterRole('all')
                setFilterKYC('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white mb-2">Payment Queue</h3>
          <p className="text-slate-400 text-sm">All payment requests requiring admin approval</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Person
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Work Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  KYC
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredPayments.map((payment, index) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{payment.personName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(payment.role)}`}>
                          {payment.role.charAt(0).toUpperCase() + payment.role.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getKYCColor(payment.kycStatus)}`}>
                          KYC: {payment.kycStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm">{payment.workDescription}</p>
                      <p className="text-slate-400 text-xs mt-1">
                        {payment.workCompleted} {payment.workUnit} completed
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-bold">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-slate-400 text-xs">{payment.accountInfo}</p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPaymentModeIcon(payment.paymentMode)}</span>
                      <span className="text-white capitalize">{payment.paymentMode}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getKYCColor(payment.kycStatus)}`}>
                      {payment.kycStatus.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(payment.status)}`}>
                      {payment.status === 'pending' && '⏳'}
                      {payment.status === 'approved' && '✅'}
                      {payment.status === 'paid' && '💰'}
                      <span>{payment.status.toUpperCase()}</span>
                    </span>
                    {payment.utrNumber && (
                      <p className="text-cyan-400 text-xs mt-1">UTR: {payment.utrNumber}</p>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {payment.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(payment.id)}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(payment.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                          >
                            Reject
                          </motion.button>
                        </>
                      )}
                      
                      {payment.status === 'approved' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMarkPaid(payment.id)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                        >
                          Mark Paid
                        </motion.button>
                      )}
                      
                      {payment.status === 'paid' && (
                        <span className="text-emerald-400 text-sm font-medium">
                          Completed ✓
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UTR Modal */}
      {showUTRModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUTRModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Mark Payment as Paid</h3>
            <p className="text-slate-400 mb-6">Enter the UTR (Transaction Reference Number) to confirm this payment.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">UTR Number</label>
              <input
                type="text"
                value={utrInput}
                onChange={(e) => setUtrInput(e.target.value)}
                placeholder="Enter UTR number"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => confirmPayment(showUTRModal)}
                disabled={!utrInput.trim()}
                className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowUTRModal(null)
                  setUtrInput('')
                }}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PaymentsCenter
