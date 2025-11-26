import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/marketplace'

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'credits' | 'products' | 'transactions'>('overview')
  const navigate = useNavigate()

  // Mock portfolio data
  const portfolioData = {
    totalValue: 458750,
    totalInvested: 320000,
    totalReturns: 138750,
    returnPercentage: 43.36,
    creditsOwned: 15,
    productsOwned: 8,
    activeInvestments: 23
  }

  const creditHoldings = [
    {
      id: 'PC-2024-001',
      quantity: 50,
      avgBuyPrice: 1200,
      currentPrice: 1250,
      totalValue: 62500,
      totalInvested: 60000,
      returns: 2500,
      returnPercentage: 4.17,
      esgScore: 92
    },
    {
      id: 'PC-2024-002',
      quantity: 30,
      avgBuyPrice: 1800,
      currentPrice: 1875,
      totalValue: 56250,
      totalInvested: 54000,
      returns: 2250,
      returnPercentage: 4.17,
      esgScore: 88
    }
  ]

  const productHoldings = [
    {
      id: 'UP-2024-001',
      name: 'Eco-Friendly Laptop Stand',
      quantity: 5,
      purchasePrice: 850,
      currentValue: 899,
      totalValue: 4495,
      totalInvested: 4250,
      returns: 245,
      returnPercentage: 5.76
    }
  ]

  const transactions = [
    {
      id: 'TXN-001',
      type: 'buy',
      asset: 'PC-2024-001',
      quantity: 10,
      price: 1200,
      total: 12000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'TXN-002',
      type: 'sell',
      asset: 'PC-2024-003',
      quantity: 5,
      price: 825,
      total: 4125,
      date: '2024-01-14',
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Track your plastic credit and upcycled product investments</p>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Value</span>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{portfolioData.totalValue.toLocaleString()}</div>
            <div className="text-sm text-green-600 font-medium">+₹{portfolioData.totalReturns.toLocaleString()} ({portfolioData.returnPercentage}%)</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Invested</span>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{portfolioData.totalInvested.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Initial investment</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Credits Owned</span>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{portfolioData.creditsOwned}</div>
            <div className="text-sm text-gray-600">Plastic credit holdings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Products Owned</span>
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">{portfolioData.productsOwned}</div>
            <div className="text-sm text-gray-600">Upcycled products</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'credits', label: 'Credits' },
              { id: 'products', label: 'Products' },
              { id: 'transactions', label: 'Transactions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Portfolio Performance</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Asset Allocation</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Plastic Credits</span>
                        <span className="text-sm font-medium text-gray-900">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Upcycled Products</span>
                        <span className="text-sm font-medium text-gray-900">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Recent Activity</h3>
                  <div className="space-y-2">
                    {transactions.slice(0, 3).map((txn) => (
                      <div key={txn.id} className="flex justify-between items-center py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{txn.asset}</p>
                          <p className="text-xs text-gray-500">{txn.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${txn.type === 'buy' ? 'text-red-600' : 'text-green-600'}`}>
                            {txn.type === 'buy' ? '-' : '+'}₹{txn.total.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">{txn.quantity} units</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Credit Holdings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Buy Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESG Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {creditHoldings.map((credit) => (
                      <tr key={credit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{credit.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{credit.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{credit.avgBuyPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{credit.currentPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{credit.totalValue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${credit.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {credit.returns >= 0 ? '+' : ''}₹{credit.returns.toLocaleString()} ({credit.returnPercentage}%)
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {credit.esgScore}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Product Holdings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productHoldings.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <span className="text-sm font-medium text-gray-900">{product.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Purchase Price:</span>
                        <span className="text-sm font-medium text-gray-900">₹{product.purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Value:</span>
                        <span className="text-sm font-medium text-gray-900">₹{product.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Returns:</span>
                        <span className={`text-sm font-medium ${product.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.returns >= 0 ? '+' : ''}₹{product.returns.toLocaleString()} ({product.returnPercentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            txn.type === 'buy' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {txn.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.asset}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{txn.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{txn.total.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Marketplace
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Export Portfolio
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
