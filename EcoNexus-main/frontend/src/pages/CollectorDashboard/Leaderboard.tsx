import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/CollectorDashboard/Sidebar'
import Leaderboard from '../../components/CollectorDashboard/Leaderboard'

const LeaderboardPage: React.FC = () => {
  const location = useLocation()
  const mainRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mainRef.current) return
    if ((location as any).state?.fromQuickLink) {
      mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      mainRef.current.classList.add('ring-emerald-400', 'ring-4')
      const t = setTimeout(() => mainRef.current && mainRef.current.classList.remove('ring-emerald-400', 'ring-4'), 2200)
      return () => clearTimeout(t)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900/95 to-slate-800/95 text-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex gap-6">
          <aside className="hidden md:block md:w-72">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <div ref={mainRef} className="p-4 rounded-2xl bg-slate-900/40 border border-emerald-900/30">
              <h1 className="text-2xl font-semibold mb-4">Leaderboard</h1>
              <Leaderboard />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
