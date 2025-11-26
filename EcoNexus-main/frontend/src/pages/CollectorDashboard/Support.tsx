import React from 'react'
import Sidebar from '../../components/CollectorDashboard/Sidebar'

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900/95 to-slate-800/95 text-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex gap-6">
          <aside className="hidden md:block md:w-72">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-emerald-900/30">
              <h1 className="text-2xl font-semibold mb-2">Help & Support</h1>
              <p className="text-slate-300">If you need help, please contact our support at <a className="text-emerald-300 underline" href="mailto:support@econexus.example">support@econexus.example</a> or visit the knowledge base in the Learning Center.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
