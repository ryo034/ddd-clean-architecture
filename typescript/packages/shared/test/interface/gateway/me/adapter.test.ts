
import { describe, expect, it } from "vitest"
import { MeGatewayAdapter } from "../../../../src/interface/gateway/me/adapter"
import { User } from "../../../../src/domain/user"
import { AccountId, AccountName } from "../../../../src/domain/account"
import { Email, StringId } from "../../../../src/domain/shared"
import { Me } from "../../../../src/domain/me"

describe("MeGatewayAdapter", () => {
  describe("adaptFirebaseUser", () => {
    it("adapt firebase user ", () => {
      const adapter = new MeGatewayAdapter()
      const actual = {
        uid: "uid",
        displayName: "displayName",
        email: "test@example.com",
        emailVerified: true,
      }
      const result = adapter.adaptFirebaseUser(actual)
      const expected = Me.create({
        user: User.create({
          id: new AccountId(new StringId("uid")),
          name: new AccountName("displayName"),
          email: new Email("test@example.com"),
        }),
        emailVerified: true,
      })
      if (result.isErr) {
        throw result.error
      }
      expect(result.value).toStrictEqual(expected)
    })
  })
})
