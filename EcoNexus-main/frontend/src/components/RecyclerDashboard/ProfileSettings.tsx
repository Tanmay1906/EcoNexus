import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BankDetails {
  accountNumber: string
  ifsc: string
  upiId: string
}

interface ProfileData {
  name: string
  email: string
  facilityName: string
  facilityLicense: File | null
  phone: string
  bankDetails: BankDetails
  governmentId: File | null
}

const ProfileSettings: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@greenrecycle.com',
    facilityName: 'Green Earth Recycling Facility',
    facilityLicense: null,
    phone: '+91 98765 43210',
    bankDetails: {
      accountNumber: '****1234',
      ifsc: 'SBIN0001234',
      upiId: 'rajesh@ybl'
    },
    governmentId: null
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('bankDetails.')) {
      const child = name.replace('bankDetails.', '')
      setProfileData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [child]: value
        }
      }))
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'facilityLicense' | 'governmentId') => {
    if (e.target.files && e.target.files[0]) {
      setProfileData(prev => ({ ...prev, [field]: e.target.files![0] }))
    }
  }

  const saveProfile = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSaving(false)
    setShowSuccess(true)
    
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const removeFile = (field: 'facilityLicense' | 'governmentId') => {
    setProfileData(prev => ({ ...prev, [field]: null }))
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">👤</span>
        Profile Settings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">📇</span>
            Personal Information
          </h3>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>
        </div>

        {/* Facility Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">🏭</span>
            Facility Information
          </h3>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Facility Name *
            </label>
            <input
              type="text"
              name="facilityName"
              value={profileData.facilityName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Facility License *
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'facilityLicense')}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white file:font-medium hover:file:bg-blue-800 transition-all"
            />
            
            {profileData.facilityLicense && (
              <div className="mt-2 flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
                <span className="text-sm">📄</span>
                <span className="text-sm text-slate-300 truncate">{profileData.facilityLicense.name}</span>
                <button
                  onClick={() => removeFile('facilityLicense')}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Government ID *
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'governmentId')}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-900 file:text-white file:font-medium hover:file:bg-blue-800 transition-all"
            />
            
            {profileData.governmentId && (
              <div className="mt-2 flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg">
                <span className="text-sm">📄</span>
                <span className="text-sm text-slate-300 truncate">{profileData.governmentId.name}</span>
                <button
                  onClick={() => removeFile('governmentId')}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">💳</span>
            Payment Information
          </h3>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              name="bankDetails.accountNumber"
              value={profileData.bankDetails.accountNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              name="bankDetails.ifsc"
              value={profileData.bankDetails.ifsc}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              placeholder="Enter IFSC code"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-2">
              UPI ID
            </label>
            <input
              type="text"
              name="bankDetails.upiId"
              value={profileData.bankDetails.upiId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              placeholder="your-upi@provider"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">🔒</span>
            Security
          </h3>

          <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div className="flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="text-slate-300 text-sm font-medium mb-1">
                  Secure Information Storage
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Your financial information is encrypted and stored securely. 
                  We use industry-standard security protocols to protect your data.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-400/10 rounded-lg border border-amber-400/30">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-amber-400 text-sm font-medium mb-1">
                  Verification Required
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Changes to payment information may require additional verification 
                  and may take 24-48 hours to process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveProfile}
          disabled={isSaving}
          className="px-8 py-3 bg-emerald-400 text-slate-900 rounded-lg font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-400/20"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            '💾 Save Changes'
          )}
        </motion.button>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 right-4 p-4 bg-emerald-400 text-slate-900 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Profile Updated!</p>
                <p className="text-sm">Your changes have been saved successfully.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ProfileSettings
