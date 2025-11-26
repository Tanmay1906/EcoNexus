import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { Users, Shield, Coins, Building2, TrendingUp, CheckCircle, ArrowRight, Recycle, Package, BarChart3 } from 'lucide-react'

type Step = {
  number: string
  title: string
  description: string
  details: string[]
  icon: React.ElementType
  gradient: string
}

const HowItWorks = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const steps: Step[] = [
    {
      number: '01',
      title: 'Waste Collection',
      description: 'Certified collectors gather plastic waste from homes, businesses, and communities across India',
      details: [
        'Network of 5000+ verified collectors nationwide',
        'Urban and rural collection points',
        'Sorted by plastic type (PET, HDPE, PP, etc.)',
        'Weight verified and documented at source'
      ],
      icon: Users,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      number: '02',
      title: 'Material Verification',
      description: 'Plastic arrives at processing facilities for quality control and authentication',
      details: [
        'Physical inspection and sorting',
        'Quality grade assessment',
        'Contamination screening',
        'Photographic documentation'
      ],
      icon: Shield,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      number: '03',
      title: 'Recycling Process',
      description: 'Verified plastic is processed through India-certified recycling facilities',
      details: [
        'Partnership with CPCB-approved facilities',
        'Cleaning and decontamination',
        'Shredding, melting, and pelletization',
        'Energy-efficient processing standards'
      ],
      icon: Recycle,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      number: '04',
      title: 'Blockchain Recording',
      description: 'Each kilogram is tokenized as a unique, traceable credit on Ethereum',
      details: [
        '1 Credit = 1kg recycled plastic',
        'Immutable transaction record',
        'Full supply chain visibility',
        'Third-party audit trail'
      ],
      icon: Coins,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      number: '05',
      title: 'Credit Marketplace',
      description: 'Verified credits become available for corporate purchase and retirement',
      details: [
        'Transparent pricing',
        'Real-time availability',
        'Batch or individual purchase',
        'Instant transfer of ownership'
      ],
      icon: Package,
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      number: '06',
      title: 'Corporate Offsetting',
      description: 'Indian companies purchase and retire credits to meet Extended Producer Responsibility (EPR) obligations',
      details: [
        'EPR compliance for plastic packaging',
        'ESG reporting and sustainability goals',
        'Permanent credit retirement on blockchain',
        'Certificate of environmental impact'
      ],
      icon: Building2,
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      number: '07',
      title: 'Impact Tracking',
      description: 'Monitor real-time environmental and social impact across India through comprehensive dashboards',
      details: [
        'Total plastic waste diverted from landfills',
        'CO2 emissions prevented',
        'Livelihood created for waste collectors',
        'Contribution to Swachh Bharat mission'
      ],
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      number: '08',
      title: 'Verified Impact',
      description: 'Independent audits confirm environmental and social benefits achieved',
      details: [
        'ISO certification standards',
        'Annual third-party audits',
        'Impact verification reports',
        'Continuous improvement'
      ],
      icon: CheckCircle,
      gradient: 'from-cyan-500 to-teal-500',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative w-full bg-slate-950 py-20 sm:py-32 lg:py-40 overflow-hidden antialiased"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[length:40px_40px] sm:bg-[length:60px_60px] pointer-events-none opacity-20" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-semibold uppercase tracking-widest text-emerald-200/90 backdrop-blur-sm mb-4 sm:mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.3)',
                '0 0 30px rgba(16, 185, 129, 0.5)',
                '0 0 20px rgba(16, 185, 129, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Recycle className="w-3 h-3" />
            How It Works
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-4 sm:mb-6 px-4">
            From Waste to Impact
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">The Complete Journey</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            Follow the transparent, blockchain-verified process that transforms plastic waste from across India
            into verified environmental credits.
          </p>
        </motion.div>
      </div>

      {/* Process Flow */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Timeline View */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-emerald-500 via-cyan-500 to-blue-500 transform -translate-x-1/2 opacity-30" />
            
            {steps.map((step, index) => (
              <StepCardDesktop key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet List View */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <StepCardMobile key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 mt-16 sm:mt-24 lg:mt-32"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '10M+', label: 'Kg Recycled', icon: Recycle },
            { value: '5000+', label: 'Collectors', icon: Users },
            { value: '200+', label: 'Companies', icon: Building2 },
            { value: '15+', label: 'Countries', icon: BarChart3 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-4 sm:p-6 text-center"
            >
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg font-bold text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(6, 182, 212, 0.9) 50%, rgba(59, 130, 246, 0.9) 100%)',
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
            }}
          >
            <span className="relative z-10">Start Your Journey</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

const StepCardDesktop = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [isEven ? -50 : 50, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative flex items-center mb-20 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className={`w-5/12 ${isEven ? 'pr-16' : 'pl-16'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="group relative"
        >
          <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${step.gradient} p-1`}>
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-3xl" />
            
            <div className="relative p-8 z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`rounded-2xl border border-white/20 bg-gradient-to-br ${step.gradient} p-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-6xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-20`}>
                  {step.number}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {step.description}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Center Node */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`relative w-16 h-16 rounded-full border-4 border-slate-950 bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
        >
          <div className="text-white font-bold text-sm">{step.number}</div>
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="w-5/12" />
    </motion.div>
  )
}

const StepCardMobile = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${step.gradient} p-1`}>
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-2xl" />
        
        <div className="relative p-6 z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`rounded-xl border border-white/20 bg-gradient-to-br ${step.gradient} p-3`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className={`text-5xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-20`}>
              {step.number}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">
            {step.title}
          </h3>
          
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">
            {step.description}
          </p>

          {/* Details */}
          <ul className="space-y-2">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Connecting Arrow (except last) */}
      {index < 7 && (
        <div className="flex justify-center py-4">
          <ArrowRight className="w-6 h-6 text-emerald-400/50 rotate-90" />
        </div>
      )}
    </motion.div>
  )
}

export default HowItWorks