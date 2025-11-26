import React from "react";
import { NavLink } from "react-router-dom";

/* ---------------- ICON COMPONENTS (Memoized) ---------------- */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {children}
  </svg>
);

const DashboardIcon = () => (
  <Icon>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </Icon>
);

const UploadIcon = () => (
  <Icon>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <path d="M17 8l-5-5-5 5M12 3v12" />
  </Icon>
);

const HistoryIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);

const WalletIcon = () => (
  <Icon>
    <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5" />
    <path d="M16 12h5m-3-2a2 2 0 100 4 2 2 0 000-4z" />
  </Icon>
);

const LeaderboardIcon = () => (
  <Icon>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Icon>
);

const LearningIcon = () => (
  <Icon>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </Icon>
);

const HelpIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
  </Icon>
);

/* ---------------- MENU ITEMS ---------------- */

const items = [
  { to: "/dashboard/rc/collector", label: "Dashboard", icon: DashboardIcon },
  { to: "/dashboard/rc/upload", label: "Upload Proof", icon: UploadIcon },
  { to: "/dashboard/rc/history", label: "History", icon: HistoryIcon },
  { to: "/dashboard/rc/wallet", label: "Wallet", icon: WalletIcon },
  { to: "/dashboard/rc/leaderboard", label: "Leaderboard", icon: LeaderboardIcon },
  { to: "/dashboard/rc/learning", label: "Learning Center", icon: LearningIcon },
  { to: "/support", label: "Help & Support", icon: HelpIcon },
];

/* ---------------- SIDEBAR ---------------- */

const Sidebar: React.FC = () => {
  const isCollapsed = false;

  return (
    <aside
      className={`
        sticky top-6 max-h-[90vh] overflow-hidden hover:overflow-auto
        transition-all duration-300
        ${isCollapsed ? "w-20" : "w-72"}
        bg-gradient-to-b from-slate-900/95 to-slate-800/95
        backdrop-blur-xl border border-emerald-900/40 
        rounded-2xl shadow-2xl
      `}
    >
      {/* Header */}
      <div className="relative p-6 border-b border-emerald-900/30">
        {!isCollapsed && (
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-emerald-100">Navigation</h2>
            <p className="text-xs text-slate-400">Manage your recycling journey</p>
          </div>
        )}

        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      {/* Nav Items */}
      <nav className="p-4 space-y-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
              group relative flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200

              ${
                isActive
                  ? "bg-gradient-to-r from-emerald-900/60 to-emerald-800/40 text-emerald-100 shadow-md shadow-emerald-900/20"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-emerald-200"
              }

              ${isCollapsed ? "justify-center" : ""}
            `
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                <div
                  className={
                    isActive
                      ? "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-emerald-400 to-emerald-600 rounded-r-full"
                      : "hidden"
                  }
                />

                {/* Icon */}
                <div className="flex-shrink-0 transition-colors text-slate-400 group-hover:text-emerald-400">
                  <Icon />
                </div>

                {/* Label */}
                {!isCollapsed && <span className="font-medium text-sm">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Glow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-emerald-900/40 to-transparent rounded-full" />
    </aside>
  );
};

export default Sidebar;
