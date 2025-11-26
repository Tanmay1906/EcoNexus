import React from 'react'
import Sidebar from '../../components/CollectorDashboard/Sidebar'
import Header from '../../components/CollectorDashboard/Header'

const ViewProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900/95 to-slate-800/95 text-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex gap-6">
          <aside className="hidden md:block md:w-72">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <Header />
            <div className="mt-6 p-6 rounded-2xl bg-slate-900/40 border border-emerald-900/30">
              <h1 className="text-2xl font-semibold mb-4">Profile</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 p-4 rounded-xl bg-slate-800/50 border border-emerald-900/20">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-bold text-2xl mb-4">C</div>
                  <div className="text-sm text-slate-300">Collector Name</div>
                  <div className="text-xs text-slate-400">collector@example.com</div>
                </div>

                <div className="col-span-2 p-4 rounded-xl bg-slate-800/50 border border-emerald-900/20">
                  <h2 className="text-lg font-semibold mb-2">About</h2>
                  <p className="text-sm text-slate-300">This is a sample profile page. Replace with real user data or connect to your auth/user store.</p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 rounded-md bg-slate-900/60 border border-emerald-900/20">
                      <div className="text-xs text-slate-400">Total kg collected</div>
                      <div className="text-lg font-bold text-emerald-300">742 kg</div>
                    </div>
                    <div className="p-3 rounded-md bg-slate-900/60 border border-emerald-900/20">
                      <div className="text-xs text-slate-400">Member since</div>
                      <div className="text-lg font-bold text-emerald-300">Jan 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
