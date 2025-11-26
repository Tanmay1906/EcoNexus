import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Role = 'corporate' | 'upcycler' | 'admin'

const ROLE_COPY: Record<Role, { heading: string; tagline: string }> = {
  corporate: {
    heading: 'Corporate Login',
    tagline: 'Access offset dashboards, validate credit usage, and oversee compliance.',
  },
  upcycler: {
    heading: 'Upcycler Login',
    tagline: 'Manage material intake, showcase product impact, and sync with collectors.',
  },
  admin: {
    heading: 'Admin Login',
    tagline: 'Monitor ecosystem health, orchestrate stakeholders, and secure integrity.',
  },
}

const ROLE_LABELS: Record<Role, string> = {
  corporate: 'Corporate',
  upcycler: 'Upcycler',
  admin: 'Admin',
}

export const CUMELogin = () => {
  const [role, setRole] = useState<Role>('corporate')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const MOCK_CREDENTIALS: Record<Role, { email: string; password: string }> = {
    corporate: { email: 'corp@example.com', password: 'Corp123!' },
    upcycler: { email: 'upcycler@example.com', password: 'Upc123!' },
    admin: { email: 'admin@plastify.io', password: 'Admin123!' },
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const expected = MOCK_CREDENTIALS[role]
    if (email.trim() === expected.email && password === expected.password) {
      // Successful (mock) login -> navigate to role dashboard
      if (role === 'upcycler') {
        navigate('/dashboard/cume/upcycler-dashboard')
      } else {
        navigate(`/dashboard/cume/${role}`)
      }
      return
    }
    setError('Invalid credentials for the selected role.')
  }

  const fillMock = (forRole?: Role) => {
    const r = forRole ?? role
    const expected = MOCK_CREDENTIALS[r]
    setRole(r)
    setEmail(expected.email)
    setPassword(expected.password)
    setError('')
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/CUME.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-900/60" aria-hidden />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-xl rounded-3xl border border-cyan-200/40 bg-cyan-200/15 p-8 shadow-[0_24px_70px_rgba(34,211,238,0.3)] backdrop-blur-2xl">
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                {ROLE_COPY[role].heading}
              </h1>
              <p className="mt-3 text-sm text-white/80 sm:text-base">{ROLE_COPY[role].tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right text-xs text-white/60">
              <span className="uppercase tracking-[0.45em]">Eco Nexus</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-medium">
                Unified Credits
              </span>
            </div>
          </div>

          <div className="mb-8 rounded-full bg-white/10 p-1">
            <div className="grid grid-cols-3 gap-1">
              {(Object.keys(ROLE_LABELS) as Role[]).map((key) => {
                const isActive = key === role
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-sm ${
                      isActive
                        ? 'bg-white/95 text-cyan-800 shadow-lg shadow-cyan-400/30'
                        : 'text-white/75 hover:bg-white/15'
                    }`}
                  >
                    {ROLE_LABELS[key]}
                  </button>
                )
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <button type="button" className="text-sm font-medium text-cyan-200 hover:text-white">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-cyan-200/90 px-4 py-3 text-base font-semibold text-cyan-900 transition-all duration-200 hover:bg-cyan-100"
            >
              Sign in as {ROLE_LABELS[role]}
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fillMock()}
                className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/20"
              >
                Quick fill for {ROLE_LABELS[role]}
              </button>
              <button
                type="button"
                onClick={() => fillMock('admin')}
                className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/20"
              >
                Fill Admin
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

          <p className="mt-8 text-center text-sm text-white/70">
            New to the platform?{' '}
            <Link
              to="/auth/cume/register"
              className="font-semibold text-cyan-200 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Register as a {ROLE_LABELS[role]}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
