import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <main>
        <div className="flex">
          <input
            type={type}
            className={cn(
              "flex h-9 w-full  border-y border-l bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white",
              className
            )}
            ref={ref}
            {...props}
          />
          <Button className="bg-white" />
        </div>
      </main>
    )
  }
)
Input.displayName = "Input"

export { Input }
