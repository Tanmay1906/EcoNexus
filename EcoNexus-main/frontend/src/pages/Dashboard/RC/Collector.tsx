import React, { useState } from 'react'
import Sidebar from '../../../components/CollectorDashboard/Sidebar'
import Header from '../../../components/CollectorDashboard/Header'
import ImpactOverview from '../../../components/CollectorDashboard/ImpactOverview'
import UploadProof from '../../../components/CollectorDashboard/UploadProof'
import ProofTimeline from '../../../components/CollectorDashboard/ProofTimeline'
import WalletPanel from '../../../components/CollectorDashboard/WalletPanel'
import Leaderboard from '../../../components/CollectorDashboard/Leaderboard'
import LearningCenter from '../../../components/CollectorDashboard/LearningCenter'

const Collector: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 text-slate-100">
      
      {/* Mobile Menu */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="
          fixed top-4 left-4 z-[60] lg:hidden 
          p-3 rounded-xl 
          bg-slate-900/80 border border-emerald-700/40 
          text-emerald-400 
          backdrop-blur-xl 
          hover:bg-slate-800/80 transition
          shadow-lg shadow-black/40
        "
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      {/* Layout */}
      <div className="flex min-h-screen">
        
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen z-[55]
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

            w-72
            bg-linear-to-b from-slate-900/95 to-slate-800/95
            border-r border-emerald-900/40
            backdrop-blur-2xl
            shadow-2xl shadow-black/40
            rounded-none lg:rounded-r-2xl
          `}
        >
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1650px] mx-auto space-y-10">

            {/* Header - Match aesthetic */}
            <div className="rounded-2xl p-1 bg-gradient-to-r from-emerald-900/10 via-slate-900 to-emerald-900/10 shadow-xl shadow-black/30 border border-emerald-800/30 backdrop-blur-xl">
              <Header />
            </div>

            {/* Impact Overview */}
            <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
              <ImpactOverview />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

              {/* Left */}
              <div className="xl:col-span-8 space-y-8">

                <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
                  <UploadProof />
                </div>

                <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
                  <ProofTimeline />
                </div>

              </div>

              {/* Right */}
              <div className="xl:col-span-4">
                <div className="sticky top-8 space-y-8">

                  <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
                    <WalletPanel />
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
                    <Leaderboard />
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 border border-emerald-800/30 shadow-xl shadow-black/30 backdrop-blur-xl p-6">
                    <LearningCenter />
                  </div>

                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Collector
