import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { Users, Recycle, Shield, Building2, Sparkles, TrendingUp, Globe, Leaf, CheckCircle, Target, Zap, Package, BarChart3, Award, Lock } from 'lucide-react'

type Product = {
  title: string
  description: string
  icon: React.ElementType
  stats?: string
  gradient: string
}

const WhatWeDo = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  )

  const products: Product[] = [
    {
      title: 'Certified Collectors',
      description: 'Verified waste collection network across coastal zones',
      icon: Users,
      stats: '5000+ Collectors',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Real-Time Verification',
      description: 'Instant blockchain validation of recycled materials',
      icon: Shield,
      stats: '99.9% Accuracy',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Smart Tokenization',
      description: 'Ethereum-based plastic credit generation',
      icon: Sparkles,
      stats: '1 Credit = 1kg',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Corporate Offsetting',
      description: 'Transparent footprint neutralization for enterprises',
      icon: Building2,
      stats: '200+ Companies',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Impact Tracking',
      description: 'Real-time dashboard for environmental metrics',
      icon: TrendingUp,
      stats: '10M kg Recycled',
      gradient: 'from-emerald-500 to-cyan-500',
    },
    {
      title: 'Global Network',
      description: 'Operating in 15+ countries across 4 continents',
      icon: Globe,
      stats: '15+ Countries',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Carbon Reduction',
      description: 'Measurable CO2 savings from recycling process',
      icon: Leaf,
      stats: '5000 tons CO2',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Quality Assurance',
      description: 'Triple verification before credit issuance',
      icon: CheckCircle,
      stats: '3-Step Validation',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      title: 'Target Achievement',
      description: 'Help companies meet ESG compliance goals',
      icon: Target,
      stats: '95% Goal Success',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Energy Efficient',
      description: 'Powered by renewable energy recycling facilities',
      icon: Zap,
      stats: '100% Renewable',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Supply Chain',
      description: 'Full traceability from collection to retirement',
      icon: Package,
      stats: 'End-to-End Track',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive reporting and insights platform',
      icon: BarChart3,
      stats: 'Live Metrics',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Verified Credits',
      description: 'Third-party audited plastic offset certificates',
      icon: Award,
      stats: 'ISO Certified',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      title: 'Secure Platform',
      description: 'Bank-grade encryption and blockchain security',
      icon: Lock,
      stats: 'Enterprise Grade',
      gradient: 'from-gray-600 to-slate-600',
    },
    {
      title: 'Circular Economy',
      description: 'Close the loop on plastic waste worldwide',
      icon: Recycle,
      stats: '100% Circular',
      gradient: 'from-teal-500 to-emerald-500',
    },
  ]

  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-slate-950 py-20 sm:py-32 lg:py-40 overflow-hidden antialiased"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[60px_60px] pointer-events-none opacity-20" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 lg:mb-20">
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
            <Zap className="w-3 h-3" />
            What We Do
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-4 sm:mb-6 px-4">
            Power the PLASTIFY
            <br />
            Circular Economy
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
            Scroll to explore how we transform plastic waste into verified, traceable credits — 
            from collection to corporate offsetting.
          </p>
        </motion.div>
      </div>

      {/* Parallax Card Grid - Desktop Only */}
      <div className="lg:block relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-6 lg:px-8">
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className="relative flex w-full flex-col items-center"
        >
          <motion.div className="mb-20 flex justify-center gap-4 md:gap-6">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
          </motion.div>

          <motion.div className="mb-20 flex justify-center gap-4 md:gap-6">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
          </motion.div>

          <motion.div className="flex justify-center gap-4 md:gap-6">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile/Tablet Grid - Responsive Grid Layout */}
      <div className="lg:hidden relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <MobileProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 mt-16 sm:mt-24 lg:mt-32 text-center"
      >
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed">
            Every credit equals <span className="font-bold text-emerald-400">one kilogram</span> of verified 
            recycled plastic — fully <span className="font-bold text-cyan-400">traceable</span> and{' '}
            <span className="font-bold text-blue-400">tamper-proof</span> on the blockchain.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg font-bold text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(6, 182, 212, 0.9) 50%, rgba(59, 130, 246, 0.9) 100%)',
            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
          }}
        >
          <span className="relative z-10">View Marketplace</span>
          <motion.span
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>

          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
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
    </section>
  )
}

const ProductCard = ({
  product,
  translate,
}: {
  product: Product
  translate: any
}) => {
  const Icon = product.icon

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product relative h-80 w-[24rem] md:w-120 shrink-0"
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br ${product.gradient} p-1`}
      >
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-3xl" />
        
        <div className="relative h-full flex flex-col justify-between p-8 z-10">
          {/* Icon */}
          <div className="flex items-start justify-between">
            <div className={`rounded-2xl border border-white/20 bg-linear-to-br ${product.gradient} p-4`}>
              <Icon className="h-10 w-10 text-white" />
            </div>
            
            {product.stats && (
              <div className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2">
                <p className="text-xs font-bold text-white">{product.stats}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover/product:text-emerald-300 transition-colors">
              {product.title}
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-linear-to-t from-emerald-500/10 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 rounded-3xl" />
        </div>
      </div>
    </motion.div>
  )
}

const MobileProductCard = ({ product }: { product: Product }) => {
  const Icon = product.icon

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group/product relative h-full"
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${product.gradient} p-1`}
      >
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl rounded-2xl" />
        
        <div className="relative h-full flex flex-col justify-between p-6 z-10 min-h-[280px]">
          {/* Icon */}
          <div className="flex items-start justify-between">
            <div className={`rounded-xl border border-white/20 bg-linear-to-br ${product.gradient} p-3`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            
            {product.stats && (
              <div className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1.5">
                <p className="text-xs font-bold text-white">{product.stats}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover/product:text-emerald-300 transition-colors">
              {product.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-linear-to-t from-emerald-500/10 to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>
      </div>
    </motion.div>
  )
}

export default WhatWeDo