import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Role = 'corporate' | 'upcycler' | 'admin'

type CorporateIdType = 'CIN' | 'GSTIN' | 'BusinessID'

type CorporateFormState = {
  companyName: string
  companyEmail: string
  idType: CorporateIdType
  registrationId: string
  contactPerson: string
  contactNumber: string
  registeredAddress: string
  industryType: string
  esgOfficer: string
  walletAddress: string
  walletSignature: string
  password: string
  confirmPassword: string
  proofDocument: File | null
}

type UpcyclerFormState = {
  organizationName: string
  representativeName: string
  email: string
  contactNumber: string
  upcyclingType: string
  password: string
  confirmPassword: string
  location: string
  portfolio: File | null
}

type AdminFormState = {
  fullName: string
  officialEmail: string
  role: string
  password: string
  confirmPassword: string
  twoFactorCode: string
  walletAddress: string
  walletSignature: string
  accessKey: string
}

type FormState = {
  corporate: CorporateFormState
  upcycler: UpcyclerFormState
  admin: AdminFormState
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_NUMBER_REGEX = /^\d{10,15}$/
const PERSON_NAME_REGEX = /^[A-Za-z\s'.-]+$/
const WALLET_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d][Z][A-Z\d]$/
const CIN_REGEX = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/
const BUSINESS_ID_REGEX = /^[A-Z0-9]{8,25}$/
const CORPORATE_PROOF_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg']
const CORPORATE_PROOF_MAX_SIZE = 5 * 1024 * 1024
const UPCYCLER_PROOF_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const UPCYCLER_PROOF_MAX_SIZE = 10 * 1024 * 1024
const ADMIN_EMAIL_DOMAINS = ['plastify.io']
const ADMIN_ACCESS_KEY = 'PLASTIFY-ACCESS-KEY'
const GENERIC_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']
const INDUSTRY_OPTIONS = ['FMCG', 'Retail', 'Automotive', 'Consumer Goods', 'Technology', 'Energy', 'Manufacturing']
const UPCYCLING_TYPE_OPTIONS = ['Textile', 'Product', 'Art', 'Furniture', 'Packaging', 'Construction']
const ADMIN_ROLES = ['Verification', 'Compliance', 'Super Admin']
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
const ADMIN_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }
}

const ROLE_COPY: Record<Role, { heading: string; tagline: string }> = {
  corporate: {
    heading: 'Corporate Registration',
    tagline: 'Set up governance, align offsets, and accelerate your ESG milestones.',
  },
  upcycler: {
    heading: 'Upcycler Registration',
    tagline: 'Showcase transformed materials, track inventories, and unlock marketplace demand.',
  },
  admin: {
    heading: 'Admin Registration',
    tagline: 'Configure programs, onboard partners, and safeguard platform integrity.',
  },
}

const ROLE_LABELS: Record<Role, string> = {
  corporate: 'Corporate',
  upcycler: 'Upcycler',
  admin: 'Admin',
}

