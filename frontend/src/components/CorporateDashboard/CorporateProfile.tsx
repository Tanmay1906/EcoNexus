import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface CorporateProfile {
  companyName: string
  cin: string
  gst: string
  industry: string
  sustainabilityOfficer: {
    name: string
    email: string
    phone: string
  }
  regions: string[]
  annualPlasticFootprint: number
  eprTarget: number
  esgDocuments: File[]
}

const CorporateProfile: React.FC = () => {
  const [profile, setProfile] = useState<CorporateProfile>({
    companyName: 'Acme Corporation Ltd',
    cin: 'U74900DL2020PTC123456',
    gst: '07AAAPL1234C1ZV',
    industry: 'Manufacturing',
    sustainabilityOfficer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@acme.com',
      phone: '+91 98765 43210'
    },
    regions: ['North India', 'West India', 'South India'],
    annualPlasticFootprint: 500000,
    eprTarget: 85,
    esgDocuments: []
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<CorporateProfile>(profile)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleEdit = () => {
    setEditedProfile(profile)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
    setUploadedFiles([])
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleGenerateESGSummary = () => {
    alert('Generating ESG summary report...')
  }

  const industries = [
    'Manufacturing',
    'Retail',
    'Technology',
    'Healthcare',
    'Automotive',
    'FMCG',
    'Textiles',
    'Construction',
    'Other'
  ]

  const regions = [
    'North India',
    'South India',
    'East India',
    'West India',
    'Central India',
    'Northeast India'
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Corporate Profile & EPR Settings</h2>
        <p className="text-slate-600">Manage your company information and compliance details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Company Information</h3>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.companyName}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  CIN Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.cin}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, cin: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.cin}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  GST Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.gst}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, gst: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.gst}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Industry
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.industry}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-slate-800">{profile.industry}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sustainability Officer */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Sustainability Officer Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.sustainabilityOfficer.name}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      sustainabilityOfficer: { ...prev.sustainabilityOfficer, name: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.sustainabilityOfficer.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.sustainabilityOfficer.email}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      sustainabilityOfficer: { ...prev.sustainabilityOfficer, email: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.sustainabilityOfficer.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.sustainabilityOfficer.phone}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      sustainabilityOfficer: { ...prev.sustainabilityOfficer, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.sustainabilityOfficer.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* EPR Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">EPR Targets & Footprint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Operating Regions
                </label>
                {isEditing ? (
                  <select
                    multiple
                    value={editedProfile.regions}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value)
                      setEditedProfile(prev => ({ ...prev, regions: selected }))
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    size={4}
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.regions.map(region => (
                      <span key={region} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {region}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Plastic Footprint (kg)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.annualPlasticFootprint}
                    onChange={(e) => setEditedProfile(prev => ({ 
                      ...prev, 
                      annualPlasticFootprint: parseInt(e.target.value) || 0 
                    }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.annualPlasticFootprint.toLocaleString()} kg</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  EPR Target (%)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editedProfile.eprTarget}
                    onChange={(e) => setEditedProfile(prev => ({ 
                      ...prev, 
                      eprTarget: parseInt(e.target.value) || 0 
                    }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800">{profile.eprTarget}%</p>
                )}
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">ESG & Compliance Documents</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-slate-600 mb-4">Upload ESG reports, compliance certificates, and other documents</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">New Uploads:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📎</span>
                        <div>
                          <p className="font-medium text-slate-800">{file.name}</p>
                          <p className="text-sm text-slate-600">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveFile(index)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* ESG Score Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">ESG Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-emerald-100">Overall Score</span>
                  <span className="font-bold">87/100</span>
                </div>
                <div className="w-full bg-emerald-400/30 rounded-full h-2">
                  <div className="bg-white h-full rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Environmental</span>
                  <span>92/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Social</span>
                  <span>85/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-100">Governance</span>
                  <span>84/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateESGSummary}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Generate ESG Summary
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
              >
                Download Compliance Certificate
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
              >
                View Audit History
              </motion.button>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">EPR Compliance</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  COMPLIANT
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">ESG Reporting</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  UP TO DATE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Blockchain Verification</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default CorporateProfile
