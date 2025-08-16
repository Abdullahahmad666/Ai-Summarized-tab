import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-6 w-11 items-center rounded-full bg-gray-300 data-[state=checked]:bg-blue-600 transition-colors",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="block h-5 w-5 translate-x-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
