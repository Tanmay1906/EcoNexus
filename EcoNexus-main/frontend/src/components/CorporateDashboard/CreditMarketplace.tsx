import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface CreditListing {
  id: string
  recyclerName: string
  weight: number
  price: number
  verificationStatus: 'verified' | 'pending'
  impactCategory: string
  location: string
  available: boolean
  rating: number
}

interface FilterState {
  weightRange: [number, number]
  priceRange: [number, number]
  verifiedOnly: boolean
  impactCategory: string
}

const CreditMarketplace: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    weightRange: [0, 1000],
    priceRange: [0, 500],
    verifiedOnly: true,
    impactCategory: 'all'
  })

  const [listings] = useState<CreditListing[]>([
    {
      id: '1',
      recyclerName: 'Green Earth Recycling',
      weight: 500,
      price: 250,
      verificationStatus: 'verified',
      impactCategory: 'Ocean Cleanup',
      location: 'Mumbai, India',
      available: true,
      rating: 4.8
    },
    {
      id: '2',
      recyclerName: 'EcoCycle Solutions',
      weight: 750,
      price: 375,
      verificationStatus: 'verified',
      impactCategory: 'Landfill Recovery',
      location: 'Delhi, India',
      available: true,
      rating: 4.9
    },
    {
      id: '3',
      recyclerName: 'Sustainable Plastics',
      weight: 300,
      price: 150,
      verificationStatus: 'pending',
      impactCategory: 'River Cleanup',
      location: 'Bangalore, India',
      available: true,
      rating: 4.5
    },
    {
      id: '4',
      recyclerName: 'Circular Materials Co',
      weight: 1000,
      price: 500,
      verificationStatus: 'verified',
      impactCategory: 'Ocean Cleanup',
      location: 'Chennai, India',
      available: false,
      rating: 4.7
    },
    {
      id: '5',
      recyclerName: 'PureCycle Technologies',
      weight: 450,
      price: 225,
      verificationStatus: 'verified',
      impactCategory: 'Urban Recycling',
      location: 'Pune, India',
      available: true,
      rating: 4.6
    },
    {
      id: '6',
      recyclerName: 'ReNew Plastics',
      weight: 600,
      price: 300,
      verificationStatus: 'verified',
      impactCategory: 'Landfill Recovery',
      location: 'Hyderabad, India',
      available: true,
      rating: 4.8
    }
  ])

  const impactCategories = [
    'all',
    'Ocean Cleanup',
    'Landfill Recovery',
    'River Cleanup',
    'Urban Recycling',
    'Industrial Waste'
  ]

  const filteredListings = listings.filter(listing => {
    if (filters.weightRange[0] > 0 && listing.weight < filters.weightRange[0]) return false
    if (filters.weightRange[1] < 1000 && listing.weight > filters.weightRange[1]) return false
    if (filters.priceRange[0] > 0 && listing.price < filters.priceRange[0]) return false
    if (filters.priceRange[1] < 500 && listing.price > filters.priceRange[1]) return false
    if (filters.verifiedOnly && listing.verificationStatus !== 'verified') return false
    if (filters.impactCategory !== 'all' && listing.impactCategory !== filters.impactCategory) return false
    return true
  })

  const handleBuyCredit = (listingId: string) => {
    alert(`Initiating purchase for credit listing ${listingId}`)
  }

  const getStatusBadge = (status: string) => {
    return status === 'verified' 
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : 'bg-amber-100 text-amber-700 border-amber-200'
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}>
        ★
      </span>
    ))
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Plastic Credit Marketplace</h2>
        <p className="text-slate-600">Purchase verified plastic credits from certified recyclers</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Filters</h3>
            
            {/* Weight Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight Range (kg)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.weightRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    weightRange: [parseInt(e.target.value) || 0, prev.weightRange[1]]
                  }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={filters.weightRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    weightRange: [prev.weightRange[0], parseInt(e.target.value) || 1000]
                  }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price Range ($)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                  }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value) || 500]
                  }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Verified Only */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    verifiedOnly: e.target.checked
                  }))}
                  className="w-4 h-4 text-blue-500 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Verified Recyclers Only</span>
              </label>
            </div>

            {/* Impact Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Impact Category
              </label>
              <select
                value={filters.impactCategory}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  impactCategory: e.target.value
                }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {impactCategories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilters({
                weightRange: [0, 1000],
                priceRange: [0, 500],
                verifiedOnly: true,
                impactCategory: 'all'
              })}
              className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-semibold">{filteredListings.length}</span> listings
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="px-3 py-1 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Weight: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                className={`bg-white rounded-xl border ${
                  listing.verificationStatus === 'verified' 
                    ? 'border-emerald-200 shadow-emerald-50' 
                    : 'border-slate-200'
                } shadow-sm overflow-hidden`}
              >
                {/* Verified Badge */}
                {listing.verificationStatus === 'verified' && (
                  <div className="bg-emerald-500 text-white px-3 py-1 text-xs font-semibold text-center">
                    VERIFIED RECYCLER
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{listing.recyclerName}</h3>
                      <p className="text-sm text-slate-600">{listing.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(listing.rating)}
                      </div>
                      <p className="text-xs text-slate-500">{listing.rating} rating</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Weight</span>
                      <span className="font-semibold text-slate-800">{listing.weight.toLocaleString()} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Price</span>
                      <span className="font-bold text-lg text-blue-600">${listing.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Impact Category</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {listing.impactCategory}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Status</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(listing.verificationStatus)}`}>
                        {listing.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBuyCredit(listing.id)}
                    disabled={!listing.available}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                      listing.available
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {listing.available ? 'Buy Credit' : 'Sold Out'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No listings found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default CreditMarketplace
