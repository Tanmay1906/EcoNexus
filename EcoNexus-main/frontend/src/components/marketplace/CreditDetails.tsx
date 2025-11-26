import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface CreditDetailsProps {
  credit: {
    id: string
    weight: number
    price: number
    change: number
    verificationStatus: 'verified' | 'pending' | 'rejected'
    recycler: string
    esgScore: number
    sparkline: number[]
    issuedOn: string
    verifiedBy: string
    ipfsHash: string
    blockchainTx: string
  }
  onClose: () => void
}

const CreditDetails: React.FC<CreditDetailsProps> = ({ credit, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [quantity, setQuantity] = useState(1)

  const timeframes = ['1D', '1W', '1M', '1Y']

  // Mock chart data
  const generateChartData = (timeframe: string) => {
    const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 365
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      price: credit.price + (Math.random() - 0.5) * 100,
      volume: Math.floor(Math.random() * 1000) + 100
    }))
  }

  const [chartData] = useState(generateChartData(selectedTimeframe))

  const openEtherscan = (txHash: string) => {
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank')
  }

  const openIPFS = (ipfsHash: string) => {
    window.open(`https://ipfs.io/ipfs/${ipfsHash}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{credit.id}</h2>
              <p className="text-gray-600">{credit.recycler}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 shadow-sm"
            >
              ×
            </motion.button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Price and Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Current Price</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹{credit.price.toLocaleString()}</span>
                    <span className={`text-lg font-medium ${credit.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {credit.change >= 0 ? '+' : ''}{credit.change}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Per credit</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Weight</h3>
                  <div className="text-3xl font-bold text-gray-900">{credit.weight}</div>
                  <p className="text-sm text-gray-500 mt-1">Kilograms recycled</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">ESG Score</h3>
                  <div className="text-3xl font-bold text-gray-900">{credit.esgScore}/100</div>
                  <p className="text-sm text-gray-500 mt-1">Environmental rating</p>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Price Chart</h3>
                  <div className="flex gap-2">
                    {timeframes.map((tf) => (
                      <motion.button
                        key={tf}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedTimeframe === tf
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tf}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Simple Line Chart */}
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    {[...Array(5)].map((_, i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={40 + i * 30}
                        x2="360"
                        y2={40 + i * 30}
                        stroke="#E5E7EB"
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Data line */}
                    <polyline
                      points={chartData.map((point, index) => {
                        const x = 40 + (index * 320 / (chartData.length - 1))
                        const maxPrice = Math.max(...chartData.map(p => p.price))
                        const minPrice = Math.min(...chartData.map(p => p.price))
                        const y = 160 - ((point.price - minPrice) / (maxPrice - minPrice)) * 120
                        return `${x},${y}`
                      }).join(' ')}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    
                    {/* Data points */}
                    {chartData.map((point, index) => {
                      const maxPrice = Math.max(...chartData.map(p => p.price))
                      const minPrice = Math.min(...chartData.map(p => p.price))
                      const x = 40 + (index * 320 / (chartData.length - 1))
                      const y = 160 - ((point.price - minPrice) / (maxPrice - minPrice)) * 120
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#3B82F6"
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* Volume Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Trading Volume</h3>
                <div className="h-32">
                  <svg className="w-full h-full" viewBox="0 0 400 100">
                    {/* Volume bars */}
                    {chartData.map((point, index) => {
                      const maxVolume = Math.max(...chartData.map(p => p.volume))
                      const barWidth = 320 / chartData.length
                      const x = 40 + (index * barWidth)
                      const height = (point.volume / maxVolume) * 80
                      const y = 90 - height
                      
                      return (
                        <rect
                          key={index}
                          x={x}
                          y={y}
                          width={barWidth * 0.8}
                          height={height}
                          fill="#10B981"
                          rx="2"
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* Verification Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Verification Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-4">Certification</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          credit.verificationStatus === 'verified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {credit.verificationStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Verified By</span>
                        <span className="text-sm font-medium text-gray-900">{credit.verifiedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Issued On</span>
                        <span className="text-sm font-medium text-gray-900">{credit.issuedOn}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-4">Blockchain Proof</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">IPFS Hash</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {credit.ipfsHash.slice(0, 20)}...
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openIPFS(credit.ipfsHash)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Transaction</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {credit.blockchainTx.slice(0, 20)}...
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openEtherscan(credit.blockchainTx)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Buy Panel */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Buy Credits</h3>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </motion.button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-3 py-2 text-center border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price per credit</span>
                  <span className="text-sm font-medium text-gray-900">₹{credit.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <span className="text-sm font-medium text-gray-900">{quantity}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">₹{(credit.price * quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Add to Watchlist
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Share
              </motion.button>
            </div>

            {/* Risk Warning */}
            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                ⚠️ Credit values can fluctuate. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CreditDetails
