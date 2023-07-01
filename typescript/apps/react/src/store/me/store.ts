import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { Me } from "~/domain/me"

type State = {
  me: Me | null
}

type Actions = {
  set: (v: Me | null) => void
}

export const meStore = create(
  immer<State & Actions>((set) => ({
    me: null,
    set: (v: Me | null) => set({ me: v })
  }))
)

export type MeStoreType = typeof meStore
