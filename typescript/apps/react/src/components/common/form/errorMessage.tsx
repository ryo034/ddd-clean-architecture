import { FC } from "react"

interface Props {
  message: string
  dataTestId?: string
}

export const FormErrorMessage: FC<Props> = ({ message, dataTestId }) => {
  return (
    <>
      <span data-testid={dataTestId} className="text-red-600 text-xs">
        {message}
      </span>
    </>
  )
}
