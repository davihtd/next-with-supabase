"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-b last:border-b-0", className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = "CardHeader"

export const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 py-3 border-t", className)} {...props}>
      {children}
    </div>
  )
)
CardFooter.displayName = "CardFooter"

export default Card
