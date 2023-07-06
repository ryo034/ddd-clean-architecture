import { Me, MeUseCaseOutput } from "shared"
import { MeStoreType } from "~/store/me/store"

export class MePresenter implements MeUseCaseOutput {
  constructor(private readonly meStore: MeStoreType) {}

  set(v: Me) {
    this.meStore.getState().set(v)
  }

  clear() {
    this.meStore.getState().set(null)
  }
}
