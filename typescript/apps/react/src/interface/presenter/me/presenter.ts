import { Me } from "~/domain/me"
import { MeStoreType } from "~/store/me/store"
import { MeUseCaseOutput } from "~/usecase/me/output"

export class MePresenter implements MeUseCaseOutput {
  constructor(private readonly meStore: MeStoreType) {}

  set(v: Me) {
    this.meStore.getState().set(v)
  }

  clear() {
    this.meStore.getState().set(null)
  }
}
