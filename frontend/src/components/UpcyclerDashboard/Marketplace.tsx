import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MarketplaceListing {
  id: string
  productName: string
  unitPrice: number
  availableQuantity: number
  leadTime: string
  listingStatus: 'draft' | 'published' | 'sold'
  category: string
}

const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([
    {
      id: '1',
      productName: 'Eco-Tote Collection',
      unitPrice: 250,
      availableQuantity: 50,
      leadTime: '7 days',
      listingStatus: 'published',
      category: 'Bag'
    },
    {
      id: '2',
      productName: 'Recycled Fabric Roll',
      unitPrice: 180,
      availableQuantity: 25,
      leadTime: '5 days',
      listingStatus: 'published',
      category: 'Fabric'
    },
    {
      id: '3',
      productName: 'Wall Art Panels',
      unitPrice: 450,
      availableQuantity: 15,
      leadTime: '10 days',
      listingStatus: 'draft',
      category: 'Decor'
    },
    {
      id: '4',
      productName: 'Gift Box Set',
      unitPrice: 120,
      availableQuantity: 100,
      leadTime: '3 days',
      listingStatus: 'sold',
      category: 'Gift'
    }
  ])

  const [publishingId, setPublishingId] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
      case 'sold':
        return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10'
      case 'draft':
        return 'text-slate-400 border-slate-400/50 bg-slate-400/10'
      default:
        return 'text-slate-400 border-slate-400/50 bg-slate-400/10'
    }
  }

  const handlePublish = async (id: string) => {
    setPublishingId(id)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setListings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, listingStatus: 'published' } : item
      )
    )
    
    setPublishingId(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-slate rounded-2xl p-6 border border-pink-500/30"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(255, 0, 127, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.1)'
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">🛒</span>
        Marketplace Listings Manager
      </h2>

      <div className="space-y-4">
        <AnimatePresence>
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(255, 0, 127, 0.3)'
              }}
              className="p-5 rounded-xl border border-pink-500/30 relative overflow-hidden"
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 15px rgba(255, 0, 127, 0.1), 0 0 30px rgba(0, 229, 255, 0.05)'
              }}
            >
              {/* Neon pink outline glow */}
              <div 
                className="absolute inset-0 rounded-xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.2) 0%, transparent 50%)',
                  mixBlendMode: 'screen'
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white">{listing.productName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(listing.listingStatus)}`}>
                        {listing.listingStatus.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400 block">Unit Price</span>
                        <span className="text-pink-300 font-bold text-lg">₹{listing.unitPrice}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Available Qty</span>
                        <span className="text-cyan-300 font-semibold">{listing.availableQuantity} units</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Lead Time</span>
                        <span className="text-violet-300 font-semibold">{listing.leadTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Category</span>
                        <span className="text-emerald-300 font-semibold">{listing.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Publish Action */}
                  <div className="flex-shrink-0">
                    {listing.listingStatus === 'draft' && (
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 0 20px rgba(255, 0, 127, 0.5)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePublish(listing.id)}
                        disabled={publishingId === listing.id}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                        style={{
                          boxShadow: '0 0 15px rgba(255, 0, 127, 0.3)'
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {publishingId === listing.id ? (
                            <motion.span
                              key="publishing"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Publishing...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="publish"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <span>🚀</span>
                              Publish to Marketplace
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                    
                    {listing.listingStatus === 'published' && (
                      <div className="text-center">
                        <div className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold border border-emerald-500/30">
                          ✓ Published
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Visible to corporates</p>
                      </div>
                    )}
                    
                    {listing.listingStatus === 'sold' && (
                      <div className="text-center">
                        <div className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg font-semibold border border-cyan-500/30">
                          💰 Sold Out
                        </div>
                        <p className="text-xs text-slate-400 mt-2">All units purchased</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blue glow shadow effect */}
                <div 
                  className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full opacity-30 blur-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.5) 0%, transparent 70%)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🛍️
          </motion.div>
          <p className="text-slate-400 text-lg">No marketplace listings yet</p>
          <p className="text-slate-500 text-sm mt-2">Add products from your portfolio to start selling</p>
        </div>
      )}

      {/* Publish Success Message */}
      <AnimatePresence>
        {publishingId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-4 right-4 p-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg shadow-lg z-50"
            style={{
              boxShadow: '0 0 30px rgba(255, 0, 127, 0.5)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-bold">Publishing to Marketplace</p>
                <p className="text-sm">Your product will be visible to corporate buyers</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Marketplace
