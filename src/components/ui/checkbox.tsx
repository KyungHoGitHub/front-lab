import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {cva} from "class-variance-authority";

const checkboxVariants = cva(
    "peer shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    {
      variants: {
        color: {
          default: "border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
          red: "border-black-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:text-white",
        },
        size: {
          sm: "h-4 w-4",
          md: "h-6 w-6",
        },
      },
      defaultVariants: {
        color: "default",
        size: "md",
      },
    }
)

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: "default" | "red"
  size?: "sm" | "md"
}


const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
    ({ className, variant, size, ...props }, ref) => {
      return (
          <CheckboxPrimitive.Root
              ref={ref}
              className={cn(checkboxVariants({ color: variant, size }), className)}
              {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              <CheckIcon className="size-3.5" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
      )
    }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
