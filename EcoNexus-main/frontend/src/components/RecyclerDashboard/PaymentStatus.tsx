import React from 'react'
import { motion } from 'framer-motion'

interface PaymentRecord {
  id: string
  date: string
  wasteWeight: number
  verificationStatus: 'approved' | 'pending' | 'rejected'
  paymentStatus: 'completed' | 'pending' | 'failed'
  paymentMode: 'UPI' | 'Bank Transfer' | 'Pending'
  amount: number
}

const PaymentStatus: React.FC = () => {
  // Dummy data
  const payments: PaymentRecord[] = [
    {
      id: '1',
      date: '2024-01-15',
      wasteWeight: 45.5,
      verificationStatus: 'approved',
      paymentStatus: 'completed',
      paymentMode: 'UPI',
      amount: 2275.00
    },
    {
      id: '2',
      date: '2024-01-14',
      wasteWeight: 32.0,
      verificationStatus: 'pending',
      paymentStatus: 'pending',
      paymentMode: 'Pending',
      amount: 0
    },
    {
      id: '3',
      date: '2024-01-13',
      wasteWeight: 28.3,
      verificationStatus: 'rejected',
      paymentStatus: 'failed',
      paymentMode: 'Bank Transfer',
      amount: 0
    },
    {
      id: '4',
      date: '2024-01-12',
      wasteWeight: 51.2,
      verificationStatus: 'approved',
      paymentStatus: 'completed',
      paymentMode: 'Bank Transfer',
      amount: 2560.00
    },
    {
      id: '5',
      date: '2024-01-11',
      wasteWeight: 19.8,
      verificationStatus: 'pending',
      paymentStatus: 'pending',
      paymentMode: 'Pending',
      amount: 0
    },
    {
      id: '6',
      date: '2024-01-10',
      wasteWeight: 37.6,
      verificationStatus: 'approved',
      paymentStatus: 'completed',
      paymentMode: 'UPI',
      amount: 1880.00
    }
  ]

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30'
      case 'pending':
        return 'bg-amber-400/20 text-amber-400 border-amber-400/30'
      case 'rejected':
        return 'bg-red-400/20 text-red-400 border-red-400/30'
      default:
        return 'bg-slate-700/20 text-slate-400 border-slate-600/30'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400 font-semibold'
      case 'pending':
        return 'text-amber-400 font-semibold'
      case 'failed':
        return 'text-red-400 font-semibold'
      default:
        return 'text-slate-400'
    }
  }

  const getPaymentModeColor = (mode: string) => {
    switch (mode) {
      case 'UPI':
        return 'text-blue-400'
      case 'Bank Transfer':
        return 'text-purple-400'
      case 'Pending':
        return 'text-slate-500'
      default:
        return 'text-slate-400'
    }
  }

  const totalEarnings = payments
    .filter(p => p.paymentStatus === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-3xl">💰</span>
          Payment Status
        </h2>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Total Earnings</p>
            <p className="text-2xl font-bold text-emerald-400">
              ₹{totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Date
              </th>
              <th className="text-left py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Waste Weight
              </th>
              <th className="text-left py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Verification Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Payment Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Payment Mode
              </th>
              <th className="text-right py-4 px-4 font-semibold text-blue-900 bg-blue-900/10">
                Amount
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {payments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                className="border-b border-slate-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="text-white font-medium">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      weekday: 'short'
                    })}
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="text-white font-semibold">{payment.wasteWeight} kg</div>
                  <div className="text-slate-400 text-sm">
                    @ ₹50/kg
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getVerificationStatusColor(payment.verificationStatus)}`}>
                    {payment.verificationStatus.toUpperCase()}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className={getPaymentStatusColor(payment.paymentStatus)}>
                    {payment.paymentStatus.toUpperCase()}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className={`font-medium ${getPaymentModeColor(payment.paymentMode)}`}>
                    {payment.paymentMode}
                  </span>
                </td>

                <td className="py-4 px-4 text-right">
                  <div className={`text-lg font-bold ${payment.amount > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {payment.amount > 0 ? `₹${payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
          <div className="text-slate-400 text-sm mb-1">Completed Payments</div>
          <div className="text-2xl font-bold text-emerald-400">
            {payments.filter(p => p.paymentStatus === 'completed').length}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
          <div className="text-slate-400 text-sm mb-1">Pending Payments</div>
          <div className="text-2xl font-bold text-amber-400">
            {payments.filter(p => p.paymentStatus === 'pending').length}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
          <div className="text-slate-400 text-sm mb-1">Failed Payments</div>
          <div className="text-2xl font-bold text-red-400">
            {payments.filter(p => p.paymentStatus === 'failed').length}
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
          <div className="text-slate-400 text-sm mb-1">Avg. per Transaction</div>
          <div className="text-2xl font-bold text-blue-400">
            ₹{totalEarnings > 0 ? 
              (totalEarnings / payments.filter(p => p.paymentStatus === 'completed').length).toLocaleString('en-IN', { minimumFractionDigits: 0 }) :
              '0'
            }
          </div>
        </div>
      </motion.div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💳</div>
          <p className="text-slate-400 text-lg">No payment records yet</p>
          <p className="text-slate-500 text-sm mt-2">Complete verification to receive payments</p>
        </div>
      )}
    </motion.section>
  )
}

export default PaymentStatus
