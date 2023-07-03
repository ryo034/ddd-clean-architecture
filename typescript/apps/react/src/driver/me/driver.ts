import { Axios } from "axios"
import { Result } from "true-myth"
import { ErrorHandler } from "~/infrastructure/error/handler"
import { PromiseResult } from "~/infrastructure/shared/result"

export interface MeResponse {
  id: string
  name: string
  email: string
  emailVerified: boolean
}
interface LoginResponse {
  me: MeResponse
}

interface RegisterCompleteResponse {
  me: MeResponse
}

interface FindResponse {
  me: MeResponse
}

export class MeDriver {
  constructor(private readonly client: Axios) {}

  async login(): PromiseResult<LoginResponse, Error> {
    try {
      // const res = await this.client.login(new LoginRequest())
      // return Result.ok(res)
      return Result.ok({
        me: {
          id: "id",
          name: "name",
          email: "email",
          emailVerified: true
        }
      })
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  async registerComplete(): PromiseResult<RegisterCompleteResponse, Error> {
    try {
      // const res = await this.client.registerComplete(new RegisterCompleteRequest())
      // return Result.ok(res)
      return Result.ok({
        me: {
          id: "id",
          name: "name",
          email: "email",
          emailVerified: true
        }
      })
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }

  async find(): PromiseResult<FindResponse, Error> {
    try {
      // const res = await this.client.find(new FindRequest())
      // return Result.ok(res)
      return Result.ok({
        me: {
          id: "id",
          name: "name",
          email: "email",
          emailVerified: true
        }
      })
    } catch (e) {
      return Result.err(ErrorHandler.adapt(e))
    }
  }
}
