import React from 'react'
import Sidebar from '../../components/CollectorDashboard/Sidebar'
import Header from '../../components/CollectorDashboard/Header'

const Settings: React.FC = () => {
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
              <h1 className="text-2xl font-semibold mb-4">Settings</h1>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-slate-800/50 border border-emerald-900/20">
                  <div className="text-sm text-slate-300 font-medium">Account</div>
                  <div className="text-xs text-slate-400">Change email, password and account details.</div>
                </div>

                <div className="p-4 rounded-md bg-slate-800/50 border border-emerald-900/20">
                  <div className="text-sm text-slate-300 font-medium">Notifications</div>
                  <div className="text-xs text-slate-400">Manage notification preferences.</div>
                </div>

                <div className="p-4 rounded-md bg-slate-800/50 border border-emerald-900/20">
                  <div className="text-sm text-slate-300 font-medium">Privacy</div>
                  <div className="text-xs text-slate-400">Privacy and data preferences.</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Settings
