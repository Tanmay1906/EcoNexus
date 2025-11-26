import { create } from 'zustand'

type WalletState = {
  balance: number
  recentPayout: number
  nextPayoutDate: string
  setBalance: (b: number) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 12450,
  recentPayout: 2400,
  nextPayoutDate: '2025-12-05',
  setBalance: (b) => set({ balance: b }),
}))

export default useWalletStore
