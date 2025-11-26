import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ProofFormData {
  weight: string
  materialType: string
  photos: File[]
  video: File | null
  location: string
  notes: string
}

const SubmitProof: React.FC = () => {
  const [formData, setFormData] = useState<ProofFormData>({
    weight: '',
    materialType: '',
    photos: [],
    video: null,
    location: '',
    notes: ''
  })
  
  const [isUploading, setIsUploading] = useState(false)
  const [ipfsHash, setIpfsHash] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const materialTypes = [
    'PET',
    'HDPE', 
    'LDPE',
    'PP',
    'MLP'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...Array.from(e.target.files!)] 
      }))
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, video: e.target.files![0] }))
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData(prev => ({ 
            ...prev, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const uploadToIPFS = async () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate IPFS upload with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    setTimeout(() => {
      setIpfsHash('QmXxx...exampleHash')
      setIsUploading(false)
    }, 2000)
  }

  const submitForVerification = async () => {
    // API call placeholder
    console.log('Submitting proof:', { ...formData, ipfsHash })
    alert('Proof submitted for verification!')
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-100 rounded-2xl p-8 shadow-xl"
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-900/20 rounded-2xl blur-xl" />
      
      <div className="relative bg-slate-800 rounded-xl p-8 border border-emerald-400/30">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📤</span>
          Submit Recycling Proof
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Weight (kg) *
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              placeholder="Enter weight in kg"
              step="0.1"
              min="0"
            />
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Material Type *
            </label>
            <select
              name="materialType"
              value={formData.materialType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            >
              <option value="">Select material type</option>
              {materialTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-2">
              Photo Upload * (Multiple images allowed)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-400 file:text-slate-900 file:font-medium hover:file:bg-emerald-500 transition-all"
            />
            
            {/* Photo previews */}
            {formData.photos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-slate-600"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-2">
              Video Upload (Optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white file:font-medium hover:file:bg-blue-800 transition-all"
            />
            {formData.video && (
              <p className="mt-2 text-slate-400 text-sm">
                Selected: {formData.video.name}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-2">
              Location *
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                placeholder="Auto-fill with GPS or enter manually"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={getLocation}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                📍 Get Location
              </motion.button>
            </div>
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-none"
              placeholder="Additional notes about this recycling proof..."
            />
          </div>
        </div>

        {/* IPFS Upload Progress */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-slate-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">Uploading to IPFS...</span>
              <span className="text-emerald-400 font-medium">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className="h-2 bg-gradient-to-r from-emerald-400 to-blue-900 rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* IPFS Hash Display */}
        {ipfsHash && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-emerald-400/10 border border-emerald-400/30 rounded-lg"
          >
            <p className="text-emerald-400 font-mono text-sm">
              IPFS Hash: {ipfsHash}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={uploadToIPFS}
            disabled={isUploading || !formData.weight || !formData.materialType || formData.photos.length === 0}
            className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isUploading ? 'Uploading...' : '📤 Upload to IPFS'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={submitForVerification}
            disabled={!ipfsHash}
            className="flex-1 px-6 py-3 bg-emerald-400 text-slate-900 rounded-lg font-medium hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ✅ Submit for Verification
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

export default SubmitProof
