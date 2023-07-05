import { ThemeInteractor } from "../../../usecase/theme/interactor"

export class ThemeController {
  constructor(private readonly useCase: ThemeInteractor) {}

  toggle(isDark: boolean): null {
    return this.useCase.toggle(isDark)
  }

  init(): void {
    this.useCase.get()
  }
}
