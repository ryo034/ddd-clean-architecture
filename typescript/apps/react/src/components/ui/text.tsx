import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"
import { cn } from "shared"

const variables = cva("text-sm font-light text-gray-500 dark:text-gray-400", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: ""
    }
  },
  defaultVariants: {
    fullWidth: false
  }
})

export interface TextProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof variables> {
  asChild?: boolean
}

const Text = forwardRef<HTMLDivElement, TextProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "p"
  return <Comp className={cn(variables({ className }))} ref={ref} {...props} />
})
Text.displayName = "Text"

export { Text, variables }
