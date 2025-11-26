import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface BlockchainTransaction {
  id: string
  txHash: string
  action: 'mint' | 'transfer' | 'purchase' | 'retire'
  amount: number
  timestamp: string
  from: string
  to: string
  etherscanUrl: string
  ipfsUrl: string
  blockNumber: number
  gasUsed: number
  status: 'confirmed' | 'pending' | 'failed'
}

const BlockchainAudit: React.FC = () => {
  const [transactions] = useState<BlockchainTransaction[]>([
    {
      id: '1',
      txHash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      action: 'mint',
      amount: 500,
      timestamp: '2024-01-15T10:30:00Z',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      etherscanUrl: 'https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      ipfsUrl: 'https://ipfs.io/ipfs/QmABC123...',
      blockNumber: 18543210,
      gasUsed: 45000,
      status: 'confirmed'
    },
    {
      id: '2',
      txHash: '0x8b9c5d2e7f1a3b4c6d8e9f0a1b2c3d4e5f6a7b8',
      action: 'purchase',
      amount: 250,
      timestamp: '2024-01-20T14:15:00Z',
      from: '0x1234567890123456789012345678901234567890',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      etherscanUrl: 'https://etherscan.io/tx/0x8b9c5d2e7f1a3b4c6d8e9f0a1b2c3d4e5f6a7b8',
      ipfsUrl: 'https://ipfs.io/ipfs/QmDEF456...',
      blockNumber: 18543876,
      gasUsed: 52000,
      status: 'confirmed'
    },
    {
      id: '3',
      txHash: '0x9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8',
      action: 'transfer',
      amount: 100,
      timestamp: '2024-01-25T09:45:00Z',
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x9876543210987654321098765432109876543210',
      etherscanUrl: 'https://etherscan.io/tx/0x9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8',
      ipfsUrl: 'https://ipfs.io/ipfs/QmGHI789...',
      blockNumber: 18544532,
      gasUsed: 48000,
      status: 'confirmed'
    },
    {
      id: '4',
      txHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
      action: 'retire',
      amount: 50,
      timestamp: '2024-01-28T16:20:00Z',
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x0000000000000000000000000000000000000000',
      etherscanUrl: 'https://etherscan.io/tx/0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
      ipfsUrl: 'https://ipfs.io/ipfs/QmJKL012...',
      blockNumber: 18545210,
      gasUsed: 41000,
      status: 'confirmed'
    },
    {
      id: '5',
      txHash: '0xb4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
      action: 'mint',
      amount: 750,
      timestamp: '2024-02-01T11:00:00Z',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      etherscanUrl: 'https://etherscan.io/tx/0xb4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
      ipfsUrl: 'https://ipfs.io/ipfs/QmMNO345...',
      blockNumber: 18545876,
      gasUsed: 46000,
      status: 'pending'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = filterAction === 'all' || tx.action === filterAction
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus
    
    return matchesSearch && matchesAction && matchesStatus
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case 'mint':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'purchase':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'transfer':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'retire':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleVerifyCredit = () => {
    alert('Opening credit verification portal...')
  }

  const handleDownloadAudit = () => {
    alert('Downloading full audit report...')
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Blockchain Audit & Compliance</h2>
        <p className="text-slate-600">Complete transparent blockchain transaction history</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-white">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⛓️
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-white">
                {transactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">
              🏆
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Avg Gas Used</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(transactions.reduce((sum, tx) => sum + tx.gasUsed, 0) / transactions.length).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⛽
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.round((transactions.filter(tx => tx.status === 'confirmed').length / transactions.length) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleVerifyCredit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          Verify Credit Manually
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadAudit}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all"
        >
          Download Full Audit Report
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hash or address..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Action</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="mint">Mint</option>
              <option value="purchase">Purchase</option>
              <option value="transfer">Transfer</option>
              <option value="retire">Retire</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterAction('all')
                setFilterStatus('all')
              }}
              className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Transaction History</h3>
          <p className="text-slate-400 text-sm mt-1">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Transaction Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  From / To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Block
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTransactions.map((tx, index) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-mono text-sm text-cyan-400">
                        {formatAddress(tx.txHash)}
                      </span>
                      <motion.a
                        href={tx.etherscanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="ml-2 text-cyan-400 hover:text-cyan-300"
                      >
                        🔗
                      </motion.a>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getActionColor(tx.action)}`}>
                      {tx.action.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white font-semibold">{tx.amount.toLocaleString()}</span>
                    <span className="text-slate-400 text-sm ml-1">kg</span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-slate-300">
                        From: <span className="font-mono text-cyan-400">{formatAddress(tx.from)}</span>
                      </div>
                      <div className="text-slate-300">
                        To: <span className="font-mono text-cyan-400">{formatAddress(tx.to)}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {formatDate(tx.timestamp)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    #{tx.blockNumber.toLocaleString()}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(tx.status)}`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <motion.a
                        href={tx.etherscanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      >
                        Etherscan
                      </motion.a>
                      <motion.a
                        href={tx.ipfsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                      >
                        IPFS
                      </motion.a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No transactions found</h3>
            <p className="text-slate-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default BlockchainAudit
