import { ThemeUseCaseOutput } from "shared"
import { ThemeStoreType } from "~/store/theme/store"

export class ThemePresenter implements ThemeUseCaseOutput {
  constructor(private readonly themeStore: ThemeStoreType) {}

  set(v: boolean) {
    this.themeStore.getState().set(v)
  }
}
