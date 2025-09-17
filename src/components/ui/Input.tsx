import React from "react"
import { cn } from "../../lib/utils"

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      {...props}
    />
  )
}
