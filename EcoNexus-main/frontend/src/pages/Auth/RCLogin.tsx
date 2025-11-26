import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Role = 'recycler' | 'collector'

const ROLE_COPY: Record<Role, { heading: string; tagline: string }> = {
  recycler: {
    heading: 'Recycler Login',
    tagline: 'Coordinate drop-offs, track pickups, and keep your materials moving.',
  },
  collector: {
    heading: 'Collector Login',
    tagline: 'Stay on schedule, manage assignments, and confirm fulfilled pickups.',
  },
}

const ROLE_LABELS: Record<Role, string> = {
  recycler: 'Recycler',
  collector: 'Collector',
}

const RCLogin = () => {
  const [role, setRole] = useState<Role>('recycler')
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const MOCK_CREDENTIALS: Record<Role, { email: string; password: string }> = {
    recycler: { email: 'recycler@example.com', password: 'Recyc123!' },
    collector: { email: 'collector@example.com', password: 'Collect123!' },
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const expected = MOCK_CREDENTIALS[role]
    if (email.trim() === expected.email && password === expected.password) {
      if (role === 'recycler') {
        navigate('/dashboard/rc/recycler-dashboard')
      } else {
        navigate('/dashboard/rc/collector')
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
      style={{ backgroundImage: "url('/RC.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md rounded-3xl border border-emerald-200/40 bg-emerald-200/15 p-8 shadow-[0_20px_60px_rgba(16,185,129,0.35)] backdrop-blur-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                {ROLE_COPY[role].heading}
              </h1>
              <p className="mt-3 text-sm text-white/80 sm:text-base">{ROLE_COPY[role].tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right text-xs text-white/60">
              <span className="uppercase tracking-[0.35em]">Eco Nexus</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-medium">
                Circularity Hub
              </span>
            </div>
          </div>

          <div className="mb-8 rounded-full bg-white/10 p-1">
            {/** Role toggle */}
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(ROLE_LABELS) as Role[]).map((key) => {
                const isActive = key === role
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-base ${
                      isActive
                        ? 'bg-white/90 text-emerald-700 shadow-lg shadow-emerald-500/30'
                        : 'text-white/75 hover:bg-white/20'
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
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <button type="button" className="text-sm font-medium text-emerald-200 hover:text-white">
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
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-300/90 px-4 py-3 text-base font-semibold text-emerald-950 transition-all duration-200 hover:bg-emerald-200"
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
              onClick={() => fillMock('collector')}
              className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/20"
            >
              Fill Collector
            </button>
          </div>
          </form>
          {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

          <p className="mt-8 text-center text-sm text-white/70">
            Need an account?{' '}
            <Link
              to="/auth/rc/register"
              className="font-semibold text-emerald-200 underline-offset-2 transition-colors hover:text-white hover:underline"
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

export default RCLogin