const CUMERegister = () => {
  const [role, setRole] = useState<Role>('corporate')
  const [formState, setFormState] = useState<FormState>({
    corporate: {
      companyName: '',
      companyEmail: '',
      idType: 'CIN',
      registrationId: '',
      contactPerson: '',
      contactNumber: '',
      registeredAddress: '',
      industryType: '',
      esgOfficer: '',
      walletAddress: '',
      walletSignature: '',
      password: '',
      confirmPassword: '',
      proofDocument: null,
    },
    upcycler: {
      organizationName: '',
      representativeName: '',
      email: '',
      contactNumber: '',
      upcyclingType: '',
      password: '',
      confirmPassword: '',
      location: '',
      portfolio: null,
    },
    admin: {
      fullName: '',
      officialEmail: '',
      role: 'Verification',
      password: '',
      confirmPassword: '',
      twoFactorCode: '',
      walletAddress: '',
      walletSignature: '',
      accessKey: '',
    },
  })
  const [errors, setErrors] = useState<Record<Role, Record<string, string>>>({
    corporate: {},
    upcycler: {},
    admin: {},
  })

  const validateCorporateField = (field: keyof CorporateFormState, value: unknown) => {
    switch (field) {
      case 'companyName':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Company name is required.'
        }
        if (value.length > 100) {
          return 'Company name cannot exceed 100 characters.'
        }
        return ''
      case 'companyEmail': {
        const email = typeof value === 'string' ? value.trim() : ''
        if (!EMAIL_REGEX.test(email)) {
          return 'Enter a valid corporate email address.'
        }
        const domain = email.split('@')[1] ?? ''
        if (GENERIC_EMAIL_DOMAINS.includes(domain)) {
          return 'Use your official corporate email domain.'
        }
        return ''
      }
      case 'idType':
        return value ? '' : 'Select an ID type.'
      case 'registrationId': {
        const idValue = typeof value === 'string' ? value.trim().toUpperCase() : ''
        if (!idValue) {
          return 'Provide the registration identifier.'
        }
        const idType = formState.corporate.idType
        if (idType === 'CIN' && !CIN_REGEX.test(idValue)) {
          return 'Enter a valid CIN.'
        }
        if (idType === 'GSTIN' && !GSTIN_REGEX.test(idValue)) {
          return 'Enter a valid GSTIN.'
        }
        if (idType === 'BusinessID' && !BUSINESS_ID_REGEX.test(idValue)) {
          return 'Business ID must be 8-25 alphanumeric characters.'
        }
        return ''
      }
      case 'contactPerson':
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return 'Contact person is required.'
        }
        if (!PERSON_NAME_REGEX.test(value)) {
          return 'Contact person can include letters and limited punctuation only.'
        }
        return ''
      case 'contactNumber':
        return CONTACT_NUMBER_REGEX.test(typeof value === 'string' ? value.trim() : '')
          ? ''
          : 'Contact number must be 10-15 digits.'
      case 'registeredAddress':
        return value && typeof value === 'string' && value.trim().length > 0
          ? ''
          : 'Registered address is required.'
      case 'industryType':
        return value && typeof value === 'string' && value.trim().length > 0
          ? ''
          : 'Select an industry type.'
      case 'esgOfficer':
        if (!value) {
          return ''
        }
        return typeof value === 'string' && PERSON_NAME_REGEX.test(value)
          ? ''
          : 'ESG officer name can include letters and limited punctuation only.'
      case 'walletAddress':
        return WALLET_ADDRESS_REGEX.test(typeof value === 'string' ? value.trim() : '')
          ? ''
          : 'Connect a valid MetaMask wallet address.'
      case 'walletSignature':
        return value && typeof value === 'string'
          ? ''
          : 'MetaMask signature verification required.'
      case 'password':
        return PASSWORD_REGEX.test(typeof value === 'string' ? value : '')
          ? ''
          : 'Password must be 8+ chars with letters, numbers, and special characters.'
      case 'confirmPassword':
        return value === formState.corporate.password ? '' : 'Passwords must match.'
      case 'proofDocument': {
        const file = value as File | null
        if (!file) {
          return 'Proof document upload is required.'
        }
        if (!CORPORATE_PROOF_MIME_TYPES.includes(file.type)) {
          return 'Upload must be a PDF or JPG.'
        }
        if (file.size > CORPORATE_PROOF_MAX_SIZE) {
          return 'File size must be ≤ 5MB.'
        }
        return ''
      }
      default:
        return ''
    }
  }

  const handleCorporateChange = (
    field: keyof CorporateFormState,
  ) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = field === 'proofDocument' ? event.target.files?.[0] ?? null : event.target.value
      setFormState((prev) => ({
        ...prev,
        corporate: {
          ...prev.corporate,
          [field]: value,
        },
      }))
      const validationError = validateCorporateField(field, value)
      setErrors((prev) => ({
        ...prev,
        corporate: {
          ...prev.corporate,
          [field]: validationError,
        },
      }))
    }
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Integrate CUME registration workflow here.
    // On successful registration, redirect to the dashboard matching role.
    navigate(`/dashboard/cume/${role}`)
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
      style={{ backgroundImage: "url('/CUME.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-900/60" aria-hidden />
      <div className="relative z-10 flex h-full items-center justify-center px-4 py-10 sm:px-8">
        <div className="flex w-full max-w-3xl flex-col rounded-3xl border border-cyan-200/40 bg-cyan-200/15 p-8 shadow-[0_24px_70px_rgba(34,211,238,0.3)] backdrop-blur-2xl md:p-12 max-h-[85vh] overflow-hidden">
          <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                {ROLE_COPY[role].heading}
              </h1>
              <p className="mt-3 text-sm text-white/80 sm:text-base md:text-lg">{ROLE_COPY[role].tagline}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right text-xs text-white/60">
              <span className="uppercase tracking-[0.45em]">Eco Nexus</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-medium">
                Unified Credits
              </span>
            </div>
          </div>

          <div className="mb-10 rounded-full bg-white/10 p-1">
            <div className="grid grid-cols-3 gap-1">
              {(Object.keys(ROLE_LABELS) as Role[]).map((key) => {
                const isActive = key === role
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${
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

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className={`glass-scroll flex-1 space-y-8 overflow-y-auto pr-1 ${isScrolling ? 'show-scrollbar' : ''}`}
          >
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 pb-6">
              <div className="md:col-span-2">
                <label htmlFor="entityName" className="block text-sm font-medium text-white/80">
                  Entity / Organization name
                </label>
                <input
                  id="entityName"
                  type="text"
                  required
                  placeholder="Enter official name"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-white/80">
                  Primary contact
                </label>
                <input
                  id="contactName"
                  type="text"
                  required
                  placeholder="Full name"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-white/80">
                  Work email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-white/80">
                  Contact number
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
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
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
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
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="industries" className="block text-sm font-medium text-white/80">
                  Industries / focus areas
                </label>
                <input
                  id="industries"
                  type="text"
                  placeholder="e.g., FMCG, automotive, consumer goods"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="coverage" className="block text-sm font-medium text-white/80">
                  Operational regions
                </label>
                <input
                  id="coverage"
                  type="text"
                  required
                  placeholder="List cities, states, or countries"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="platformGoals" className="block text-sm font-medium text-white/80">
                  Platform goals
                </label>
                <textarea
                  id="platformGoals"
                  rows={4}
                  placeholder="Describe how you plan to use Eco Nexus Unified Credits"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:border-cyan-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-200/70"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 mt-4 w-full rounded-2xl bg-cyan-200/90 px-4 py-3 text-base font-semibold text-cyan-900 transition-all duration-200 hover:bg-cyan-100"
              >
                Register as {ROLE_LABELS[role]}
              </button>
            </form>

            <p className="pb-2 text-center text-sm text-white/70">
              Already onboarded?{' '}
              <Link
                to="/auth/cume/login"
                className="font-semibold text-cyan-200 underline-offset-2 transition-colors hover:text-white hover:underline"
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

export default CUMERegister