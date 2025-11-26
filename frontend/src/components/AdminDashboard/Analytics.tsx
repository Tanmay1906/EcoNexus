import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface MetricCard {
  title: string
  value: string
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: string
  color: string
}

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }>
}

const Analytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const metricCards: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '₹2,456,789',
      change: 12.5,
      trend: 'up',
      icon: '💰',
      color: 'emerald'
    },
    {
      title: 'Active Users',
      value: '1,845',
      change: 8.2,
      trend: 'up',
      icon: '👥',
      color: 'cyan'
    },
    {
      title: 'Credits Minted',
      value: '12,450',
      change: -3.1,
      trend: 'down',
      icon: '🪙',
      color: 'amber'
    },
    {
      title: 'Marketplace Sales',
      value: '₹856,234',
      change: 15.7,
      trend: 'up',
      icon: '🛍️',
      color: 'purple'
    },
    {
      title: 'Verification Rate',
      value: '94.2%',
      change: 2.3,
      trend: 'up',
      icon: '✅',
      color: 'blue'
    },
    {
      title: 'Dispute Resolution',
      value: '2.5 days',
      change: -18.5,
      trend: 'up',
      icon: '⚖️',
      color: 'teal'
    }
  ]

  const plasticCollectionData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Collectors',
        data: [1250, 1380, 1420, 1350, 1480, 1120, 980],
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)'
      },
      {
        label: 'Recyclers',
        data: [890, 920, 1050, 980, 1120, 850, 720],
        borderColor: '#EAB308',
        backgroundColor: 'rgba(234, 179, 8, 0.1)'
      }
    ]
  }

  const revenueData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credits Sales',
        data: [320000, 380000, 420000, 390000, 450000, 480000],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)'
      },
      {
        label: 'Marketplace',
        data: [120000, 145000, 165000, 155000, 180000, 195000],
        borderColor: '#A855F7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)'
      }
    ]
  }

  const userActivityData: ChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Active Users',
        data: [120, 85, 320, 680, 890, 650, 280],
        borderColor: '#0E7490',
        backgroundColor: 'rgba(14, 116, 144, 0.1)'
      }
    ]
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      default:
        return '➡️'
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return 'text-emerald-400'
    if (trend === 'down') return 'text-red-400'
    return 'text-slate-400'
  }

  const renderLineChart = (data: ChartData, title: string) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        
        {/* Simple SVG Chart Representation */}
        <div className="relative h-64 mb-4">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="40"
                y1={40 + i * 30}
                x2="360"
                y2={40 + i * 30}
                stroke="#475569"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            
            {/* Data lines */}
            {data.datasets.map((dataset, datasetIndex) => {
              const maxValue = Math.max(...dataset.data)
              const points = dataset.data.map((value, index) => {
                const x = 40 + (index * 320 / (dataset.data.length - 1))
                const y = 160 - (value / maxValue) * 120
                return `${x},${y}`
              }).join(' ')
              
              return (
                <polyline
                  key={datasetIndex}
                  points={points}
                  fill="none"
                  stroke={dataset.borderColor}
                  strokeWidth="2"
                />
              )
            })}
            
            {/* Data points */}
            {data.datasets.map((dataset, datasetIndex) =>
              dataset.data.map((value, index) => {
                const maxValue = Math.max(...dataset.data)
                const x = 40 + (index * 320 / (dataset.data.length - 1))
                const y = 160 - (value / maxValue) * 120
                
                return (
                  <circle
                    key={`${datasetIndex}-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={dataset.borderColor}
                  />
                )
              })
            )}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 justify-center">
          {data.datasets.map((dataset) => (
            <div key={dataset.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="text-slate-300 text-sm">{dataset.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  const renderBarChart = (data: ChartData, title: string) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        
        {/* Simple SVG Bar Chart */}
        <div className="relative h-64 mb-4">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="40"
                y1={40 + i * 30}
                x2="360"
                y2={40 + i * 30}
                stroke="#475569"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            
            {/* Bars */}
            {data.datasets[0].data.map((value, index) => {
              const maxValue = Math.max(...data.datasets[0].data)
              const barWidth = 280 / data.datasets[0].data.length
              const x = 40 + (index * barWidth) + (barWidth * 0.2)
              const barHeight = (value / maxValue) * 120
              const y = 160 - barHeight
              
              return (
                <rect
                  key={index}
                  x={x}
                  y={y}
                  width={barWidth * 0.6}
                  height={barHeight}
                  fill={data.datasets[0].borderColor}
                  rx="4"
                />
              )
            })}
          </svg>
        </div>
        
        {/* Labels */}
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          {data.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </motion.div>
    )
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
          <h2 className="text-2xl font-bold text-white mb-2">Analytics Center</h2>
          <p className="text-slate-400">Comprehensive analytics and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
          >
            📊 Export Report
          </motion.button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(14, 116, 144, 0.2)'
            }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl shadow-lg">
                {metric.icon}
              </div>
              <div className="flex items-center gap-1">
                <span className={getTrendColor(metric.trend)}>
                  {getTrendIcon(metric.trend)}
                </span>
                <span className={`text-sm font-semibold ${getTrendColor(metric.trend)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            
            <h3 className="text-slate-400 text-sm mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderLineChart(plasticCollectionData, 'Plastic Collection Trends')}
        {renderLineChart(revenueData, 'Revenue Streams')}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderBarChart(userActivityData, 'User Activity by Hour')}
        
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Top Performers</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Rajesh Kumar', role: 'Collector', score: 987, trend: 'up' },
              { name: 'GreenTech Recycling', role: 'Recycler', score: 856, trend: 'up' },
              { name: 'EcoCraft Studio', role: 'Upcycler', score: 743, trend: 'neutral' },
              { name: 'Acme Corporation', role: 'Corporate', score: 698, trend: 'up' },
              { name: 'Circular Solutions', role: 'Recycler', score: 645, trend: 'down' }
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{performer.name}</p>
                    <p className="text-slate-400 text-sm">{performer.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{performer.score}</span>
                  <span className={`text-sm ${getTrendColor(performer.trend)}`}>
                    {getTrendIcon(performer.trend)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Regional Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Regional Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { region: 'Mumbai', collectors: 234, recyclers: 45, credits: 3456, revenue: '₹456,789' },
            { region: 'Delhi', collectors: 189, recyclers: 38, credits: 2890, revenue: '₹389,012' },
            { region: 'Bangalore', collectors: 156, recyclers: 32, credits: 2234, revenue: '₹298,456' },
            { region: 'Chennai', collectors: 98, recyclers: 21, credits: 1234, revenue: '₹156,789' }
          ].map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900/50 rounded-lg p-4 border border-slate-600"
            >
              <h4 className="text-white font-semibold mb-3">{region.region}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Collectors:</span>
                  <span className="text-cyan-400">{region.collectors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recyclers:</span>
                  <span className="text-emerald-400">{region.recyclers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credits:</span>
                  <span className="text-amber-400">{region.credits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Revenue:</span>
                  <span className="text-white font-medium">{region.revenue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Health Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">System Health Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-slate-300 font-medium mb-3">Blockchain Performance</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Block Time</span>
                  <span className="text-emerald-400">12.5s</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Gas Efficiency</span>
                  <span className="text-cyan-400">92%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-300 font-medium mb-3">API Performance</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Response Time</span>
                  <span className="text-emerald-400">145ms</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-cyan-400">99.9%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '99.9%' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-300 font-medium mb-3">User Satisfaction</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">CSAT Score</span>
                  <span className="text-emerald-400">4.6/5</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Resolution Rate</span>
                  <span className="text-cyan-400">87%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Analytics
