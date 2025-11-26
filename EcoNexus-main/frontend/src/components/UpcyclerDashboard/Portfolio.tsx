import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioItem {
  id: string
  productName: string
  category: string
  materialUsed: number
  image: string
  status: 'draft' | 'published' | 'sold'
  createdAt: string
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      productName: 'Eco-Tote Collection',
      category: 'Bag',
      materialUsed: 15.2,
      image: 'https://picsum.photos/seed/ecotote/300/200',
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      productName: 'Recycled Fabric Roll',
      category: 'Fabric',
      materialUsed: 8.5,
      image: 'https://picsum.photos/seed/fabric/300/200',
      status: 'published',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      productName: 'Wall Art Panels',
      category: 'Decor',
      materialUsed: 12.0,
      image: 'https://picsum.photos/seed/wallart/300/200',
      status: 'draft',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      productName: 'Gift Box Set',
      category: 'Gift',
      materialUsed: 5.8,
      image: 'https://picsum.photos/seed/giftbox/300/200',
      status: 'sold',
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      productName: 'Sustainable Planters',
      category: 'Decor',
      materialUsed: 18.3,
      image: 'https://picsum.photos/seed/planters/300/200',
      status: 'published',
      createdAt: '2024-01-11'
    },
    {
      id: '6',
      productName: 'Corporate Badges',
      category: 'Gift',
      materialUsed: 3.2,
      image: 'https://picsum.photos/seed/badges/300/200',
      status: 'draft',
      createdAt: '2024-01-10'
    }
  ])

  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)

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

  const handleEdit = (id: string) => {
    setEditingItem(id)
    // In a real app, this would open an edit modal/form
    setTimeout(() => setEditingItem(null), 2000)
  }

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this product from your portfolio?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-slate rounded-2xl p-6 border border-violet-500/30"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(109, 40, 217, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.1)'
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">🖼️</span>
        Portfolio Gallery
      </h2>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(109, 40, 217, 0.4)'
              }}
              onHoverStart={() => setSelectedItem(item.id)}
              onHoverEnd={() => setSelectedItem(null)}
              className="group relative overflow-hidden rounded-xl border border-violet-500/30"
              style={{
                background: 'rgba(17, 24, 39, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 15px rgba(109, 40, 217, 0.1)'
              }}
            >
              {/* Glow effect on hover */}
              <AnimatePresence>
                {selectedItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.2) 0%, rgba(255, 0, 127, 0.1) 100%)',
                      mixBlendMode: 'screen'
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>

                {/* Overlay Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: selectedItem === item.id ? 1 : 0,
                    y: selectedItem === item.id ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-3 left-3 right-3 flex gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(item.id)}
                    className="flex-1 px-3 py-2 bg-violet-500/80 text-white rounded-lg text-sm font-medium hover:bg-violet-500 transition-colors backdrop-blur-sm"
                  >
                    {editingItem === item.id ? 'Editing...' : 'Edit'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(item.id)}
                    className="px-3 py-2 bg-red-500/80 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition-colors backdrop-blur-sm"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {item.productName}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span className="text-pink-300 font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Material Used:</span>
                    <span className="text-cyan-300 font-medium">{item.materialUsed} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created:</span>
                    <span className="text-slate-300">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Progress indicator for published items */}
                {item.status === 'published' && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="mt-3 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                    style={{
                      boxShadow: '0 0 10px rgba(109, 40, 217, 0.5)'
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🎨
          </motion.div>
          <p className="text-slate-400 text-lg">No products in portfolio yet</p>
          <p className="text-slate-500 text-sm mt-2">Create your first upcycled product in the Impact Lab</p>
        </div>
      )}

      {/* Edit Success Message */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-4 right-4 p-4 bg-violet-500 text-white rounded-lg shadow-lg z-50"
            style={{
              boxShadow: '0 0 30px rgba(109, 40, 217, 0.5)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✏️</span>
              <div>
                <p className="font-bold">Edit Mode</p>
                <p className="text-sm">Product editing interface would open here</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default Portfolio
