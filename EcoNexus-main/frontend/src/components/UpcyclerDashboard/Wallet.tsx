import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  paymentMethod: 'bank' | 'upi'
  status: 'completed' | 'pending' | 'failed'
  date: string
  orderId?: string
}

interface WalletBalance {
  available: number
  pending: number
  totalEarned: number
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<WalletBalance>({
    available: 45680,
    pending: 12500,
    totalEarned: 158920
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      type: 'credit',
      amount: 6250,
      description: 'Payment for Eco-Tote Collection (25 units)',
      paymentMethod: 'bank',
      status: 'completed',
      date: '2024-01-15',
      orderId: 'ORD-001'
    },
    {
      id: 'TXN002',
      type: 'credit',
      amount: 1800,
      description: 'Payment for Recycled Fabric Roll',
      paymentMethod: 'upi',
      status: 'completed',
      date: '2024-01-14',
      orderId: 'ORD-002'
    }
  ])

  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'upi'>('bank')
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
      case 'pending':
        return 'text-amber-400 border-amber-400/50 bg-amber-400/10'
      case 'failed':
        return 'text-red-400 border-red-400/50 bg-red-400/10'
      default:
        return 'text-slate-400 border-slate-400/50 bg-slate-400/10'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    return method === 'bank' ? '🏦' : '📱'
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    if (parseFloat(withdrawAmount) > balance.available) {
      alert('Insufficient balance')
      return
    }

    setIsWithdrawing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add withdrawal transaction
    const newTransaction: Transaction = {
      id: `TXN${Date.now()}`,
      type: 'debit',
      amount: parseFloat(withdrawAmount),
      description: `Withdrawal to ${withdrawMethod === 'bank' ? 'Bank Account' : 'UPI'}`,
      paymentMethod: withdrawMethod,
      status: 'pending',
      date: new Date().toISOString()
    }

    setTransactions(prev => [newTransaction, ...prev])
    setBalance(prev => ({
      ...prev,
      available: prev.available - parseFloat(withdrawAmount),
      pending: prev.pending + parseFloat(withdrawAmount)
    }))

    setIsWithdrawing(false)
    setWithdrawAmount('')
    setShowWithdrawModal(false)
    alert('Withdrawal request submitted successfully!')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl border border-emerald-500/30 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.2), inset 0 0 20px rgba(74, 222, 128, 0.1)'
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-400 text-sm font-medium">Available Balance</span>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹{balance.available.toLocaleString('en-IN')}
            </div>
            <p className="text-slate-400 text-sm">Ready for withdrawal</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl border border-amber-500/30 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.2), inset 0 0 20px rgba(245, 158, 11, 0.1)'
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-amber-400 text-sm font-medium">Pending Balance</span>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹{balance.pending.toLocaleString('en-IN')}
            </div>
            <p className="text-slate-400 text-sm">Processing payments</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.1)'
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-cyan-400 text-sm font-medium">Total Earned</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                💰
              </motion.div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹{balance.totalEarned.toLocaleString('en-IN')}
            </div>
            <p className="text-slate-400 text-sm">All time earnings</p>
          </div>
        </motion.div>
      </div>

      {/* Withdraw Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWithdrawModal(true)}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all relative overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)'
          }}
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">💸</span>
            Withdraw Funds
          </span>
        </motion.button>
      </div>

      {/* Transaction History */}
      <div className="bg-cyber-slate rounded-2xl p-6 border border-cyan-500/30"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(255, 0, 127, 0.1)'
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">💳</span>
          Transaction History
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      transaction.type === 'credit' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}>
                      {transaction.type === 'credit' ? '💰' : '💸'}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}>
                          {transaction.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{transaction.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                          {transaction.paymentMethod === 'bank' ? 'Bank Transfer' : 'UPI'}
                        </span>
                        <span>•</span>
                        <span>{new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                        {transaction.orderId && (
                          <>
                            <span>•</span>
                            <span className="text-cyan-300">{transaction.orderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-cyber-slate rounded-2xl p-6 max-w-md w-full border border-emerald-500/30"
              style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(10, 15, 36, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(74, 222, 128, 0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">💸</span>
                Withdraw Funds
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-emerald-300 font-medium mb-2">
                    Amount (₹{balance.available.toLocaleString('en-IN')} available)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount"
                    max={balance.available}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    style={{
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 0 10px rgba(74, 222, 128, 0.1)'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-medium mb-2">
                    Withdrawal Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWithdrawMethod('bank')}
                      className={`p-3 rounded-lg border transition-all ${
                        withdrawMethod === 'bank'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-emerald-500/50'
                      }`}
                    >
                      🏦 Bank Transfer
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setWithdrawMethod('upi')}
                      className={`p-3 rounded-lg border transition-all ${
                        withdrawMethod === 'upi'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-emerald-500/50'
                      }`}
                    >
                      📱 UPI Transfer
                    </motion.button>
                  </div>
                </div>

                <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/30">
                  <p className="text-amber-300 text-sm">
                    <span className="font-semibold">Note:</span> Withdrawals typically take 2-3 business days to process. Bank transfers may incur a small processing fee.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isWithdrawing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Withdraw'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Wallet
