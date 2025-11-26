import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCollectorStore } from '../../store/collectorStore'

const UploadProof = () => {
  const addProof = useCollectorStore((s) => s.addProof)
  const [weight, setWeight] = useState('')
  const [type, setType] = useState('PET')
  const [location, setLocation] = useState('Auto')
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const startUpload = () => {
    if (!file || !weight) return
    setUploading(true)
    setProgress(0)
    const fakeHash = Math.random().toString(36).slice(2, 10)
    const uploadInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(uploadInterval)
          setUploading(false)
          addProof({ 
            id: Date.now().toString(), 
            date: new Date().toISOString(), 
            weight: Number(weight), 
            hash: fakeHash, 
            status: 'pending' 
          })
          return 100
        }
        return p + Math.floor(Math.random() * 12)
      })
    }, 300)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/90 backdrop-blur-sm border border-emerald-900/40 p-6 sm:p-8 rounded-xl shadow-lg"
    >
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl text-slate-100 font-bold mb-2">Upload Proof</h3>
        <p className="text-sm sm:text-base text-emerald-400/70">Your proof is securely stored. Verification happens soon.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-emerald-400/80 uppercase tracking-wide">Weight (kg)</label>
          <input 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            type="number" 
            placeholder="Enter weight" 
            className="w-full p-3 rounded-lg bg-slate-800/50 border border-emerald-900/40 text-slate-100 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-emerald-400/80 uppercase tracking-wide">Plastic Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="w-full p-3 rounded-lg bg-slate-800/50 border border-emerald-900/40 text-slate-100 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
          >
            <option>PET</option>
            <option>HDPE</option>
            <option>PP</option>
            <option>Mixed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-emerald-400/80 uppercase tracking-wide">Location</label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full p-3 rounded-lg bg-slate-800/50 border border-emerald-900/40 text-slate-100 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
          >
            <option>Auto</option>
            <option>Manual</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-emerald-400/80 uppercase tracking-wide">Upload Image</label>
          <div className="relative">
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
              className="w-full p-3 rounded-lg bg-slate-800/50 border border-emerald-900/40 text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer cursor-pointer focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="w-full bg-slate-800/50 rounded-lg h-3 overflow-hidden border border-emerald-900/40">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.button 
            onClick={startUpload} 
            disabled={uploading || !file || !weight}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg text-white font-semibold hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-lg shadow-emerald-600/20"
          >
            {uploading ? 'Uploading...' : 'Submit Proof'}
          </motion.button>
          
          {progress === 100 && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-400"
            >
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
              Success! Proof uploaded.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default UploadProof