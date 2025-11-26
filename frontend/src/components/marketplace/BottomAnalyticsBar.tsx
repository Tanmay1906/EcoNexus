import React from 'react'
import { motion } from 'framer-motion'

interface BottomAnalyticsBarProps {
  credits: any[]
}

const BottomAnalyticsBar: React.FC<BottomAnalyticsBarProps> = ({ credits }) => {
  // Calculate market metrics
  const totalCredits = credits.reduce((sum, credit) => sum + credit.weight, 0)
  const avgPrice = credits.reduce((sum, credit) => sum + credit.price, 0) / credits.length
  const totalVolume = credits.reduce((sum, credit) => sum + (credit.price * credit.weight), 0)
  const avgESG = credits.reduce((sum, credit) => sum + credit.esgScore, 0) / credits.length

  // Mock buy/sell volume
  const buyVolume = 65
  const sellVolume = 35

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Market Trend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Market Trend</span>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-20 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${buyVolume}%` }}
                  >
                    Buy {buyVolume}%
                  </div>
                  <div 
                    className="bg-red-500 h-full flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${sellVolume}%` }}
                  >
                    Sell {sellVolume}%
                  </div>
                </div>
              </div>
            </div>

            {/* Total Credits Available */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Total Credits:</span>
              <span className="text-sm font-bold text-gray-900">{totalCredits.toLocaleString()} kg</span>
            </div>

            {/* Credits Sold Today */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sold Today:</span>
              <span className="text-sm font-bold text-green-600">+{Math.floor(totalVolume * 0.1).toLocaleString()}</span>
            </div>

            {/* Average Credit Price */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Avg Price:</span>
              <span className="text-sm font-bold text-gray-900">₹{Math.round(avgPrice).toLocaleString()}</span>
            </div>

            {/* Overall ESG Index */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">ESG Index:</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">{avgESG.toFixed(1)}</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-full"
                    style={{ width: `${avgESG}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Analytics
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Export Data
            </motion.button>
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">24h Market Activity</span>
            <div className="flex-1 mx-4 h-8 flex items-end gap-0.5">
              {/* Generate random sparkline data */}
              {Array.from({ length: 50 }, (_, i) => {
                const height = Math.random() * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm opacity-60"
                    style={{ height: `${height}%` }}
                  />
                )
              })}
            </div>
            <span className="text-xs text-green-600 font-medium">+12.5%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BottomAnalyticsBar
