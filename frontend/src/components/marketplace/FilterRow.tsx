import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FilterRowProps {
  activeTab: 'credits' | 'products'
  onTabChange: (tab: 'credits' | 'products') => void
}

const FilterRow: React.FC<FilterRowProps> = ({ activeTab, onTabChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')

  const creditFilters = [
    { id: 'all', label: 'All Credits', icon: '📊' },
    { id: 'gainers', label: 'Gainers', icon: '📈' },
    { id: 'losers', label: 'Losers', icon: '📉' },
    { id: 'mostBought', label: 'Most Bought', icon: '🔥' },
    { id: 'highestRated', label: 'Highest Rated', icon: '⭐' },
    { id: 'newListings', label: 'New Listings', icon: '🆕' }
  ]

  const productFilters = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'bestSellers', label: 'Best Sellers', icon: '🏆' },
    { id: 'newArrivals', label: 'New Arrivals', icon: '🆕' },
    { id: 'premium', label: 'Premium', icon: '💎' },
    { id: 'ecoFriendly', label: 'Eco-Friendly', icon: '🌱' }
  ]

  const esgGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C']
  const materials = ['All', 'PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS', 'Mixed']

  const currentFilters = activeTab === 'credits' ? creditFilters : productFilters

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="px-6 py-4">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange('credits')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'credits'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Plastic Credits
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange('products')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcycled Products
            </motion.button>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Market Cap:</span>
              <span className="font-semibold text-gray-900">₹2.4M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">24h Volume:</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Active Listings:</span>
              <span className="font-semibold text-gray-900">1,847</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            {currentFilters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{filter.icon}</span>
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-3 ml-auto">
            {/* ESG Grade Filter */}
            {activeTab === 'credits' && (
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Grades</option>
                {esgGrades.map((grade) => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            )}

            {/* Material Type Filter */}
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {materials.map((material) => (
                <option key={material} value={material.toLowerCase()}>
                  {material}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Price:</span>
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Home Decor</option>
              <option>Office Supplies</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterRow
