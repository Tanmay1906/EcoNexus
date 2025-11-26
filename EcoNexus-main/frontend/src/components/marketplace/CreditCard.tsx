import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface CreditCardProps {
  credit: {
    id: string
    weight: number
    price: number
    change: number
    verificationStatus: 'verified' | 'pending' | 'rejected'
    recycler: string
    esgScore: number
    sparkline: number[]
  }
  onClick: () => void
  index: number
}

const CreditCard: React.FC<CreditCardProps> = ({ credit, onClick, index }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [isComparing, setIsComparing] = useState(false)

  const isPositive = credit.change >= 0
  const isVerified = credit.verificationStatus === 'verified'

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Buying credit:', credit.id)
    // Implement buy functionality
    // Could open a modal or navigate to buy page
  }

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWatchlisted(!isWatchlisted)
    console.log('Toggled watchlist for:', credit.id)
    // Add/remove from watchlist
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsComparing(!isComparing)
    console.log('Toggled compare for:', credit.id)
    // Add/remove from comparison list
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:border-blue-300 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{credit.id}</h3>
          <p className="text-sm text-gray-600">{credit.recycler}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isVerified 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isVerified ? '✓ Verified' : '⏳ Pending'}
        </div>
      </div>

      {/* Price and Change */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">₹{credit.price.toLocaleString()}</span>
          <span className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
            {isPositive ? '+' : ''}{credit.change}%
          </span>
        </div>
        <p className="text-sm text-gray-600">{credit.weight} kg recycled</p>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">7-day trend</span>
          <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{credit.change}%
          </span>
        </div>
        <div className="h-12 flex items-end gap-1">
          {credit.sparkline.map((value, idx) => {
            const maxValue = Math.max(...credit.sparkline)
            const minValue = Math.min(...credit.sparkline)
            const range = maxValue - minValue
            const height = range > 0 ? ((value - minValue) / range) * 100 : 50
            
            return (
              <div
                key={idx}
                className={`flex-1 rounded-t-sm ${
                  isPositive 
                    ? 'bg-gradient-to-t from-green-500 to-green-300' 
                    : 'bg-gradient-to-t from-red-500 to-red-300'
                }`}
                style={{ height: `${height}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* ESG Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">ESG Score</span>
          <span className="text-sm font-bold text-gray-900">{credit.esgScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              credit.esgScore >= 90 
                ? 'bg-gradient-to-r from-green-500 to-green-400'
                : credit.esgScore >= 80
                ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                : credit.esgScore >= 70
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                : 'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            style={{ width: `${credit.esgScore}%` }}
          />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Volume (24h)</p>
          <p className="text-sm font-bold text-gray-900">{Math.floor(Math.random() * 1000 + 100)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-500">Market Cap</p>
          <p className="text-sm font-bold text-gray-900">₹{(credit.price * credit.weight * 10).toLocaleString()}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuy}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Buy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWatchlist}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
            isWatchlisted
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg 
            className={`w-5 h-5 ${isWatchlisted ? 'fill-current' : ''}`} 
            fill={isWatchlisted ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCompare}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
            isComparing
              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CreditCard
