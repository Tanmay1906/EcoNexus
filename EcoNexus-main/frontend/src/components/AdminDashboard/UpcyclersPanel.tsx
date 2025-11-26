import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Upcycler {
  id: string
  name: string
  email: string
  phone: string
  location: string
  registeredDate: string
  totalProducts: number
  status: 'active' | 'pending' | 'suspended' | 'flagged'
  productStats: {
    approved: number
    rejected: number
    pending: number
  }
  inventoryValue: number
  rating: number
  specialties: string[]
  marketplaceVisibility: boolean
}

const UpcyclersPanel: React.FC = () => {
  const [upcyclers] = useState<Upcycler[]>([
    {
      id: '1',
      name: 'EcoCraft Studio',
      email: 'hello@ecocraft.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      registeredDate: '2024-01-12',
      totalProducts: 45,
      status: 'active',
      productStats: {
        approved: 38,
        rejected: 3,
        pending: 4
      },
      inventoryValue: 125000,
      rating: 4.9,
      specialties: ['PET Products', 'Home Decor', 'Corporate Gifts'],
      marketplaceVisibility: true
    },
    {
      id: '2',
      name: 'GreenDesign Works',
      email: 'info@greendesign.com',
      phone: '+91 87654 32109',
      location: 'Bangalore, Karnataka',
      registeredDate: '2024-01-18',
      totalProducts: 28,
      status: 'pending',
      productStats: {
        approved: 15,
        rejected: 2,
        pending: 11
      },
      inventoryValue: 0,
      rating: 4.6,
      specialties: ['Fashion Accessories', 'Bags', 'Stationery'],
      marketplaceVisibility: false
    },
    {
      id: '3',
      name: 'Circular Creations',
      email: 'contact@circular.com',
      phone: '+91 76543 21098',
      location: 'Delhi, NCR',
      registeredDate: '2024-01-08',
      totalProducts: 67,
      status: 'active',
      productStats: {
        approved: 59,
        rejected: 5,
        pending: 3
      },
      inventoryValue: 289000,
      rating: 4.8,
      specialties: ['Furniture', 'Office Supplies', 'Art'],
      marketplaceVisibility: true
    },
    {
      id: '4',
      name: 'PlasticArt Studio',
      email: 'art@plasticart.com',
      phone: '+91 65432 10987',
      location: 'Pune, Maharashtra',
      registeredDate: '2024-01-22',
      totalProducts: 12,
      status: 'flagged',
      productStats: {
        approved: 8,
        rejected: 3,
        pending: 1
      },
      inventoryValue: 35000,
      rating: 3.7,
      specialties: ['Art Installations', 'Decorative Items'],
      marketplaceVisibility: true
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSpecialty, setFilterSpecialty] = useState('all')

  const filteredUpcyclers = upcyclers.filter(upcycler => {
    const matchesSearch = upcycler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upcycler.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upcycler.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || upcycler.status === filterStatus
    const matchesSpecialty = filterSpecialty === 'all' || 
                           upcycler.specialties.includes(filterSpecialty)
    
    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'flagged':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const handleApprove = (id: string) => {
    alert(`Approving upcycler ${id}`)
  }

  const handleReject = (id: string) => {
    alert(`Rejecting upcycler ${id}`)
  }

  const handleSuspend = (id: string) => {
    alert(`Suspending upcycler ${id}`)
  }

  const handleFlag = (id: string) => {
    alert(`Flagging upcycler ${id}`)
  }

  const toggleVisibility = (id: string) => {
    alert(`Toggling marketplace visibility for upcycler ${id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Upcyclers Management</h2>
          <p className="text-slate-400">Monitor and manage all upcycling operations and product submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold border border-teal-500/30">
            {upcyclers.length} Total Upcyclers
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search upcyclers..."
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Specialty</label>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Specialties</option>
              <option value="PET Products">PET Products</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Corporate Gifts">Corporate Gifts</option>
              <option value="Fashion Accessories">Fashion Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Art">Art</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchTerm('')
                setFilterStatus('all')
                setFilterSpecialty('all')
              }}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>
      </div>

      {/* Upcyclers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUpcyclers.map((upcycler, index) => (
          <motion.div
            key={upcycler.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
            }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{upcycler.name}</h3>
                <p className="text-slate-400 text-sm">{upcycler.email}</p>
                <p className="text-slate-400 text-sm">{upcycler.phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(upcycler.status)}`}>
                  {upcycler.status.toUpperCase()}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-white text-sm">{upcycler.rating}</span>
                </div>
              </div>
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-emerald-400 text-lg font-bold">{upcycler.productStats.approved}</p>
                <p className="text-slate-400 text-xs">Approved</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-amber-400 text-lg font-bold">{upcycler.productStats.pending}</p>
                <p className="text-slate-400 text-xs">Pending</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <p className="text-red-400 text-lg font-bold">{upcycler.productStats.rejected}</p>
                <p className="text-slate-400 text-xs">Rejected</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Total Products</p>
                <p className="text-white font-bold">{upcycler.totalProducts}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-1">Inventory Value</p>
                <p className="text-white font-bold">₹{upcycler.inventoryValue.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{upcycler.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Registered:</span>
                <span className="text-white">{new Date(upcycler.registeredDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Marketplace:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  upcycler.marketplaceVisibility 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {upcycler.marketplaceVisibility ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Specialties:</span>
                <div className="flex gap-1 flex-wrap">
                  {upcycler.specialties.map((specialty, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {upcycler.status === 'pending' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApprove(upcycler.id)}
                    className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReject(upcycler.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors border border-red-500/30"
                  >
                    Reject
                  </motion.button>
                </>
              )}
              
              {upcycler.status === 'active' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuspend(upcycler.id)}
                    className="flex-1 px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium hover:bg-orange-500/30 transition-colors border border-orange-500/30"
                  >
                    Suspend
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleVisibility(upcycler.id)}
                    className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                  >
                    {upcycler.marketplaceVisibility ? 'Hide' : 'Show'}
                  </motion.button>
                </>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-2 bg-teal-500/20 text-teal-400 rounded-lg font-medium hover:bg-teal-500/30 transition-colors border border-teal-500/30"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUpcyclers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No upcyclers found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </motion.div>
  )
}

export default UpcyclersPanel
