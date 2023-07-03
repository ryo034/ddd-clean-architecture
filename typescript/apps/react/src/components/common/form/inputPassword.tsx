import { FormErrorMessage } from "./errorMessage"
import { FC, useState } from "react"
import { usePasswordInputComponentMessage } from "~/components/common/form/message"
import { CheckboxWithLabel } from "~/components/ui/checkbox"
import { Input, InputProps } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface Props extends InputProps {
  title: string
  errorMessage: string
  fullWidth?: boolean
  showToggle?: boolean
  isCurrent?: boolean
}

export const FormPasswordInputSection: FC<Props> = ({
  title,
  id,
  placeholder,
  reactHookForm,
  errorMessage,
  fullWidth,
  isCurrent = false,
  showToggle = true
}) => {
  const message = usePasswordInputComponentMessage()
  const [isRevealPassword, setIsRevealPassword] = useState(false)
  return (
    <div>
      <Label id={id} title={title} />
      <Input
        fullWidth={fullWidth}
        id={id}
        type={isRevealPassword ? "text" : "password"}
        autoComplete={isCurrent ? "current-password" : "new-password"}
        placeholder={placeholder}
        reactHookForm={reactHookForm}
      />
      {showToggle && (
        <CheckboxWithLabel
          onClick={() => setIsRevealPassword(!isRevealPassword)}
          id={`${id}-togglePasswordVisibility`}
          data-testid={`${id}-togglePasswordVisibility`}
          label={message.action.showPassword}
        />
      )}
      <FormErrorMessage dataTestId={`${id}-errorMessage`} message={errorMessage} />
    </div>
  )
}
