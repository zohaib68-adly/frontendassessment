"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { X } from "lucide-react"

// Drawer variants using class-variance-authority
const drawerVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      // Left/Right drawer sizes
      {
        side: ["left", "right"],
        size: "sm",
        class: "w-80 max-w-[80vw]",
      },
      {
        side: ["left", "right"],
        size: "default",
        class: "w-96 max-w-[85vw]",
      },
      {
        side: ["left", "right"],
        size: "lg",
        class: "w-[32rem] max-w-[90vw]",
      },
      {
        side: ["left", "right"],
        size: "xl",
        class: "w-[40rem] max-w-[95vw]",
      },
      {
        side: ["left", "right"],
        size: "full",
        class: "w-full",
      },
      // Top/Bottom drawer sizes
      {
        side: ["top", "bottom"],
        size: "sm",
        class: "h-80 max-h-[80vh]",
      },
      {
        side: ["top", "bottom"],
        size: "default",
        class: "h-96 max-h-[85vh]",
      },
      {
        side: ["top", "bottom"],
        size: "lg",
        class: "h-[32rem] max-h-[90vh]",
      },
      {
        side: ["top", "bottom"],
        size: "xl",
        class: "h-[40rem] max-h-[95vh]",
      },
      {
        side: ["top", "bottom"],
        size: "full",
        class: "h-full",
      },
    ],
    defaultVariants: {
      side: "right",
      size: "default",
    },
  }
)

// Main Drawer component interfaces
export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
}

export interface DrawerContentProps {
  side?: "top" | "bottom" | "left" | "right"
  size?: "sm" | "default" | "lg" | "xl" | "full"
  className?: string
  children?: React.ReactNode
  showCloseButton?: boolean
  closeButtonPosition?: "header" | "custom"
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

// Root Drawer component
const Drawer: React.FC<DrawerProps> = ({ children, open, onOpenChange, modal = true, ...props }) => {
  return (
    <Sheet 
      open={open} 
      onOpenChange={onOpenChange}
      modal={modal}
      {...props}
    >
      {children}
    </Sheet>
  )
}
Drawer.displayName = "Drawer"

// Drawer Trigger component
const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof SheetTrigger>,
  React.ComponentPropsWithoutRef<typeof SheetTrigger>
>(({ className, ...props }, ref) => (
  <SheetTrigger
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
DrawerTrigger.displayName = "DrawerTrigger"

// Drawer Content component with enhanced styling
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  DrawerContentProps
>(({ 
  className, 
  children, 
  side = "right" as const, 
  size = "default" as const,
  showCloseButton = true,
  closeButtonPosition = "header",
  ...props 
}, ref) => {
  return (
    <SheetContent
      ref={ref}
      side={side}
      className={cn(
        drawerVariants({ side, size }),
        className
      )}
      {...props}
    >
      {showCloseButton && closeButtonPosition === "custom" && (
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      )}
      {children}
    </SheetContent>
  )
})
DrawerContent.displayName = "DrawerContent"

// Drawer Header component
const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  DrawerHeaderProps
>(({ className, ...props }, ref) => (
  <SheetHeader
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-6 pb-4",
      className
    )}
    {...props}
  />
))
DrawerHeader.displayName = "DrawerHeader"

// Drawer Footer component
const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  DrawerFooterProps
>(({ className, ...props }, ref) => (
  <SheetFooter
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4",
      className
    )}
    {...props}
  />
))
DrawerFooter.displayName = "DrawerFooter"

// Drawer Title component
const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <SheetTitle
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

// Drawer Description component
const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <SheetDescription
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

// Drawer Close component
const DrawerClose = React.forwardRef<
  React.ElementRef<typeof SheetClose>,
  React.ComponentPropsWithoutRef<typeof SheetClose>
>(({ className, ...props }, ref) => (
  <SheetClose
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
DrawerClose.displayName = "DrawerClose"

// Drawer Body component for main content area
const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 p-6 py-4 overflow-y-auto",
      className
    )}
    {...props}
  />
))
DrawerBody.displayName = "DrawerBody"

// Export all components
export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerBody,
}

// Example usage (commented out):
/*
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right" size="lg">
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>
        This is a description of what this drawer contains.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Your main content goes here...</p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" asChild>
        <DrawerClose>Cancel</DrawerClose>
      </Button>
      <Button>Save Changes</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
*/
