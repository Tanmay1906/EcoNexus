import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hourglass3D from './Hourglass3D';
import { Recycle, Users, Building2, Sprout, ShoppingBag, Shield } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentWorld, setCurrentWorld] = useState('collectors');
  const [isFlipping, setIsFlipping] = useState(false);
  const isCollectors = currentWorld === 'collectors';

  const handleFlip = () => {
    setIsFlipping(true);
    setCurrentWorld(isCollectors ? 'corporates' : 'collectors');
    setTimeout(() => setIsFlipping(false), 1500);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[
          { pos: '-top-40 -left-40', colors: 'from-purple-500/20 to-pink-500/20', dur: 8 },
          { pos: 'top-1/3 -right-40', colors: 'from-cyan-500/20 to-blue-500/20', dur: 10 },
          { pos: 'bottom-20 left-1/3', colors: 'from-emerald-500/20 to-teal-500/20', dur: 9 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute ${orb.pos} w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-linear-to-r ${orb.colors} rounded-full blur-3xl`}
            animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Dual Side Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={isCollectors ? 'collectors-bg' : 'corporates-bg'}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0">
              {(isCollectors
                ? [
                    { img: '/Polluted_city.png', gradient: 'from-red-900/40 via-red-800/20', particle: 'bg-red-400/40' },
                    { img: '/Green_city.png', gradient: 'from-emerald-900/40 via-green-800/20', particle: 'bg-emerald-400/50' },
                  ]
                : [
                    { img: '/digital_nft.png', gradient: 'from-blue-900/50 via-indigo-900/30', particle: 'bg-blue-400/60' },
                    { img: '/Green_skyscrapper.png', gradient: 'from-emerald-900/50 via-teal-900/30', particle: 'bg-emerald-400/70' },
                  ]
              ).map((bg, i) => (
                <motion.div
                  key={i}
                  className="relative overflow-hidden"
                  initial={{ x: i === 0 ? -100 : 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 + i * 0.2 }}
                >
                  <img src={bg.img} alt="" className="w-full h-full object-cover opacity-60 object-center" />
                  <div className={`absolute inset-0 bg-gradient-to-${i === 0 ? 'r' : 'l'} ${bg.gradient} to-transparent`} />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, j) => (
                      <motion.div
                        key={j}
                        className={`absolute w-1 h-1 ${bg.particle} rounded-full`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{ y: [0, -100], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Foreground Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/20 to-slate-900/70 z-5" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Headings */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isCollectors ? 'collectors-header' : 'corporates-header'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-slate-900/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 mb-6 sm:mb-8 max-w-4xl w-full"
          >
            <motion.h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-linear-to-r ${
                isCollectors
                  ? 'from-red-400 via-white to-emerald-400'
                  : 'from-blue-400 via-white to-emerald-400'
              } bg-clip-text text-transparent leading-tight`}
            >
              {isCollectors ? 'Plastic vs Plastic-Free' : 'Plastic Credit Economy'}
            </motion.h1>
            <p className={`text-sm sm:text-lg md:text-xl ${isCollectors ? 'text-red-300' : 'text-emerald-300'} font-semibold mb-2`}>
              {isCollectors
                ? '"When plastic rules — the Earth suffocates."'
                : '"When Plastic Credits flow — the Earth heals."'}
            </p>
            <p className="text-xs sm:text-base md:text-lg text-gray-400 italic">
              {isCollectors ? 'Unverified, unmanaged, unrecycled.' : 'Verified, circular, sustainable.'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Hourglass */}
        <motion.div
          className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 my-6 sm:my-8 cursor-pointer group"
          onClick={handleFlip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotateZ: isFlipping ? (isCollectors ? 0 : 180) : (isCollectors ? 0 : 180) }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Hourglass3D />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-500/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>

        {/* CTA Buttons */}
        <AnimatePresence mode="wait">
          {isCollectors ? (
            <motion.div
              key="collectors-cta"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center mt-6 sm:mt-8 w-full max-w-3xl px-4"
            >
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 40px rgba(34, 197, 94, 0.4)",
                  y: -4
                }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-green-500/40 transition-all backdrop-blur-sm border border-green-400/30 overflow-hidden group"
                onClick={() => navigate('/auth/rc/login')}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Recycle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 shrink-0" />
                <span className="relative z-10 text-center leading-tight">Join as Recycler</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
                  y: -4
                }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 flex-1 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-blue-500/40 transition-all backdrop-blur-sm border border-blue-400/30 overflow-hidden group"
                onClick={() => navigate('/auth/rc/login')}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Users className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 shrink-0" />
                <span className="relative z-10 text-center leading-tight">Join as Collectors</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="corporates-cta"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 w-full max-w-5xl px-4"
            >
              {[
                { icon: Building2, text: 'Corporate\nLogin', gradient: 'from-indigo-600 to-purple-600', shadow: 'indigo', delay: 0.2 },
                { icon: Sprout, text: 'Join as\nUpcycler', gradient: 'from-green-600 to-teal-600', shadow: 'green', delay: 0.3 },
                { icon: ShoppingBag, text: 'Marketplace\nAdmin', gradient: 'from-pink-600 to-rose-600', shadow: 'pink', delay: 0.4 },
                { icon: Shield, text: 'Explore Plastic\nCredits', gradient: 'from-sky-600 to-blue-600', shadow: 'sky', delay: 0.5 },
              ].map((btn, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: btn.delay }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: `0 10px 40px rgba(99, 102, 241, 0.4)`,
                    y: -4
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 px-4 py-5 sm:py-6 bg-linear-to-br ${btn.gradient} text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-${btn.shadow}-500/40 transition-all backdrop-blur-sm border border-white/20 overflow-hidden group`}onClick={() => navigate('/auth/cume/login')}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <btn.icon className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 shrink-0" />
                  <span className="relative z-10 text-center leading-tight whitespace-pre-line">{btn.text}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flip Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 text-center"
        >
          Click the hourglass to flip between worlds
        </motion.p>
      </div>
    </div>
  );
}