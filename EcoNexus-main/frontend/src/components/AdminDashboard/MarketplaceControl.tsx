import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  upcycler: string
  category: string
  price: number
  bulkDiscount: number
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  submittedDate: string
  images: string[]
  description: string
  sustainabilityScore: number
  materialType: string
  marketplaceVisibility: boolean
}

interface CreditListing {
  id: string
  recycler: string
  weight: number
  price: number
  verificationStatus: string
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
  materialType: string
}

const MarketplaceControl: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Eco-Friendly Laptop Stand',
      upcycler: 'EcoCraft Studio',
      category: 'Office Supplies',
      price: 899,
      bulkDiscount: 15,
      status: 'pending',
      submittedDate: '2024-01-29T10:30:00Z',
      images: ['https://picsum.photos/seed/product1/400/300', 'https://picsum.photos/seed/product2/400/300'],
      description: 'Sustainable laptop stand made from recycled PET bottles',
      sustainabilityScore: 92,
      materialType: 'PET',
      marketplaceVisibility: false
    },
    {
      id: '2',
      name: 'Recycled Tote Bag Collection',
      upcycler: 'GreenDesign Works',
      category: 'Fashion Accessories',
      price: 450,
      bulkDiscount: 20,
      status: 'approved',
      submittedDate: '2024-01-28T14:15:00Z',
      images: ['https://picsum.photos/seed/bag1/400/300'],
      description: 'Stylish tote bags made from upcycled materials',
      sustainabilityScore: 88,
      materialType: 'Mixed Plastics',
      marketplaceVisibility: true
    },
    {
      id: '3',
      name: 'Corporate Gift Set',
      upcycler: 'Circular Creations',
      category: 'Corporate Gifts',
      price: 2500,
      bulkDiscount: 25,
      status: 'flagged',
      submittedDate: '2024-01-27T16:45:00Z',
      images: ['https://picsum.photos/seed/gift1/400/300', 'https://picsum.photos/seed/gift2/400/300'],
      description: 'Premium corporate gift set with sustainable packaging',
      sustainabilityScore: 95,
      materialType: 'HDPE',
      marketplaceVisibility: true
    }
  ])

  const [creditListings] = useState<CreditListing[]>([
    {
      id: '1',
      recycler: 'GreenTech Recycling',
      weight: 500,
      price: 7500,
      verificationStatus: 'verified',
      status: 'pending',
      submittedDate: '2024-01-29T11:00:00Z',
      materialType: 'PET Bottles'
    },
    {
      id: '2',
      recycler: 'EcoProcess Industries',
      weight: 750,
      price: 11250,
      verificationStatus: 'verified',
      status: 'approved',
      submittedDate: '2024-01-28T15:30:00Z',
      materialType: 'HDPE'
    }
  ])

  const [activeTab, setActiveTab] = useState<'products' | 'credits'>('products')
  const [corporateDiscount, setCorporateDiscount] = useState(10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'flagged':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const handleApproveProduct = (id: string) => {
    alert(`Approving product ${id}`)
  }

  const handleRejectProduct = (id: string) => {
    alert(`Rejecting product ${id}`)
  }

  const handleApproveCredit = (id: string) => {
    alert(`Approving credit listing ${id}`)
  }

  const handleRejectCredit = (id: string) => {
    alert(`Rejecting credit listing ${id}`)
  }

  const toggleProductVisibility = (id: string) => {
    alert(`Toggling visibility for product ${id}`)
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
          <h2 className="text-2xl font-bold text-white mb-2">Marketplace Control Panel</h2>
          <p className="text-slate-400">Manage marketplace listings, products, and credit sales</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {products.length} Products
          </span>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
            {creditListings.length} Credits
          </span>
        </div>
      </div>

      {/* Marketplace Settings */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Marketplace Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Corporate Discount (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50"
                value={corporateDiscount}
                onChange={(e) => setCorporateDiscount(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-bold w-12 text-center">{corporateDiscount}%</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Default discount for corporate clients</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Auto-approve Credits</label>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500" />
              <span className="text-white">Enabled</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Automatically approve verified credits</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Quality Threshold</label>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 text-teal-500 bg-slate-700 border-slate-600 rounded focus:ring-teal-500" />
              <span className="text-white">85+ Sustainability Score</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Minimum score for auto-approval</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-600'
          }`}
        >
          <span className="mr-2">🛍️</span>
          Products ({products.length})
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('credits')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === 'credits'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-600'
          }`}
        >
          <span className="mr-2">🪙</span>
          Credit Listings ({creditListings.length})
        </motion.button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
                }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between p-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                    <p className="text-slate-400 text-sm mb-2">by {product.upcycler}</p>
                    <p className="text-slate-300 text-sm mb-3">{product.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-white font-bold">₹{product.price}</span>
                      <span className="text-emerald-400 text-sm">{product.bulkDiscount}% bulk discount</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                        {product.category}
                      </span>
                      <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full border border-teal-500/30">
                        {product.materialType}
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                        {product.sustainabilityScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(product.status)}`}>
                      {product.status.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.marketplaceVisibility 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {product.marketplaceVisibility ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>

                {/* Product Images */}
                <div className="px-6 pb-4">
                  <div className="flex gap-2">
                    {product.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Product ${imgIndex + 1}`}
                        className="w-20 h-20 rounded-lg object-cover border border-slate-600"
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6">
                  <div className="flex gap-2">
                    {product.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleApproveProduct(product.id)}
                          className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                        >
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRejectProduct(product.id)}
                          className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                        >
                          Reject
                        </motion.button>
                      </>
                    )}
                    
                    {product.status === 'approved' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleProductVisibility(product.id)}
                        className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                      >
                        {product.marketplaceVisibility ? 'Hide from Marketplace' : 'Show on Marketplace'}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Credits Tab */}
      {activeTab === 'credits' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white mb-2">Credit Listings</h3>
              <p className="text-slate-400 text-sm">Review and approve credit listings for the marketplace</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Recycler
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {creditListings.map((listing, index) => (
                    <motion.tr
                      key={listing.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{listing.recycler}</p>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{listing.materialType}</span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{listing.weight.toLocaleString()} kg</span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="text-white font-bold">₹{listing.price.toLocaleString()}</span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                          {listing.verificationStatus}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(listing.status)}`}>
                          {listing.status === 'pending' && '⏳'}
                          {listing.status === 'approved' && '✅'}
                          {listing.status === 'rejected' && '❌'}
                          <span>{listing.status.toUpperCase()}</span>
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {listing.status === 'pending' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApproveCredit(listing.id)}
                                className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRejectCredit(listing.id)}
                                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                              >
                                Reject
                              </motion.button>
                            </>
                          )}
                          
                          {listing.status === 'approved' && (
                            <span className="text-emerald-400 text-sm font-medium">
                              Listed ✓
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default MarketplaceControl
