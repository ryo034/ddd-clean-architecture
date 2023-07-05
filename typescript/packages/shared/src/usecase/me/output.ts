import { Me } from "../../domain/me"

export interface MeUseCaseOutput {
  set: (v: Me) => void
  clear: () => void
}
