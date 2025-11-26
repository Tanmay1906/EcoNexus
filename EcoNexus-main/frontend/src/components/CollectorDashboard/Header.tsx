import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const RecycleIcon = ({
  className = "w-8 h-8",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2v2M5.2 5.2L3.8 6.6M2 12h2M5.2 18.8L3.8 17.4M12 20v-2M18.8 18.8L17.4 17.4M22 12h-2M18.8 5.2L17.4 6.6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, profileOpen, setProfileOpen, notificationsRef, profileRef, notificationsWrapperRef, profileWrapperRef } = useDropdowns()

  return (
    <header
      className="
        w-full 
        flex flex-col md:flex-row 
        items-start md:items-center justify-between
        gap-6 md:gap-4
        bg-linear-to-r from-slate-900 via-slate-800 to-slate-900
        backdrop-blur-xl border border-emerald-700/30
        p-6 rounded-2xl shadow-2xl
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative group shrink-0">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-teal-500/30 rounded-xl blur-lg" />
          <div
            className="
              relative p-3 rounded-xl border border-emerald-500/30 
              bg-gradient-to-br from-emerald-600/20 to-teal-600/20
              group-hover:border-emerald-400/50 transition-all
            "
          >
            <RecycleIcon
              className="text-emerald-400 animate-spin"
              style={{ animationDuration: "6s" }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1
            className="
              text-xl md:text-2xl font-bold
              bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 
              bg-clip-text text-transparent
            "
          >
            Welcome, Collector
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            You're making impact happen. Let's verify it.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">

        {/* Impact Badge */}
        <div
          className="
            px-5 py-2.5 rounded-xl 
            bg-gradient-to-r from-emerald-900/40 to-teal-900/40
            border border-emerald-600/40 backdrop-blur-sm 
            flex items-center gap-2
          "
        >
          <span className="text-slate-300 text-sm font-medium">Impact:</span>
          <span
            className="
              font-bold text-xl 
              bg-gradient-to-r from-emerald-300 to-teal-300 
              bg-clip-text text-transparent
            "
          >
            742
          </span>
        </div>

        {/* Notification Button + Dropdown */}
        <div ref={notificationsWrapperRef} className="relative">
          <button
            onClick={() => setNotificationsOpen((v) => !v)}
            aria-expanded={notificationsOpen}
            className="relative p-3 rounded-xl 
            bg-slate-800/60 border border-emerald-700/30 
            hover:bg-slate-700/60 hover:border-emerald-500/50 
            hover:scale-105 transition-all 
            backdrop-blur-sm group"
          >
            <svg
              className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 
                   1.055-.595 1.436L4 17h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Badge */}
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-400 text-slate-900">3</span>
          </button>

          {notificationsOpen && (
            <div ref={notificationsRef} className="absolute right-0 mt-2 w-80 bg-slate-900/80 border border-emerald-900/30 rounded-xl shadow-lg backdrop-blur-xl z-50 overflow-hidden">
              <div className="p-3">
                <div className="text-sm font-semibold text-slate-100 mb-2">Notifications</div>
                <ul className="space-y-2 max-h-64 overflow-auto">
                  <li className="p-2 rounded-md bg-slate-800/50 border border-emerald-900/20">
                    <div className="text-sm text-slate-100 font-medium">Proof approved</div>
                    <div className="text-xs text-slate-400">Your proof #1 was approved</div>
                  </li>
                  <li className="p-2 rounded-md bg-slate-800/50 border border-emerald-900/20">
                    <div className="text-sm text-slate-100 font-medium">Payout processed</div>
                    <div className="text-xs text-slate-400">₹2,400 paid out to your wallet</div>
                  </li>
                  <li className="p-2 rounded-md bg-slate-800/50 border border-emerald-900/20">
                    <div className="text-sm text-slate-100 font-medium">New challenge</div>
                    <div className="text-xs text-slate-400">Join the month-long collection drive</div>
                  </li>
                </ul>
              </div>
              <div className="border-t border-emerald-900/20 p-2 text-center bg-slate-900/70">
                <button className="text-sm text-emerald-300 hover:underline">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Bubble + Menu */}
        <div ref={profileWrapperRef} className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="relative group shrink-0"
            aria-expanded={profileOpen}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 ring-2 ring-emerald-400/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-slate-900 font-bold text-lg">C</span>
            </div>
          </button>

          {profileOpen && (
              <div ref={profileRef} className="absolute right-0 mt-2 w-44 bg-slate-900/80 border border-emerald-900/30 rounded-xl shadow-lg backdrop-blur-xl z-50">
                <ProfileMenu setProfileOpen={setProfileOpen} />
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

// Header component helpers: state and click-outside handling
function useDropdowns() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)
  const notificationsWrapperRef = useRef<HTMLDivElement | null>(null)
  const profileWrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (notificationsOpen) {
        const wrapper = notificationsWrapperRef.current
        if (wrapper && !wrapper.contains(target)) setNotificationsOpen(false)
      }
      if (profileOpen) {
        const wrapper = profileWrapperRef.current
        if (wrapper && !wrapper.contains(target)) setProfileOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNotificationsOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [notificationsOpen, profileOpen])

  return { notificationsOpen, setNotificationsOpen, profileOpen, setProfileOpen, notificationsRef, profileRef, notificationsWrapperRef, profileWrapperRef }
}

export default Header;

// Profile menu component: handles navigation and logout
function ProfileMenu({ setProfileOpen }: { setProfileOpen: (v: boolean) => void }) {
  const navigate = useNavigate()

  const goProfile = () => {
    setProfileOpen(false)
    navigate('/profile')
  }
  const goSettings = () => {
    setProfileOpen(false)
    navigate('/settings')
  }
  const onLogout = () => {
    // Clear client-side session state and redirect to home
    localStorage.clear()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <div className="p-2">
      <button onClick={goProfile} className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-100 hover:bg-slate-800/50">View profile</button>
      <button onClick={goSettings} className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-100 hover:bg-slate-800/50">Settings</button>
      <div className="border-t border-emerald-900/20 mt-2 pt-2">
        <button onClick={onLogout} className="w-full text-left px-3 py-2 rounded-md text-sm text-amber-400 hover:bg-slate-800/50">Logout</button>
      </div>
    </div>
  )
}
