import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfileData {
  organizationName: string
  founder: string
  team: string
  licenseNumber: string
  location: string
  bankAccount: string
  ifsc: string
  upiId: string
  about: string
  licenseFile: File | null
}

const ProfileSettings: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    organizationName: 'EcoCreations Upcycling Studio',
    founder: 'Rajesh Kumar',
    team: '5 members',
    licenseNumber: 'UPC-2024-1234',
    location: 'Mumbai, Maharashtra',
    bankAccount: '1234567890123456',
    ifsc: 'SBIN0001234',
    upiId: 'ecocreations@upi',
    about: 'We specialize in transforming recycled plastic waste into premium, sustainable products for conscious consumers and corporate clients. Our mission is to create a circular economy while promoting environmental responsibility.',
    licenseFile: null
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData(prev => ({ ...prev, licenseFile: e.target.files![0] }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSaving(false)
    setShowSuccess(true)
    
    setTimeout(() => setShowSuccess(false), 3000)
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
        <span className="text-3xl">👤</span>
        Profile & Compliance
      </h2>

      <form className="space-y-6">
        {/* Organization Information */}
        <div className="p-6 rounded-xl border border-violet-500/20"
          style={{
            background: 'rgba(109, 40, 217, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-lg font-semibold text-violet-300 mb-4">Organization Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-violet-300 font-medium mb-2">
                Organization Name
              </label>
              <input
                type="text"
                name="organizationName"
                value={profileData.organizationName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(109, 40, 217, 0.1)'
                }}
              />
            </div>

            <div>
              <label className="block text-violet-300 font-medium mb-2">
                Founder / Team Lead
              </label>
              <input
                type="text"
                name="founder"
                value={profileData.founder}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(109, 40, 217, 0.1)'
                }}
              />
            </div>

            <div>
              <label className="block text-violet-300 font-medium mb-2">
                Team Size
              </label>
              <input
                type="text"
                name="team"
                value={profileData.team}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(109, 40, 217, 0.1)'
                }}
              />
            </div>

            <div>
              <label className="block text-violet-300 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(109, 40, 217, 0.1)'
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-violet-300 font-medium mb-2">
              About Your Organization
            </label>
            <textarea
              name="about"
              value={profileData.about}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-violet-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 10px rgba(109, 40, 217, 0.1)'
              }}
            />
          </div>
        </div>

        {/* Compliance & License */}
        <div className="p-6 rounded-xl border border-cyan-500/20"
          style={{
            background: 'rgba(0, 229, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Compliance & License</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-cyan-300 font-medium mb-2">
                License Number
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={profileData.licenseNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.1)'
                }}
              />
            </div>

            <div>
              <label className="block text-cyan-300 font-medium mb-2">
                Upload License Document
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white file:font-medium hover:file:from-cyan-600 hover:file:to-blue-600 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(0, 229, 255, 0.1)'
                }}
              />
              {profileData.licenseFile && (
                <div className="mt-2 text-sm text-cyan-300">
                  Selected: {profileData.licenseFile.name}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="p-6 rounded-xl border border-pink-500/20"
          style={{
            background: 'rgba(255, 0, 127, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-lg font-semibold text-pink-300 mb-4">Payment Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-pink-300 font-medium mb-2">
                Bank Account Number
              </label>
              <input
                type="text"
                name="bankAccount"
                value={profileData.bankAccount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
                }}
              />
            </div>

            <div>
              <label className="block text-pink-300 font-medium mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc"
                value={profileData.ifsc}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
                }}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-pink-300 font-medium mb-2">
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={profileData.upiId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.1)'
                }}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-yellow-400 mb-1">Security Notice</p>
                <p>Your payment information is encrypted and stored securely. We use industry-standard security measures to protect your financial data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(109, 40, 217, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-bold text-lg hover:from-violet-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(109, 40, 217, 0.3)'
            }}
          >
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.span
                  key="saving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving Profile...
                </motion.span>
              ) : (
                <motion.span
                  key="save"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <span>💾</span>
                  Save Profile
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
            className="fixed top-4 right-4 p-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg shadow-lg z-50"
            style={{
              boxShadow: '0 0 30px rgba(109, 40, 217, 0.5)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold">Profile Updated!</p>
                <p className="text-sm">Your profile changes have been saved successfully.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ProfileSettings
