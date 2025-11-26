import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface BlockchainEvent {
  id: string
  timestamp: string
  eventType: 'mint' | 'transfer' | 'verification' | 'payment' | 'marketplace'
  hash: string
  blockNumber: number
  gasUsed: string
  from: string
  to: string
  details: string
  ipfsHash?: string
  amount?: number
  tokenId?: string
}

const BlockchainAudit: React.FC = () => {
  const [events] = useState<BlockchainEvent[]>([
    {
      id: '1',
      timestamp: '2024-01-29T16:45:32Z',
      eventType: 'mint',
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      blockNumber: 18543210,
      gasUsed: '0.0042',
      from: '0x1234...5678',
      to: '0x8765...4321',
      details: 'Plastic Credit NFT Minted - PC-2024-000123',
      ipfsHash: 'QmXxx...123',
      amount: 500,
      tokenId: 'PC-2024-000123'
    },
    {
      id: '2',
      timestamp: '2024-01-29T15:30:18Z',
      eventType: 'verification',
      hash: '0x8b9c5d2e7f1a3b4c6d8e9f0a1b2c3d4e5f6a7b8',
      blockNumber: 18543209,
      gasUsed: '0.0028',
      from: '0x2345...6789',
      to: '0x9876...5432',
      details: 'Material verification completed - GreenTech Recycling',
      ipfsHash: 'QmYyy...456'
    },
    {
      id: '3',
      timestamp: '2024-01-29T14:15:45Z',
      eventType: 'transfer',
      hash: '0x9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e',
      blockNumber: 18543208,
      gasUsed: '0.0035',
      from: '0x3456...7890',
      to: '0x0987...6543',
      details: 'Credit Transfer - 250 credits to Acme Corporation',
      amount: 250,
      tokenId: 'PC-2024-000122'
    },
    {
      id: '4',
      timestamp: '2024-01-29T13:20:12Z',
      eventType: 'payment',
      hash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
      blockNumber: 18543207,
      gasUsed: '0.0021',
      from: '0x4567...8901',
      to: '0x1098...7654',
      details: 'Payment processed - ₹45,000 to GreenTech Recycling',
      amount: 45000
    },
    {
      id: '5',
      timestamp: '2024-01-29T12:05:28Z',
      eventType: 'marketplace',
      hash: '0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
      blockNumber: 18543206,
      gasUsed: '0.0038',
      from: '0x5678...9012',
      to: '0x2109...8765',
      details: 'Product listing approved - Eco-Friendly Laptop Stand',
      ipfsHash: 'QmZzz...789'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterTimeRange, setFilterTimeRange] = useState('24h')

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.to.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || event.eventType === filterType
    
    return matchesSearch && matchesType
  })

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'mint':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'transfer':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      case 'verification':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'payment':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'marketplace':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'mint':
        return '🪙'
      case 'transfer':
        return '🔄'
      case 'verification':
        return '✅'
      case 'payment':
        return '💰'
      case 'marketplace':
        return '🛍️'
      default:
        return '📋'
    }
  }

  const openEtherscan = (hash: string) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank')
  }

  const openIPFS = (hash: string) => {
    window.open(`https://ipfs.io/ipfs/${hash}`, '_blank')
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
          <h2 className="text-2xl font-bold text-white mb-2">Blockchain Audit Trail</h2>
          <p className="text-slate-400">Complete blockchain transaction history and audit logs</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Total Transactions</p>
            <p className="text-2xl font-bold text-cyan-400">{events.length}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">Latest Block</p>
            <p className="text-2xl font-bold text-emerald-400">18543210</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Minting Events</p>
              <p className="text-2xl font-bold text-emerald-400">
                {events.filter(e => e.eventType === 'mint').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl">
              🪙
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Transfers</p>
              <p className="text-2xl font-bold text-cyan-400">
                {events.filter(e => e.eventType === 'transfer').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              🔄
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Verifications</p>
              <p className="text-2xl font-bold text-blue-400">
                {events.filter(e => e.eventType === 'verification').length}
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
              <p className="text-slate-400 text-sm mb-1">Payments</p>
              <p className="text-2xl font-bold text-amber-400">
                {events.filter(e => e.eventType === 'payment').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Marketplace</p>
              <p className="text-2xl font-bold text-purple-400">
                {events.filter(e => e.eventType === 'marketplace').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">
              🛍️
            </div>
          </div>
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
              placeholder="Search transactions..."
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Event Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Events</option>
              <option value="mint">Minting</option>
              <option value="transfer">Transfers</option>
              <option value="verification">Verifications</option>
              <option value="payment">Payments</option>
              <option value="marketplace">Marketplace</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Time Range</label>
            <select
              value={filterTimeRange}
              onChange={(e) => setFilterTimeRange(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterType('all')
                setFilterTimeRange('24h')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Terminal-style Audit Log */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="bg-slate-800 px-6 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-slate-400 text-sm font-mono ml-3">blockchain-audit.log</span>
          </div>
        </div>
        
        <div className="p-6 font-mono text-sm max-h-96 overflow-y-auto">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="mb-4 pb-4 border-b border-slate-800 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <div className="text-cyan-400">
                  [{new Date(event.timestamp).toLocaleString()}]
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getEventColor(event.eventType)}`}>
                      <span>{getEventIcon(event.eventType)}</span>
                      <span>{event.eventType.toUpperCase()}</span>
                    </span>
                    <span className="text-emerald-400">BLOCK #{event.blockNumber}</span>
                    <span className="text-amber-400">GAS: {event.gasUsed} ETH</span>
                  </div>
                  
                  <div className="text-slate-300 mb-2">{event.details}</div>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">FROM:</span>
                      <span className="text-cyan-400 ml-1">{event.from}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">TO:</span>
                      <span className="text-cyan-400 ml-1">{event.to}</span>
                    </div>
                    {event.amount && (
                      <div>
                        <span className="text-slate-500">AMOUNT:</span>
                        <span className="text-emerald-400 ml-1">
                          {event.eventType === 'payment' ? `₹${event.amount.toLocaleString()}` : `${event.amount} credits`}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openEtherscan(event.hash)}
                      className="text-cyan-400 hover:text-cyan-300 text-xs underline"
                    >
                      🔍 View on Etherscan
                    </motion.button>
                    
                    {event.ipfsHash && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openIPFS(event.ipfsHash!)}
                        className="text-emerald-400 hover:text-emerald-300 text-xs underline"
                      >
                        📁 View on IPFS
                      </motion.button>
                    )}
                    
                    <div className="text-slate-500 text-xs">
                      HASH: <span className="text-cyan-400 font-mono">{event.hash}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Export Options</h3>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-teal-500/20 text-teal-400 rounded-lg font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
          >
            📥 Export as CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
          >
            📄 Export as JSON
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-colors border border-purple-500/30"
          >
            📊 Generate Report
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default BlockchainAudit
