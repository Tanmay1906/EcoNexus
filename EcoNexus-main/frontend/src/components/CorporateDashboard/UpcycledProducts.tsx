import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  upcyclerName: string
  materialUsed: string
  price: number
  image: string
  bulkDiscount: boolean
  minBulkOrder: number
  bulkPrice: number
  deliveryLeadTime: string
  sustainabilityScore: number
  available: boolean
  description: string
}

const UpcycledProducts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('price-low')

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Corporate Eco-Tote Bag',
      upcyclerName: 'GreenCraft Studios',
      materialUsed: 'Recycled PET Bottles',
      price: 15,
      image: 'https://picsum.photos/seed/corporate-tote/400/300',
      bulkDiscount: true,
      minBulkOrder: 50,
      bulkPrice: 12,
      deliveryLeadTime: '2-3 weeks',
      sustainabilityScore: 95,
      available: true,
      description: 'Premium corporate gift bags made from 100% recycled PET bottles'
    },
    {
      id: '2',
      name: 'Executive Recycled Notebook Set',
      upcyclerName: 'EcoStationery Co',
      materialUsed: 'Recycled Paper & HDPE',
      price: 25,
      image: 'https://picsum.photos/seed/notebook-set/400/300',
      bulkDiscount: true,
      minBulkOrder: 25,
      bulkPrice: 20,
      deliveryLeadTime: '3-4 weeks',
      sustainabilityScore: 88,
      available: true,
      description: 'Professional notebook sets with recycled paper covers'
    },
    {
      id: '3',
      name: 'Sustainable Desk Organizer',
      upcyclerName: 'Circular Designs',
      materialUsed: 'Mixed Recycled Plastics',
      price: 35,
      image: 'https://picsum.photos/seed/desk-organizer/400/300',
      bulkDiscount: false,
      minBulkOrder: 1,
      bulkPrice: 35,
      deliveryLeadTime: '4-6 weeks',
      sustainabilityScore: 92,
      available: true,
      description: 'Modular desk organizers made from various recycled plastics'
    },
    {
      id: '4',
      name: 'Corporate Gift Box Set',
      upcyclerName: 'Premium Upcycles',
      materialUsed: 'Recycled PP & LDPE',
      price: 45,
      image: 'https://picsum.photos/seed/gift-box/400/300',
      bulkDiscount: true,
      minBulkOrder: 20,
      bulkPrice: 38,
      deliveryLeadTime: '3-5 weeks',
      sustainabilityScore: 90,
      available: false,
      description: 'Complete corporate gift sets with multiple sustainable items'
    },
    {
      id: '5',
      name: 'Recycled Plastic Planters',
      upcyclerName: 'Green Earth Products',
      materialUsed: 'Recycled HDPE',
      price: 20,
      image: 'https://picsum.photos/seed/planters/400/300',
      bulkDiscount: true,
      minBulkOrder: 30,
      bulkPrice: 16,
      deliveryLeadTime: '2-3 weeks',
      sustainabilityScore: 94,
      available: true,
      description: 'Office planters made from recycled plastic containers'
    },
    {
      id: '6',
      name: 'Sustainable Tech Accessories',
      upcyclerName: 'TechCycle Solutions',
      materialUsed: 'Recycled ABS & PC',
      price: 30,
      image: 'https://picsum.photos/seed/tech-accessories/400/300',
      bulkDiscount: true,
      minBulkOrder: 40,
      bulkPrice: 25,
      deliveryLeadTime: '4-5 weeks',
      sustainabilityScore: 87,
      available: true,
      description: 'Phone stands and cable organizers from recycled tech plastics'
    }
  ])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'bags', name: 'Bags & Cases' },
    { id: 'stationery', name: 'Stationery' },
    { id: 'office', name: 'Office Supplies' },
    { id: 'gifts', name: 'Gift Sets' }
  ]

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true
    // Simple category mapping based on product names
    if (selectedCategory === 'bags' && product.name.toLowerCase().includes('bag')) return true
    if (selectedCategory === 'stationery' && product.name.toLowerCase().includes('notebook')) return true
    if (selectedCategory === 'office' && (product.name.toLowerCase().includes('desk') || product.name.toLowerCase().includes('organizer'))) return true
    if (selectedCategory === 'gifts' && product.name.toLowerCase().includes('gift')) return true
    return false
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'sustainability':
        return b.sustainabilityScore - a.sustainabilityScore
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleBuyNow = (productId: string) => {
    alert(`Initiating purchase for product ${productId}`)
  }

  const handleBulkOrder = (productId: string) => {
    alert(`Requesting bulk order for product ${productId}`)
  }

  const handleRequestSample = (productId: string) => {
    alert(`Requesting sample for product ${productId}`)
  }

  const renderSustainabilityScore = (score: number) => {
    const getColor = () => {
      if (score >= 90) return 'bg-emerald-500'
      if (score >= 80) return 'bg-teal-500'
      if (score >= 70) return 'bg-blue-500'
      return 'bg-slate-500'
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-200 rounded-full h-2">
          <div 
            className={`h-full rounded-full ${getColor()}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-700 w-12 text-right">{score}</span>
      </div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Upcycled Corporate Products</h2>
        <p className="text-slate-600">Premium sustainable products for corporate gifting and office use</p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="sustainability">Sustainability Score</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.bulkDiscount && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                  BULK DISCOUNT
                </div>
              )}
              {!product.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold">OUT OF STOCK</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{product.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Upcycler:</span>
                  <span className="font-medium text-slate-800">{product.upcyclerName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Material:</span>
                  <span className="font-medium text-slate-800">{product.materialUsed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Delivery:</span>
                  <span className="font-medium text-slate-800">{product.deliveryLeadTime}</span>
                </div>
              </div>

              {/* Sustainability Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600">Sustainability Score</span>
                  <span className="font-medium text-slate-800">{product.sustainabilityScore}/100</span>
                </div>
                {renderSustainabilityScore(product.sustainabilityScore)}
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-slate-600"> / unit</span>
                  </div>
                  {product.bulkDiscount && (
                    <div className="text-right">
                      <p className="text-xs text-emerald-600 font-medium">Bulk Price</p>
                      <p className="text-sm font-bold text-emerald-600">${product.bulkPrice}</p>
                      <p className="text-xs text-slate-500">min. {product.minBulkOrder}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBuyNow(product.id)}
                  disabled={!product.available}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                    product.available
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                </motion.button>
                
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBulkOrder(product.id)}
                    disabled={!product.available}
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                      product.available
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Bulk Order
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRequestSample(product.id)}
                    className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all text-sm"
                  >
                    Request Sample
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
          <p className="text-slate-600">Try selecting a different category</p>
        </div>
      )}
    </motion.section>
  )
}

export default UpcycledProducts
