import { Route, Routes } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import HowItWorks from './components/HowItWorks'
import WhatWeDo from './components/WhatWeDo'
import RCLogin from './pages/Auth/RCLogin'
import RCRegister from './pages/Auth/RCRegister'
import { CUMELogin } from './pages/Auth/CUMELogin'
import CUMERegister from './pages/Auth/CUMERegister'
import Admin from './pages/Dashboard/CUME/Admin'
import Corporate from './pages/Dashboard/CUME/Corporate'
import Upcycler from './pages/Dashboard/CUME/Upcycler'
import RecyclerDashboard from './pages/Dashboard/RC/RecyclerDashboard'
import ViewProfile from './pages/Profile/ViewProfile'
import Settings from './pages/Profile/Settings'
import {
  DashboardPage,
  UploadProofPage,
  HistoryPage,
  WalletPage,
  LeaderboardPage,
  LearningCenterPage,
  SupportPage,
} from './pages/CollectorDashboard'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full min-h-screen">
            <HeroSection />
            <AboutSection />
            <HowItWorks />
            <WhatWeDo />
          </div>
        }
      />
      <Route path="/auth/rc/login" element={<RCLogin />} />
      <Route path="/auth/rc/register" element={<RCRegister />} />
      <Route path="/auth/cume/login" element={<CUMELogin />} />
      <Route path="/auth/cume/register" element={<CUMERegister />} />
      <Route path="/dashboard/cume/admin" element={<Admin />} />
      <Route path="/dashboard/cume/corporate" element={<Corporate />} />
      <Route path="/dashboard/cume/upcycler" element={<Upcycler />} />
      <Route path="/dashboard/rc/collector" element={<DashboardPage />} />
      <Route path="/dashboard/rc/upload" element={<UploadProofPage />} />
      <Route path="/dashboard/rc/history" element={<HistoryPage />} />
      <Route path="/dashboard/rc/wallet" element={<WalletPage />} />
      <Route path="/dashboard/rc/leaderboard" element={<LeaderboardPage />} />
      <Route path="/dashboard/rc/learning" element={<LearningCenterPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/profile" element={<ViewProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard/rc/recycler-dashboard" element={<RecyclerDashboard />} />
    </Routes>
  )
}

export default App
