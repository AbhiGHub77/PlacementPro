"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        default: "h-4",
        sm: "h-2",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      indicatorColor: {
        default: "bg-primary",
        gradient: "bg-gradient-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
        dsa: "skill-dsa",
        fundamentals: "skill-fundamentals",
        projects: "skill-projects",
        experience: "skill-experience",
      },
    },
    defaultVariants: {
      indicatorColor: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
      indicatorColor?: VariantProps<typeof progressIndicatorVariants>["indicatorColor"];
    }

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ indicatorColor }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
