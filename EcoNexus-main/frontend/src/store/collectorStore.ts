import { create } from 'zustand'

type Proof = { id: string; date: string; weight: number; hash?: string; status: 'pending' | 'approved' | 'rejected'; adminComment?: string }

type State = {
  proofs: Proof[]
  addProof: (p: Proof) => void
}

export const useCollectorStore = create<State>((set) => ({
  proofs: [
    { id: '1', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), weight: 12, hash: 'ab12cd34', status: 'approved', adminComment: 'Verified' },
    { id: '2', date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), weight: 8, hash: 'ef56gh78', status: 'pending' },
  ],
  addProof: (p) => set((s) => ({ proofs: [p, ...s.proofs] })),
}))

export type { Proof }
