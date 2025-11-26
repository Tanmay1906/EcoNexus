import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ChartData {
  label: string
  value: number
  color?: string
}

interface ESGMetrics {
  plasticOffset: number
  co2Saved: number
  eprCompliance: number
  sustainabilityScore: number
  circularityScore: number
  wasteReduction: number
}

const ESGAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('year')

  const [metrics] = useState<ESGMetrics>({
    plasticOffset: 87500,
    co2Saved: 125000,
    eprCompliance: 94,
    sustainabilityScore: 87,
    circularityScore: 82,
    wasteReduction: 76
  })

  // Mock data for charts
  const plasticOffsetData: ChartData[] = [
    { label: 'Jan', value: 6500 },
    { label: 'Feb', value: 7200 },
    { label: 'Mar', value: 6800 },
    { label: 'Apr', value: 8100 },
    { label: 'May', value: 7900 },
    { label: 'Jun', value: 8500 },
    { label: 'Jul', value: 9200 },
    { label: 'Aug', value: 8800 },
    { label: 'Sep', value: 9500 },
    { label: 'Oct', value: 10200 },
    { label: 'Nov', value: 9800 },
    { label: 'Dec', value: 10500 }
  ]

  const materialBreakdown: ChartData[] = [
    { label: 'PET', value: 35, color: '#10B981' },
    { label: 'HDPE', value: 25, color: '#06B6D4' },
    { label: 'LDPE', value: 20, color: '#3B82F6' },
    { label: 'PP', value: 15, color: '#8B5CF6' },
    { label: 'Other', value: 5, color: '#6B7280' }
  ]

  const circularityData: ChartData[] = [
    { label: 'Recycling Rate', value: 82 },
    { label: 'Reuse Rate', value: 68 },
    { label: 'Recovery Rate', value: 75 },
    { label: 'Regeneration Rate', value: 58 },
    { label: 'Redesign Rate', value: 45 }
  ]

  const co2OffsetData: ChartData[] = [
    { label: 'Q1', value: 28000 },
    { label: 'Q2', value: 32000 },
    { label: 'Q3', value: 35000 },
    { label: 'Q4', value: 30000 }
  ]

  const timeRanges = [
    { id: 'month', name: 'Last Month' },
    { id: 'quarter', name: 'Last Quarter' },
    { id: 'year', name: 'Last Year' },
    { id: 'all', name: 'All Time' }
  ]

  const renderLineChart = (data: ChartData[]) => {
    const maxValue = Math.max(...data.map(d => d.value))
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - (point.value / maxValue) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative h-48 bg-slate-50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#E2E8F0"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Data line */}
          <polyline
            points={points}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (point.value / maxValue) * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#06B6D4"
              />
            )
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-slate-600">
          {data.map((point, index) => (
            <span key={index} className="text-center">{point.label}</span>
          ))}
        </div>
      </div>
    )
  }

  const renderBarChart = (data: ChartData[]) => {
    const maxValue = Math.max(...data.map(d => d.value))
    
    return (
      <div className="relative h-48 bg-slate-50 rounded-lg p-4">
        <div className="h-full flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t" 
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-slate-600 mt-1 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderDonutChart = (data: ChartData[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = -90 // Start from top
    
    const segments = data.map((item, index) => {
      const percentage = (item.value / total) * 100
      const angle = (percentage / 100) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      
      currentAngle += angle
      
      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
      
      const largeArcFlag = angle > 180 ? 1 : 0
      
      return (
        <path
          key={index}
          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
          fill={item.color || '#6B7280'}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        />
      )
    })
    
    return (
      <div className="relative h-48 bg-slate-50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {segments}
          <circle cx="50" cy="50" r="25" fill="white" />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-slate-800">
            {total}
          </text>
        </svg>
        
        {/* Legend */}
        <div className="absolute top-2 right-2 space-y-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color || '#6B7280' }}
              />
              <span className="text-slate-600">{item.label}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderGauge = (value: number, max = 100, label: string) => {
    const percentage = (value / max) * 100
    const angle = (percentage / 100) * 180 - 90
    
    const getColor = () => {
      if (percentage >= 80) return '#10B981'
      if (percentage >= 60) return '#06B6D4'
      if (percentage >= 40) return '#FBBF24'
      return '#DC2626'
    }
    
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h4 className="text-sm font-medium text-slate-600 mb-4">{label}</h4>
        <div className="relative h-32">
          <svg className="w-full h-full" viewBox="0 0 100 60">
            {/* Background arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Value arc */}
            <path
              d={`M 10 50 A 40 40 0 0 1 ${50 + 40 * Math.cos((angle * Math.PI) / 180)} ${50 + 40 * Math.sin((angle * Math.PI) / 180)}`}
              fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            
            {/* Center text */}
            <text x="50" y="45" textAnchor="middle" className="text-2xl font-bold fill-slate-800">
              {value}%
            </text>
          </svg>
        </div>
      </div>
    )
  }

  const renderRadarChart = (data: ChartData[]) => {
    const points = data.map((item, index) => {
      const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
      const radius = (item.value / 100) * 40
      const x = 50 + radius * Math.cos(angle)
      const y = 50 + radius * Math.sin(angle)
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="relative h-48 bg-slate-50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Grid circles */}
          {[20, 40, 60, 80].map(radius => (
            <circle
              key={radius}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Grid lines */}
          {data.map((_, index) => {
            const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
            const x = 50 + 40 * Math.cos(angle)
            const y = 50 + 40 * Math.sin(angle)
            return (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth="0.5"
              />
            )
          })}
          
          {/* Data polygon */}
          <polygon
            points={points}
            fill="#06B6D4"
            fillOpacity="0.3"
            stroke="#06B6D4"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
            const radius = (item.value / 100) * 40
            const x = 50 + radius * Math.cos(angle)
            const y = 50 + radius * Math.sin(angle)
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#06B6D4"
              />
            )
          })}
        </svg>
        
        {/* Labels */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-slate-600 space-y-1">
            {data.map((item, index) => (
              <div key={index} className="text-center">{item.label}: {item.value}%</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">ESG Analytics Dashboard</h2>
        <p className="text-slate-600">Comprehensive environmental, social, and governance metrics</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {timeRanges.map(range => (
          <motion.button
            key={range.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTimeRange(range.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTimeRange === range.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {range.name}
          </motion.button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Plastic Offset</h3>
          <p className="text-3xl font-bold mb-1">{metrics.plasticOffset.toLocaleString()}</p>
          <p className="text-blue-100">kg recycled</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">CO₂ Saved</h3>
          <p className="text-3xl font-bold mb-1">{metrics.co2Saved.toLocaleString()}</p>
          <p className="text-emerald-100">kg CO₂ equivalent</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">EPR Compliance</h3>
          <p className="text-3xl font-bold mb-1">{metrics.eprCompliance}%</p>
          <p className="text-amber-100">compliant</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plastic Offset Over Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Plastic Offset Over Time</h3>
          {renderLineChart(plasticOffsetData)}
        </div>

        {/* Material Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Material Breakdown</h3>
          {renderDonutChart(materialBreakdown)}
        </div>

        {/* CO₂ Offset by Quarter */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">CO₂ Offset by Quarter</h3>
          {renderBarChart(co2OffsetData)}
        </div>

        {/* Circularity Metrics */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Circularity Radar</h3>
          {renderRadarChart(circularityData)}
        </div>
      </div>

      {/* Gauge Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderGauge(metrics.eprCompliance, 100, 'EPR Compliance')}
        {renderGauge(metrics.sustainabilityScore, 100, 'Sustainability Score')}
        {renderGauge(metrics.circularityScore, 100, 'Circularity Score')}
        {renderGauge(metrics.wasteReduction, 100, 'Waste Reduction')}
      </div>

      {/* Export Options */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
        >
          Download ESG Report (PDF)
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all"
        >
          Export Data (Excel)
        </motion.button>
      </div>
    </motion.section>
  )
}

export default ESGAnalytics
