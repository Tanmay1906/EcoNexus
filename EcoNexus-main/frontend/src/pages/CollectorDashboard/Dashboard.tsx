import React from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/CollectorDashboard/Sidebar'
import Header from '../../components/CollectorDashboard/Header'
import ImpactOverview from '../../components/CollectorDashboard/ImpactOverview'
import AnimatedCounter from '../../components/CollectorDashboard/shared/AnimatedCounter'
import { useCollectorStore } from '../../store/collectorStore'
import { useWalletStore } from '../../store/walletStore'

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900/95 to-slate-800/95 text-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex gap-6">
          <aside className="hidden md:block md:w-72">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <Header />

            {/* Quick links row: History, Wallet, Leaderboard */}
            <section className="mt-6">
                <QuickLinks />

              {/* Main overview below quick links */}
              <div className="mt-6">
                <ImpactOverview />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

const QuickLinks: React.FC = () => {
  const proofs = useCollectorStore((s) => s.proofs)
  const proofCount = proofs.length
  const totalKg = proofs.reduce((sum, p) => sum + (p.weight || 0), 0)
  const balance = useWalletStore((s) => s.balance)
  const estimatedEarnings = balance

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NavLink to="/dashboard/rc/history" state={{ fromQuickLink: true }} className="block p-4 rounded-2xl bg-slate-900/60 border border-emerald-800/30 hover:shadow-lg hover:scale-[1.02] transform transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700/10 flex items-center justify-center text-emerald-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-100">History</h3>
            <div className="text-sm text-slate-400 flex items-baseline gap-2">
              <span className="text-emerald-300 font-semibold"><AnimatedCounter value={proofCount} /></span>
              <span className="text-xs">submissions</span>
            </div>
          </div>
        </div>
      </NavLink>

      <NavLink to="/dashboard/rc/wallet" state={{ fromQuickLink: true }} className="block p-4 rounded-2xl bg-slate-900/60 border border-emerald-800/30 hover:shadow-lg hover:scale-[1.02] transform transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700/10 flex items-center justify-center text-emerald-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5"/><path d="M16 12h5m-3-2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-100">Wallet</h3>
            <div className="text-sm text-slate-400 flex items-baseline gap-2">
              <span className="text-emerald-300 font-semibold">₹<AnimatedCounter value={estimatedEarnings} /></span>
              <span className="text-xs">est. earnings</span>
            </div>
            <div className="text-xs text-slate-500">Total weight: <span className="font-medium text-emerald-300">{totalKg} kg</span></div>
          </div>
        </div>
      </NavLink>

      <NavLink to="/dashboard/rc/leaderboard" state={{ fromQuickLink: true }} className="block p-4 rounded-2xl bg-slate-900/60 border border-emerald-800/30 hover:shadow-lg hover:scale-[1.02] transform transition-all">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700/10 flex items-center justify-center text-emerald-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-100">Leaderboard</h3>
            <div className="text-sm text-slate-400 flex items-baseline gap-2">
              <span className="text-emerald-300 font-semibold"><AnimatedCounter value={totalKg} /></span>
              <span className="text-xs">kg collected</span>
            </div>
            <div className="text-xs text-slate-500">Your current contribution</div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}
