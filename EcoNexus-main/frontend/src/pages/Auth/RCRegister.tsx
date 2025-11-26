import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Role = 'recycler' | 'collector'

const ROLE_COPY: Record<Role, { heading: string; tagline: string }> = {
  recycler: {
    heading: 'Recycler Registration',
    tagline: 'Partner with collectors, optimize sorting, and elevate your circular operations.',
  },
  collector: {
    heading: 'Collector Registration',
    tagline: 'Join the network, streamline pickups, and maximize recovered materials.',
  },
}

const ROLE_LABELS: Record<Role, string> = {
  recycler: 'Recycler',
  collector: 'Collector',
}

const RCRegister = () => {
  const [role, setRole] = useState<Role>('recycler')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Integrate registration logic here.
    // On success, redirect to the dashboard matching role.
    navigate(`/dashboard/rc/${role}`)
  }

  const handleScroll = () => {
    setIsScrolling(true)
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 600)
  }

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/RC.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-10 sm:px-8">
        <div className="flex w-full max-w-2xl flex-col rounded-3xl border border-emerald-200/40 bg-emerald-200/15 p-8 shadow-[0_24px_70px_rgba(16,185,129,0.3)] backdrop-blur-2xl md:p-12 max-h-[85vh] overflow-hidden">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                {ROLE_COPY[role].heading}
              </h1>
              <p className="mt-3 text-sm text-white/80 sm:text-base md:text-lg">{ROLE_COPY[role].tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right text-xs text-white/60">
              <span className="uppercase tracking-[0.35em]">Eco Nexus</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-medium">
                Circularity Hub
              </span>
            </div>
          </div>

          <div className="mb-10 rounded-full bg-white/10 p-1">
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(ROLE_LABELS) as Role[]).map((key) => {
                const isActive = key === role
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-6 sm:py-3 sm:text-base ${
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

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`glass-scroll flex-1 space-y-8 overflow-y-auto pr-1 ${isScrolling ? 'show-scrollbar' : ''}`}
          >
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 pb-4">
              <div className="md:col-span-2">
                <label htmlFor="organization" className="block text-sm font-medium text-white/80">
                  Organization / Team Name
                </label>
                <input
                  id="organization"
                  type="text"
                  required
                  placeholder="Enter organization name"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-white/80">
                  Contact person
                </label>
                <input
                  id="contactName"
                  type="text"
                  required
                  placeholder="Full name"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Create password"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm password"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="coverage" className="block text-sm font-medium text-white/80">
                  Coverage locations
                </label>
                <input
                  id="coverage"
                  type="text"
                  required
                  placeholder="List operational cities or zones"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-white/80">
                  Additional details
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Share certifications, capacity, or specialties"
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-emerald-300 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-200/70"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 mt-4 w-full rounded-2xl bg-emerald-300/90 px-4 py-3 text-base font-semibold text-emerald-950 transition-all duration-200 hover:bg-emerald-200"
              >
                Register as {ROLE_LABELS[role]}
              </button>
            </form>

            <p className="text-center text-sm text-white/70">
              Already partnered with Eco Nexus?{' '}
              <Link
                to="/auth/rc/login"
                className="font-semibold text-emerald-200 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                Log in as a {ROLE_LABELS[role]}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RCRegister

