import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface PendingMint {
  id: string
  recyclerName: string
  recyclerId: string
  verifiedWeight: number
  materialType: string
  verificationDate: string
  ipfsHash: string
  gasEstimate: string
  status: 'pending' | 'minting' | 'completed' | 'failed'
  txHash?: string
  blockNumber?: number
}

const MintConsole: React.FC = () => {
  const [pendingMints] = useState<PendingMint[]>([
    {
      id: '1',
      recyclerName: 'GreenTech Recycling',
      recyclerId: 'REC-001',
      verifiedWeight: 500,
      materialType: 'PET Bottles',
      verificationDate: '2024-01-29T14:15:00Z',
      ipfsHash: 'QmXxx...123',
      gasEstimate: '0.0042 ETH',
      status: 'pending'
    },
    {
      id: '2',
      recyclerName: 'EcoProcess Industries',
      recyclerId: 'REC-002',
      verifiedWeight: 750,
      materialType: 'HDPE',
      verificationDate: '2024-01-29T16:30:00Z',
      ipfsHash: 'QmYyy...456',
      gasEstimate: '0.0051 ETH',
      status: 'minting',
      txHash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      blockNumber: 18543210
    },
    {
      id: '3',
      recyclerName: 'Circular Solutions',
      recyclerId: 'REC-003',
      verifiedWeight: 1200,
      materialType: 'Mixed Plastics',
      verificationDate: '2024-01-28T11:00:00Z',
      ipfsHash: 'QmZzz...789',
      gasEstimate: '0.0068 ETH',
      status: 'completed',
      txHash: '0x8b9c5d2e7f1a3b4c6d8e9f0a1b2c3d4e5f6a7b8',
      blockNumber: 18542567
    }
  ])

  const [selectedMint, setSelectedMint] = useState<PendingMint | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const handleConnectWallet = () => {
    // Simulate MetaMask connection
    setWalletConnected(true)
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
  }

  const handleMint = (mintId: string) => {
    alert(`Initiating mint for ${mintId}`)
  }

  const handleRetry = (mintId: string) => {
    alert(`Retrying mint for ${mintId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'minting':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'minting':
        return '🔄'
      case 'completed':
        return '✅'
      case 'failed':
        return '❌'
      default:
        return '📋'
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
          <h2 className="text-2xl font-bold text-white mb-2">Plastic Credit Minting Console</h2>
          <p className="text-slate-400">Blockchain credit minting and transaction management</p>
        </div>
        <div className="flex items-center gap-4">
          {!walletConnected ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConnectWallet}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Connect MetaMask
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm">Connected</span>
              <span className="text-cyan-400 text-xs font-mono bg-slate-800 px-3 py-1 rounded-lg">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Pending Mints</p>
              <p className="text-2xl font-bold text-amber-400">
                {pendingMints.filter(m => m.status === 'pending').length}
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
              <p className="text-slate-400 text-sm mb-1">In Progress</p>
              <p className="text-2xl font-bold text-blue-400">
                {pendingMints.filter(m => m.status === 'minting').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl">
              🔄
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Completed Today</p>
              <p className="text-2xl font-bold text-emerald-400">
                {pendingMints.filter(m => m.status === 'completed').length}
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
              <p className="text-slate-400 text-sm mb-1">Total Weight</p>
              <p className="text-2xl font-bold text-cyan-400">
                {pendingMints.reduce((sum, m) => sum + m.verifiedWeight, 0).toLocaleString()} kg
              </p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
              ⚖️
            </div>
          </div>
        </div>
      </div>

      {/* Minting Queue */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white mb-2">Minting Queue</h3>
          <p className="text-slate-400 text-sm">Pending and active credit minting operations</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Recycler
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Gas Estimate
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {pendingMints.map((mint, index) => (
                <motion.tr
                  key={mint.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{mint.recyclerName}</p>
                      <p className="text-slate-400 text-sm">{mint.recyclerId}</p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">{mint.verifiedWeight.toLocaleString()} kg</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{mint.materialType}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-amber-400 font-mono text-sm">{mint.gasEstimate}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(mint.status)}`}>
                      <span>{getStatusIcon(mint.status)}</span>
                      <span>{mint.status.toUpperCase()}</span>
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    {mint.txHash ? (
                      <div>
                        <p className="text-cyan-400 font-mono text-xs">
                          {mint.txHash.slice(0, 6)}...{mint.txHash.slice(-4)}
                        </p>
                        <p className="text-slate-400 text-xs">Block #{mint.blockNumber}</p>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">No transaction</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {mint.status === 'pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMint(mint)}
                            className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
                          >
                            Preview
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMint(mint.id)}
                            disabled={!walletConnected}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Mint
                          </motion.button>
                        </>
                      )}
                      
                      {mint.status === 'failed' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRetry(mint.id)}
                          className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                        >
                          Retry
                        </motion.button>
                      )}
                      
                      {mint.status === 'completed' && mint.txHash && (
                        <motion.a
                          href={`https://etherscan.io/tx/${mint.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
                        >
                          View on Etherscan
                        </motion.a>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedMint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMint(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Credit Metadata Preview</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedMint(null)}
                className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-600"
              >
                ×
              </motion.button>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold mb-3">Credit Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Credit ID:</span>
                    <p className="text-white font-mono">PC-2024-{selectedMint.id.padStart(6, '0')}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Weight:</span>
                    <p className="text-white">{selectedMint.verifiedWeight} kg</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Material Type:</span>
                    <p className="text-white">{selectedMint.materialType}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Recycler:</span>
                    <p className="text-white">{selectedMint.recyclerName}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-cyan-400 font-semibold mb-3">Blockchain Data</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-400">IPFS Hash:</span>
                    <p className="text-cyan-400 font-mono break-all">{selectedMint.ipfsHash}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Verification Date:</span>
                    <p className="text-white">{new Date(selectedMint.verificationDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Gas Estimate:</span>
                    <p className="text-amber-400 font-mono">{selectedMint.gasEstimate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-amber-400 font-semibold mb-3">Smart Contract Parameters</h4>
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-cyan-400">
                  <pre>{`{
  "tokenId": "PC-2024-${selectedMint.id.padStart(6, '0')}",
  "weight": ${selectedMint.verifiedWeight},
  "material": "${selectedMint.materialType}",
  "recycler": "${selectedMint.recyclerId}",
  "verifiedAt": "${new Date(selectedMint.verificationDate).toISOString()}",
  "ipfsHash": "${selectedMint.ipfsHash}"
}`}</pre>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleMint(selectedMint.id)
                  setSelectedMint(null)
                }}
                disabled={!walletConnected}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mint Credit NFT
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMint(null)}
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

export default MintConsole
