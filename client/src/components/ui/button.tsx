import React from "react"
import { cn } from "../../lib/utils"

export function Button({ 
  children, 
  className = "", 
  variant = "default", 
  size = "md", 
  ...props 
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    ghost: "bg-transparent hover:bg-accent text-foreground",
    outline: "border border-gray-300 hover:bg-accent",
  }

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
