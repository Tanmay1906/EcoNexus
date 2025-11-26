import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PlasticCredit {
  id: string
  creditId: string
  weight: number
  issueDate: string
  verificationStatus: 'verified' | 'pending' | 'expired'
  blockchainUrl: string
  ipfsUrl: string
  materialType: string
  recyclerName: string
  location: string
}

const PlasticCreditWallet: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedCredits, setSelectedCredits] = useState<string[]>([])

  const [credits] = useState<PlasticCredit[]>([
    {
      id: '1',
      creditId: 'PC-2024-001',
      weight: 500,
      issueDate: '2024-01-15',
      verificationStatus: 'verified',
      blockchainUrl: 'https://etherscan.io/tx/0x123...',
      ipfsUrl: 'https://ipfs.io/ipfs/QmABC123...',
      materialType: 'PET',
      recyclerName: 'Green Earth Recycling',
      location: 'Mumbai, India'
    },
    {
      id: '2',
      creditId: 'PC-2024-002',
      weight: 750,
      issueDate: '2024-01-20',
      verificationStatus: 'verified',
      blockchainUrl: 'https://etherscan.io/tx/0x456...',
      ipfsUrl: 'https://ipfs.io/ipfs/QmDEF456...',
      materialType: 'HDPE',
      recyclerName: 'EcoCycle Solutions',
      location: 'Delhi, India'
    },
    {
      id: '3',
      creditId: 'PC-2024-003',
      weight: 300,
      issueDate: '2024-01-25',
      verificationStatus: 'pending',
      blockchainUrl: 'https://etherscan.io/tx/0x789...',
      ipfsUrl: 'https://ipfs.io/ipfs/QmGHI789...',
      materialType: 'LDPE',
      recyclerName: 'Sustainable Plastics',
      location: 'Bangalore, India'
    },
    {
      id: '4',
      creditId: 'PC-2024-004',
      weight: 1000,
      issueDate: '2024-02-01',
      verificationStatus: 'verified',
      blockchainUrl: 'https://etherscan.io/tx/0x012...',
      ipfsUrl: 'https://ipfs.io/ipfs/QmJKL012...',
      materialType: 'PP',
      recyclerName: 'Circular Materials Co',
      location: 'Chennai, India'
    }
  ])

  const handleConnectWallet = async () => {
    // Simulate MetaMask connection
    setWalletConnected(true)
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
  }

  const toggleCreditSelection = (creditId: string) => {
    setSelectedCredits(prev => 
      prev.includes(creditId) 
        ? prev.filter(id => id !== creditId)
        : [...prev, creditId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30'
      case 'pending':
        return 'bg-amber-500/20 text-amber-700 border-amber-500/30'
      case 'expired':
        return 'bg-red-500/20 text-red-700 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-700 border-slate-500/30'
    }
  }

  const totalWeight = credits.reduce((sum, credit) => sum + credit.weight, 0)
  const verifiedCredits = credits.filter(c => c.verificationStatus === 'verified').length

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Plastic Credit Wallet</h2>
        <p className="text-slate-600">Manage your blockchain-verified plastic credits</p>
      </div>

      {/* Wallet Connection */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">MetaMask Wallet</h3>
            {walletConnected ? (
              <div className="space-y-2">
                <p className="text-slate-300">Connected Address:</p>
                <p className="font-mono text-sm text-cyan-400">{walletAddress}</p>
              </div>
            ) : (
              <p className="text-slate-400">Connect your wallet to manage plastic credits</p>
            )}
          </div>
          <div>
            {!walletConnected ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConnectWallet}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Connect Wallet
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDisconnectWallet}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all"
              >
                Disconnect
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Credits</p>
              <p className="text-2xl font-bold text-slate-900">{credits.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              🏆
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Weight</p>
              <p className="text-2xl font-bold text-slate-900">{totalWeight.toLocaleString()} kg</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
              ⚖️
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Verified Credits</p>
              <p className="text-2xl font-bold text-slate-900">{verifiedCredits}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">
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
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          Buy Credits
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all"
        >
          Export Certificate (PDF)
        </motion.button>
      </div>

      {/* Credits Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Your Plastic Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credits.map((credit, index) => (
            <motion.div
              key={credit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white">{credit.creditId}</h4>
                    <p className="text-slate-400 text-sm">{credit.materialType} • {credit.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCredits.includes(credit.id)}
                      onChange={() => toggleCreditSelection(credit.id)}
                      className="w-4 h-4 text-cyan-500 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500"
                    />
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(credit.verificationStatus)}`}>
                      {credit.verificationStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Weight</span>
                  <span className="text-white font-semibold">{credit.weight.toLocaleString()} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Issue Date</span>
                  <span className="text-white font-semibold">{new Date(credit.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Recycler</span>
                  <span className="text-white font-semibold text-sm">{credit.recyclerName}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-slate-700 space-y-2">
                <div className="flex gap-2">
                  <motion.a
                    href={credit.blockchainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-500/30 transition-colors text-center"
                  >
                    View on Blockchain
                  </motion.a>
                  <motion.a
                    href={credit.ipfsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg hover:bg-emerald-500/30 transition-colors text-center"
                  >
                    Certificate
                  </motion.a>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  Transfer Credit
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default PlasticCreditWallet
