import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    upcycler: string
    material: string
    esgRating: string
    demandTrend: number[]
    availability: string
    deliveryTime: string
    description?: string
    specifications?: string[]
    reviews?: number
    rating?: number
  }
  index: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A+':
        return 'bg-green-100 text-green-800'
      case 'A':
        return 'bg-green-100 text-green-700'
      case 'B+':
        return 'bg-blue-100 text-blue-800'
      case 'B':
        return 'bg-blue-100 text-blue-700'
      case 'C+':
        return 'bg-yellow-100 text-yellow-800'
      case 'C':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock':
        return 'bg-green-100 text-green-800'
      case 'Limited Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleBuy = () => {
    // Implement buy functionality
    console.log('Buying product:', product.id)
    // Add to cart logic
  }

  const handleBulkOrder = () => {
    // Implement bulk order functionality
    console.log('Bulk order for:', product.id)
    // Open bulk order modal
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    console.log('Toggled save for:', product.id)
    // Add/remove from wishlist
  }

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.material} product by ${product.upcycler}!`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
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
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-200"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* ESG Rating Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${getRatingColor(product.esgRating)}`}>
          {product.esgRating}
        </div>
        
        {/* Availability Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
          {product.availability}
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <svg 
            className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
            fill={isSaved ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        
        {/* Upcycler and Material */}
        <div className="text-sm text-gray-600 mb-2">
          <p>by {product.upcycler}</p>
          <p>{product.material}</p>
        </div>

        {/* Rating and Reviews */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
        )}

        {/* Demand Trend Mini Chart */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Demand Trend</span>
            <span className="text-xs font-medium text-green-600">
              +{Math.round((product.demandTrend[product.demandTrend.length - 1] - product.demandTrend[0]) / product.demandTrend[0] * 100)}%
            </span>
          </div>
          <div className="h-8 flex items-end gap-0.5">
            {product.demandTrend.map((value, idx) => {
              const maxValue = Math.max(...product.demandTrend)
              const height = (value / maxValue) * 100
              return (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-teal-500 to-teal-300 rounded-t-sm"
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>
        </div>

        {/* Price and Delivery */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Delivery</p>
            <p className="text-sm font-medium text-gray-700">{product.deliveryTime}</p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuy}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            Buy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBulkOrder}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Bulk
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
