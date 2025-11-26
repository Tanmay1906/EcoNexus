import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RightInsightsPanelProps {
  onClose: () => void
  credits: any[]
}

const RightInsightsPanel: React.FC<RightInsightsPanelProps> = ({ onClose, credits }) => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'bought' | 'insights'>('gainers')

  // Mock data for insights
  const topGainers = credits
    .filter(c => c.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5)

  const mostBought = credits
    .slice(0, 5)
    .map(credit => ({ ...credit, volume: Math.floor(Math.random() * 1000) + 100 }))
    .sort((a, b) => b.volume - a.volume)

  const marketInsights = [
    { type: 'bullish', title: 'Market Trend Up', description: 'Plastic credits gaining momentum', time: '2h ago' },
    { type: 'news', title: 'New ESG Policy', description: 'Government announces new recycling incentives', time: '4h ago' },
    { type: 'alert', title: 'High Demand', description: 'Premium credits experiencing high demand', time: '6h ago' },
    { type: 'analysis', title: 'Price Analysis', description: 'Expected 15% growth this quarter', time: '8h ago' }
  ]

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed right-0 top-24 bottom-20 w-80 bg-white border-l border-gray-200 shadow-xl z-30 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Market Insights</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            ×
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'gainers', label: 'Gainers', icon: '📈' },
            { id: 'bought', label: 'Most Bought', icon: '🔥' },
            { id: 'insights', label: 'Insights', icon: '💡' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'gainers' && (
            <motion.div
              key="gainers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {topGainers.map((credit, index) => (
                <motion.div
                  key={credit.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{credit.id}</h4>
                      <p className="text-sm text-gray-600">{credit.recycler}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 font-bold">+{credit.change}%</span>
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">₹{credit.price.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'bought' && (
            <motion.div
              key="bought"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {mostBought.map((credit, index) => (
                <motion.div
                  key={credit.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{credit.id}</h4>
                      <p className="text-sm text-gray-600">{credit.recycler}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-orange-600 font-bold">{credit.volume}</span>
                        <span className="text-xs text-gray-600">vol</span>
                      </div>
                      <p className="text-sm text-gray-600">₹{credit.price.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {marketInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      insight.type === 'bullish' ? 'bg-green-500' :
                      insight.type === 'news' ? 'bg-blue-500' :
                      insight.type === 'alert' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{insight.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Market Sentiment</span>
            <span className="font-medium text-green-600">Bullish</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ESG Index</span>
            <span className="font-medium text-gray-900">87.3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Active Traders</span>
            <span className="font-medium text-gray-900">1,247</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RightInsightsPanel
