import { describe, expect, it } from "vitest"
import { Password } from "../../../src/domain/shared"

describe("Password", () => {
  describe("create", () => {
    it("DomainError", () => {
      expect(Password.create("").isErr).toBeTruthy()
      expect(Password.create("a".repeat(Password.max + 1)).isErr).toBeTruthy()
      expect(Password.create("testtest").isErr).toBeTruthy()
      expect(Password.create("AAAAAAAA").isErr).toBeTruthy()
      expect(Password.create("test123").isErr).toBeTruthy()
      expect(Password.create("@test123").isErr).toBeTruthy()
      expect(
        Password.create(
          "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVA1"
        ).isErr
      ).toBeTruthy()
      expect(Password.create("A").isErr).toBeTruthy()
      expect(Password.create("1").isErr).toBeTruthy()
      expect(Password.create("@").isErr).toBeTruthy()
      expect(Password.create("A1").isErr).toBeTruthy()
      expect(Password.create("A@").isErr).toBeTruthy()
      expect(Password.create("1@").isErr).toBeTruthy()
      expect(Password.create("A1@").isErr).toBeTruthy()
    })
    it("OK", () => {
      expect(Password.create("Test123").isOk).toBeTruthy()
      expect(Password.create("@Test123").isOk).toBeTruthy()
    })
  })
})
