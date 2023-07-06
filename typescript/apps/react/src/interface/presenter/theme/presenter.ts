import { ThemeStoreType } from "~/store/theme/store"
import { ThemeUseCaseOutput } from "shared"

export class ThemePresenter implements ThemeUseCaseOutput {
  constructor(private readonly themeStore: ThemeStoreType) {}

  set(v: boolean) {
    this.themeStore.getState().set(v)
  }
}
