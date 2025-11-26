import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CorporateOrder {
  id: string
  corporateName: string
  product: string
  quantity: number
  deadline: string
  deliveryStatus: 'processing' | 'shipped' | 'delivered' | 'issue'
  paymentStatus: 'pending' | 'paid' | 'failed'
  totalAmount: number
}

const CorporateOrders: React.FC = () => {
  const [orders, setOrders] = useState<CorporateOrder[]>([
    {
      id: 'ORD-001',
      corporateName: 'TechCorp Solutions',
      product: 'Eco-Tote Collection',
      quantity: 25,
      deadline: '2024-01-25',
      deliveryStatus: 'processing',
      paymentStatus: 'pending',
      totalAmount: 6250
    },
    {
      id: 'ORD-002',
      corporateName: 'Green Industries',
      product: 'Recycled Fabric Roll',
      quantity: 10,
      deadline: '2024-01-22',
      deliveryStatus: 'shipped',
      paymentStatus: 'paid',
      totalAmount: 1800
    },
    {
      id: 'ORD-003',
      corporateName: 'Sustainable Corp',
      product: 'Wall Art Panels',
      quantity: 5,
      deadline: '2024-01-20',
      deliveryStatus: 'delivered',
      paymentStatus: 'paid',
      totalAmount: 2250
    },
    {
      id: 'ORD-004',
      corporateName: 'EcoTech Ltd',
      product: 'Gift Box Set',
      quantity: 50,
      deadline: '2024-01-18',
      deliveryStatus: 'issue',
      paymentStatus: 'failed',
      totalAmount: 6000
    }
  ])

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'text-pink-400 border-pink-400/50 bg-pink-400/10'
      case 'shipped':
        return 'text-amber-400 border-amber-400/50 bg-amber-400/10'
      case 'delivered':
        return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
      case 'issue':
        return 'text-red-400 border-red-400/50 bg-red-400/10'
      default:
        return 'text-slate-400 border-slate-400/50 bg-slate-400/10'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-emerald-400'
      case 'pending':
        return 'text-amber-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-slate-400'
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, deliveryStatus: newStatus as any }
          : order
      )
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-slate rounded-2xl p-6 border border-cyan-500/30"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(10, 15, 36, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(255, 0, 127, 0.1)'
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">🏢</span>
        Corporate Orders Panel
      </h2>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/30">
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Order ID</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Corporate</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Product</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Quantity</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Deadline</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Delivery</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Payment</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-violet-300 font-mono text-sm">{order.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{order.corporateName}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-pink-300">{order.product}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-cyan-300 font-semibold">{order.quantity} units</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300">
                        {new Date(order.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className={`text-xs ${
                        new Date(order.deadline) < new Date() ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {new Date(order.deadline) < new Date() ? 'Overdue' : 
                         Math.ceil((new Date(order.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' days'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDeliveryStatusColor(order.deliveryStatus)}`}>
                      {order.deliveryStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-emerald-400 font-bold">₹{order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {order.deliveryStatus === 'processing' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateStatus(order.id, 'shipped')}
                          className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30 text-xs font-medium hover:bg-amber-500/30 transition-colors"
                        >
                          Ship
                        </motion.button>
                      )}
                      {order.deliveryStatus === 'shipped' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateStatus(order.id, 'delivered')}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                        >
                          Deliver
                        </motion.button>
                      )}
                      {order.deliveryStatus === 'issue' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUpdateStatus(order.id, 'processing')}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          Resolve
                        </motion.button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-pink-500/30"
          style={{
            background: 'rgba(255, 0, 127, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-pink-400 text-sm mb-1">Processing</div>
          <div className="text-2xl font-bold text-white">
            {orders.filter(o => o.deliveryStatus === 'processing').length}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-amber-500/30"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-amber-400 text-sm mb-1">Shipped</div>
          <div className="text-2xl font-bold text-white">
            {orders.filter(o => o.deliveryStatus === 'shipped').length}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-emerald-500/30"
          style={{
            background: 'rgba(74, 222, 128, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-emerald-400 text-sm mb-1">Delivered</div>
          <div className="text-2xl font-bold text-white">
            {orders.filter(o => o.deliveryStatus === 'delivered').length}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl border border-red-500/30"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-red-400 text-sm mb-1">Issues</div>
          <div className="text-2xl font-bold text-white">
            {orders.filter(o => o.deliveryStatus === 'issue').length}
          </div>
        </motion.div>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            📋
          </motion.div>
          <p className="text-slate-400 text-lg">No corporate orders yet</p>
          <p className="text-slate-500 text-sm mt-2">Published products will appear here when ordered</p>
        </div>
      )}
    </motion.section>
  )
}

export default CorporateOrders
