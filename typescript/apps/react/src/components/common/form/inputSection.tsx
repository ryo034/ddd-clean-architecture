import { FC, ReactNode } from "react"
import { FormErrorMessage } from "~/components/common/form/errorMessage"
import { Input, InputProps } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface Props extends InputProps {
  showLabel?: boolean
  fullWidth?: boolean
  title: string
  errorMessage: string
  autoComplete?: string
  prefixElm?: ReactNode
  suffixElm?: ReactNode
  customClass?: string[]
  rootClass?: string[]
}

export const FormInputSection: FC<Props> = ({
  showLabel = true,
  fullWidth = false,
  title,
  id,
  type,
  placeholder,
  autoComplete,
  prefixElm,
  suffixElm,
  reactHookForm,
  errorMessage,
  customClass,
  rootClass
}) => {
  return (
    <div className={rootClass?.join(" ")}>
      <Label id={id} title={title} className={showLabel ? "" : "sr-only"} />
      {!(suffixElm && prefixElm) ? (
        <Input
          className={customClass ? customClass.join(" ") : ""}
          autoComplete={autoComplete}
          fullWidth={fullWidth}
          id={id}
          type={type}
          placeholder={placeholder}
          reactHookForm={reactHookForm}
        />
      ) : (
        <div className="flex space-x-4 items-center relative">
          {prefixElm}
          <Input
            className={customClass ? customClass.join(" ") : ""}
            fullWidth={fullWidth}
            autoComplete={autoComplete}
            id={id}
            type={type}
            placeholder={placeholder}
            reactHookForm={reactHookForm}
          />
          {suffixElm}
        </div>
      )}
      <FormErrorMessage dataTestId={`${id}-errorMessage`} message={errorMessage} />
    </div>
  )
}
