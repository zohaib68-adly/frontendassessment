"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Types for the steps progress component
export interface Step {
  id: string
  label: string
  description?: string
  status?: "completed" | "current" | "upcoming"
}

// Step variants using class-variance-authority
const stepVariants = cva(
  "relative flex items-center justify-center rounded-full border-2 transition-all duration-200",
  {
    variants: {
      status: {
        completed: "bg-accent shadow-sm",
        current: "bg-accent shadow-md",
        upcoming: "bg-secondary/20",
      },
      size: {
        sm: "h-6 w-6 text-xs",
        default: "h-4 w-4 text-xs",
        lg: "h-10 w-10 text-sm",
      },
    },
    defaultVariants: {
      status: "upcoming",
      size: "default",
    },
  }
)

const stepConnectorVariants = cva(
  "h-0.5 transition-all duration-300",
  {
    variants: {
      status: {
        completed: "bg-accent",
        upcoming: "bg-secondary/20",
      },
    },
    defaultVariants: {
      status: "upcoming",
    },
  }
)

interface StepItemProps extends VariantProps<typeof stepVariants> {
  step: Step
  index: number
  isLast: boolean
  showConnector?: boolean
  orientation?: "horizontal" | "vertical"
  className?: string
}

const StepItem = React.forwardRef<HTMLDivElement, StepItemProps>(
  ({ step, index, isLast, showConnector = true, orientation = "horizontal", size, className }, ref) => {
    const isCompleted = step.status === "completed"
    
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center",
            className
          )}
        >
          {/* Step Circle for Vertical */}
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                stepVariants({ status: step.status, size }),
                "relative z-10 flex-shrink-0"
              )}
            >
              {isCompleted ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>

            {/* Vertical Connector Line */}
            {showConnector && !isLast && (
              <div
                className={cn(
                  stepConnectorVariants({ status: isCompleted ? "completed" : "upcoming" }),
                  "absolute top-full left-1/2 h-8 w-0.5 -translate-x-1/2"
                )}
              />
            )}
          </div>
        </div>
      )
    }

    // Horizontal orientation
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center w-full",
          className
        )}
      >
        {/* Step Circle for Horizontal */}
        <div
          className={cn(
            stepVariants({ status: step.status, size }),
            "relative z-10 flex-shrink-0"
          )}
        >
          {isCompleted ? (
            <Check className="h-3 w-3" />
          ) : (
            <span className="font-semibold">{index + 1}</span>
          )}
        </div>

        {/* Horizontal Connector Line */}
        {showConnector && !isLast && (
          <div
            className={cn(
              stepConnectorVariants({ status: isCompleted ? "completed" : "upcoming" }),
              "ml-2 mr-2 flex-1"
            )}
          />
        )}
      </div>
    )
  }
)

StepItem.displayName = "StepItem"

// Main Steps Progress Component
export interface StepsProgressProps extends VariantProps<typeof stepVariants> {
  steps: Step[]
  currentStep?: number
  orientation?: "horizontal" | "vertical"
  showConnector?: boolean
  className?: string
  onStepClick?: (stepIndex: number) => void
  clickable?: boolean
}

const StepsProgress = React.forwardRef<HTMLDivElement, StepsProgressProps>(
  ({ 
    steps, 
    currentStep = 0, 
    orientation = "horizontal", 
    showConnector = true, 
    size, 
    className,
    onStepClick,
    clickable = false,
    ...props 
  }, ref) => {
    
    // Auto-determine step statuses based on currentStep if not provided
    const processedSteps = steps.map((step, index) => ({
      ...step,
      status: step.status || (
        index < currentStep ? "completed" as const :
        index === currentStep ? "current" as const :
        "upcoming" as const
      )
    }))

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" 
            ? "flex-row items-center" 
            : "flex-col items-center space-y-4",
          className
        )}
        {...props}
      >
        {processedSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            {orientation === "vertical" ? (
              <div
                className={cn(
                  "relative flex flex-col items-center",
                  clickable && "cursor-pointer hover:opacity-80 transition-opacity"
                )}
                onClick={clickable && onStepClick ? () => onStepClick(index) : undefined}
              >
                <StepItem
                  step={step}
                  index={index}
                  isLast={index === processedSteps.length - 1}
                  showConnector={showConnector}
                  orientation={orientation}
                  size={size}
                />
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "relative flex items-center justify-center",
                    clickable && "cursor-pointer hover:opacity-80 transition-opacity"
                  )}
                  onClick={clickable && onStepClick ? () => onStepClick(index) : undefined}
                >
                  <div
                    className={cn(
                        stepVariants({ status: step.status === "completed" || step.status === 'current' ? "completed" : "upcoming", size }),
                      "relative z-10 flex-shrink-0"
                    )}
                  >
                  </div>
                </div>
                
                            {/* Horizontal Connector */}
                         
                {showConnector && index < processedSteps.length - 1 && (
                  <div
                    className={cn(
                      stepConnectorVariants({ 
                        status: step.status === "completed"  ? "completed" : "upcoming" 
                      }),
                      "flex-1 mx-2"
                    )}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)

StepsProgress.displayName = "StepsProgress"

// Additional utility components for more complex step layouts
const StepsProgressGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-6", className)}
    {...props}
  />
))

StepsProgressGroup.displayName = "StepsProgressGroup"

export {
  StepsProgress,
  StepsProgressGroup,
} 