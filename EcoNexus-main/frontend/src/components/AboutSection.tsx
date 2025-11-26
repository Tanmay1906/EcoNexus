import { motion } from 'framer-motion';
import { Shield, Recycle, Building2, Users, Globe, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Layout Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              About PLASTIFY
            </h1>
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transforming plastic waste into verified digital assets through blockchain technology
          </motion.p>
        </motion.div>

        {/* Content Grid - Side by Side Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Left Column - Ecosystem Visualization */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Central Blockchain Node */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300/50">
                <Shield className="w-10 h-10 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-yellow-400/50"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Orbiting Nodes */}
            <motion.div
              className="absolute top-1/4 left-1/4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-blue-300 font-medium text-center">
                Corporates
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/4 right-1/4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-green-300 font-medium text-center">
                Recyclers
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 left-1/4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-purple-300 font-medium text-center">
                Collectors
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 right-1/4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-cyan-300 font-medium text-center">
                Upcyclers
              </div>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
                  <stop offset="50%" stopColor="rgba(34, 197, 94, 0.6)" />
                  <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
                </linearGradient>
              </defs>
              <motion.line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="25%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="25%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="25%"
                y2="75%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="75%"
                y2="75%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
              />
            </svg>
          </motion.div>

          {/* Right Column - Key Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="group backdrop-blur-xl bg-slate-900/50 rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Measurable Impact</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every credit represents real plastic waste transformation with verifiable proof and transparent tracking.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group backdrop-blur-xl bg-slate-900/50 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Blockchain Verified</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ethereum-powered transparency ensuring complete immutability, trust, and auditability for all transactions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group backdrop-blur-xl bg-slate-900/50 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <Globe className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Ecosystem</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Connecting worldwide stakeholders for sustainable environmental change and circular economy development.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-xl bg-slate-900/40 rounded-3xl p-8 border border-white/10">
            <div className="text-gray-200 space-y-6 leading-relaxed">
              <p>
                At <span className="font-bold text-emerald-400">PLASTIFY</span>, we believe sustainability should be <span className="text-white font-semibold">measurable, verifiable, and rewarding</span>. We are a blockchain-enabled compliance and sustainability platform that transforms plastic waste into verified digital assets — <span className="text-cyan-400 font-semibold">Plastic Credits</span>.
              </p>

              <p>
                Designed for corporates, recyclers, and upcyclers, PLASTIFY builds a <span className="text-blue-400 font-semibold">transparent ecosystem</span> that tracks plastic recovery from collection to credit issuance. Every transaction is logged on the <span className="text-yellow-400 font-semibold">Ethereum blockchain</span>, ensuring authenticity, traceability, and accountability.
              </p>

              <p>
                For corporates, PLASTIFY simplifies <span className="text-purple-400 font-semibold">Extended Producer Responsibility (EPR)</span> and <span className="text-purple-400 font-semibold">ESG compliance</span> — offering a single dashboard to offset plastic footprints, generate compliance reports, and demonstrate verifiable environmental impact.
              </p>

              <div className="pt-6 border-t border-emerald-500/30">
                <p className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-center">
                  PLASTIFY: Turning plastic waste into verified impact, one credit at a time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />
    </div>
  );
}