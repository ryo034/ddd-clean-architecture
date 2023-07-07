
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { ThemeInteractor } from "../../../src/usecase/theme/interactor"
import { ThemeDriver } from "../../../src/driver";
import { ThemeUseCaseOutput } from "../../../src/usecase/theme/output";

describe("ThemeInteractor", () => {
  beforeAll(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
  });

  afterAll(() => {
    global.localStorage.clear();
  });

  it("adapt firebase user ", () => {
    const mockDriver = new ThemeDriver(localStorage)
    vi.spyOn(mockDriver, 'get').mockImplementation(() => true);
    const mockPresenter = vi.mocked(<ThemeUseCaseOutput>({ set: vi.fn().mockImplementation(() => null) }));
    const interactor = new ThemeInteractor(mockDriver, mockPresenter)
    interactor.get()
    expect(mockPresenter.set).toBeCalledWith(true)
  })
})
