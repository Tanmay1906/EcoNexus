import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductFormData {
  productName: string
  category: string
  materialUsed: number
  description: string
  batchNumber: string
  productImages: File[]
}

const ImpactLab: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    category: 'Bag',
    materialUsed: 0,
    description: '',
    batchNumber: '',
    productImages: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Demo images for preview
  const demoImages = [
    'https://picsum.photos/seed/demo1/200/150',
    'https://picsum.photos/seed/demo2/200/150',
    'https://picsum.photos/seed/demo3/200/150'
  ]

  const categories = ['Bag', 'Fabric', 'Decor', 'Gift', 'Other']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        productImages: [...prev.productImages, ...Array.from(e.target.files!)] 
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.productName || !formData.materialUsed) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setIsAnimating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsAnimating(false)
    setShowSuccess(true)
    
    // Reset form
    setFormData({
      productName: '',
      category: 'Bag',
      materialUsed: 0,
      description: '',
      batchNumber: '',
      productImages: []
    })
    
    setTimeout(() => setShowSuccess(false), 3000)
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
        <span className="text-3xl">🧪</span>
        Impact Lab - Product Creation
      </h2>

      {/* Animated Icon */}
      <motion.div
        animate={isAnimating ? {
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
        style={{
          background: 'linear-gradient(135deg, #FF007F 0%, #00E5FF 100%)',
          boxShadow: '0 0 30px rgba(255, 0, 127, 0.5)'
        }}
      >
        {isAnimating ? '🎨' : '♻️'}
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-pink-300 font-medium mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
              }}
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-pink-300 font-medium mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Material Used */}
          <div>
            <label className="block text-pink-300 font-medium mb-2">
              Material Used (kg) *
            </label>
            <input
              type="number"
              name="materialUsed"
              value={formData.materialUsed}
              onChange={handleInputChange}
              required
              min="0"
              step="0.1"
              className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
              }}
              placeholder="Enter material weight in kg"
            />
          </div>

          {/* Batch Number */}
          <div>
            <label className="block text-pink-300 font-medium mb-2">
              Batch Number
            </label>
            <input
              type="text"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
              }}
              placeholder="Enter batch number"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-pink-300 font-medium mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
            style={{
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
            }}
            placeholder="Describe your upcycled product, its features, and sustainability aspects..."
          />
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-pink-300 font-medium mb-2">
            Product Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-cyan-500 file:text-white file:font-medium hover:file:from-pink-600 hover:file:to-cyan-600 transition-all"
            style={{
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
            }}
          />
          
          {/* Image Preview */}
          {formData.productImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {formData.productImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-pink-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Demo Images Preview */}
          {formData.productImages.length === 0 && (
            <div className="mt-4">
              <p className="text-slate-400 text-sm mb-3">Demo images (how your uploaded images will appear):</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {demoImages.map((imageUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={imageUrl}
                      alt={`Demo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-cyan-500/30"
                    />
                    <div className="absolute top-1 right-1 w-6 h-6 bg-cyan-500/80 text-white rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255, 0, 127, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-bold text-lg hover:from-pink-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(255, 0, 127, 0.3)'
            }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Product...
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <span>🎨</span>
                  Add to Upcycled Portfolio
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </form>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-4 right-4 p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg shadow-lg z-50"
            style={{
              boxShadow: '0 0 30px rgba(74, 222, 128, 0.5)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold">Product Created!</p>
                <p className="text-sm">Your upcycled product has been added to your portfolio.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ImpactLab
