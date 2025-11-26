import React from 'react'
import Sidebar from '../../components/CollectorDashboard/Sidebar'
import UploadProof from '../../components/CollectorDashboard/UploadProof'

const UploadProofPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900/95 to-slate-800/95 text-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        <div className="flex gap-6">
          <aside className="hidden md:block md:w-72">
            <Sidebar />
          </aside>

          <main className="flex-1">
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-emerald-900/30">
              <h1 className="text-2xl font-semibold mb-4">Upload Proof</h1>
              <UploadProof />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default UploadProofPage
