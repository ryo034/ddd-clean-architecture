import { Me } from "shared"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
  me: Me | null
  isLoading: boolean
}

type Actions = {
  set: (v: Me | null) => void
  setIsLoading: (v: boolean) => void
}

export const meStore = create(
  immer<State & Actions>((set) => ({
    me: null,
    isLoading: false,
    set: (v: Me | null) => set({ me: v }),
    setIsLoading: (v: boolean) => set({ isLoading: v })
  }))
)

export type MeStoreType = typeof meStore
