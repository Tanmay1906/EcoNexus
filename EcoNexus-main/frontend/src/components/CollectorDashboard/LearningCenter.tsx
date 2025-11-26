import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Recycling Best Practices",
    desc: "How to clean and sort plastics for max value",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 
          01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    title: "Upload Guide",
    desc: "Tips to capture proper proof images and videos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2
           l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 
           0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 
           002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Plastic Grade Chart",
    desc: "Quick reference for PET/HDPE/PP and others",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m-7 5a7 7 0 
          01-5-12h.582m15.356 2A8.001 8.001 004.582 9m0 0H9m11 
          11v-5h-.581m0 0a8.003 8.003 0015.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];

const LearningCenter = () => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-900/40 p-5 rounded-xl shadow-lg">
      <h3 className="text-lg text-slate-100 font-semibold mb-4">Learning Center</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 16 }}
            className="
              group p-4 
              bg-slate-800/50 border border-emerald-900/30 
              rounded-xl 
              hover:border-emerald-600/50 transition-all 
              cursor-pointer hover:shadow-xl 
              flex flex-col
              min-h-[140px]
            "
          >
            <div className="flex items-start gap-3 mb-2">
              {/* ICON */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center 
                           bg-gradient-to-br from-emerald-600/20 to-emerald-400/10 
                           border border-emerald-600/30 text-emerald-400
                           group-hover:scale-110 transition-transform"
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <div className="font-semibold text-slate-200 text-sm leading-tight 
                              group-hover:text-emerald-400 transition-colors">
                {item.title}
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-slate-400 mt-auto leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningCenter;
