import { Entity } from "~/domain/shared"

interface Props {
  limit: number
  cursor: string
}

export class CursorPagination extends Entity<Props> {
  static create(v: Props): CursorPagination {
    return new CursorPagination(v)
  }

  get limit(): number {
    return this.value.limit
  }

  get cursor(): string {
    return this.value.cursor
  }
}
