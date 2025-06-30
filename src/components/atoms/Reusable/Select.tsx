"use client"

import * as React from "react"
import { ChevronDown, Check, Search, X } from "lucide-react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const selectTriggerVariants = cva(
  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "border border-input bg-transparent",
        filled: "border-0 bg-muted/5 shadow-none",
        outlined: "border-2 border-input bg-transparent",
        ghost: "border-0 bg-transparent shadow-none",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-10 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const selectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      placement: {
        "popper": "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "item-aligned": "",
      },
    },
    defaultVariants: {
      placement: "popper",
    },
  }
)

// Context for search functionality and multi-select
const SelectSearchContext = React.createContext<{
  searchable?: boolean
  search?: string
  setSearch?: (search: string) => void
  onSearch?: (search: string) => void
  searchPlaceholder?: string
  multiple?: boolean
  selectedValues?: string[]
  onValueChange?: (value: string[]) => void
  valueToLabelMap?: Map<string, ReactNode>
  setValueToLabelMap?: (map: Map<string, ReactNode>) => void
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}>({})

interface SelectProps extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'value' | 'onValueChange'> {
  searchable?: boolean
  onSearch?: (search: string) => void
  searchPlaceholder?: string
  multiple?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const Select: React.FC<SelectProps> = ({ 
  children, 
  searchable = false, 
  onSearch, 
  searchPlaceholder = "Search...", 
  multiple = false,
  value,
  onValueChange,
  ...props 
}) => {
  const [search, setSearch] = React.useState("")
  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : []
    }
    return []
  })
  const [valueToLabelMap, setValueToLabelMap] = React.useState(new Map<string, ReactNode>())
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSearch = React.useCallback((searchText: string) => {
    setSearch(searchText)
    onSearch?.(searchText)
  }, [onSearch])

  const handleValueChange = React.useCallback((newValues: string[]) => {
    setSelectedValues(newValues)
    if (multiple) {
      onValueChange?.(newValues)
    } else {
      onValueChange?.(newValues[0] || "")
    }
  }, [multiple, onValueChange])

  React.useEffect(() => {
    if (!searchable) {
      setSearch("")
    }
  }, [searchable])

  React.useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : value ? [value] : [])
    } else {
      setSelectedValues(value ? [value as string] : [])
    }
  }, [value, multiple])

  if (multiple) {
    return (
      <SelectSearchContext.Provider value={{ 
        searchable, 
        search, 
        setSearch: handleSearch, 
        onSearch,
        searchPlaceholder,
        multiple,
        selectedValues,
        onValueChange: handleValueChange,
        valueToLabelMap,
        setValueToLabelMap,
        isOpen,
        setIsOpen
      }}>
        <div className="relative">
          {children}
        </div>
      </SelectSearchContext.Provider>
    )
  }

  return (
    <SelectSearchContext.Provider value={{ 
      searchable, 
      search, 
      setSearch: handleSearch, 
      onSearch,
      searchPlaceholder,
      multiple,
      selectedValues,
      onValueChange: handleValueChange,
      valueToLabelMap,
      setValueToLabelMap,
      isOpen,
      setIsOpen
    }}>
      <SelectPrimitive.Root 
        value={selectedValues[0] || ""} 
        onValueChange={(val) => handleValueChange([val])}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectSearchContext.Provider>
  )
}
Select.displayName = "Select"

const SelectGroup = SelectPrimitive.Group

const SelectValue = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ placeholder, ...props }, ref) => {
  const { multiple, selectedValues, onValueChange, valueToLabelMap } = React.useContext(SelectSearchContext)
  
  const removeValue = React.useCallback((valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onValueChange || !selectedValues) return
    onValueChange(selectedValues.filter(v => v !== valueToRemove))
  }, [onValueChange, selectedValues])
  
  if (multiple) {
    if (!selectedValues || selectedValues.length === 0) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className="text-muted-foreground" {...props}>
          {placeholder}
        </span>
      )
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className="flex flex-wrap gap-1 items-center" {...props}>
        {selectedValues.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary-foreground rounded-md"
          >
            {valueToLabelMap?.get(value) || value}
            <button
              type="button"
              className="ml-1 h-3 w-3 rounded-full hover:bg-secondary-foreground/20 flex items-center justify-center"
              onClick={(e) => removeValue(value, e)}
            >
              <X className="h-2 w-2" />
            </button>
          </span>
        ))}
      </div>
    )
  }

  return <SelectPrimitive.Value ref={ref as React.Ref<HTMLSpanElement>} placeholder={placeholder} {...props} />
})
SelectValue.displayName = "SelectValue"

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, size, variant, children, ...props }, ref) => {
  const { multiple, selectedValues, isOpen, setIsOpen } = React.useContext(SelectSearchContext)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  // Adjust height for multi-select with chips
  const hasMultipleValues = multiple && selectedValues && selectedValues.length > 0
  const triggerClassName = cn(
    selectTriggerVariants({ size, variant }), 
    hasMultipleValues && "min-h-9 h-auto py-1",
    className
  )

  // Click outside detection for multi-select
  React.useEffect(() => {
    if (!multiple || !isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        // Check if click is inside the dropdown content
        const dropdownContent = document.querySelector('[data-multi-select-content]')
        if (!dropdownContent || !dropdownContent.contains(event.target as Node)) {
          setIsOpen?.(false)
        }
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen?.(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [multiple, isOpen, setIsOpen])

  if (multiple) {
    return (
      <button
        ref={(node) => {
          triggerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={triggerClassName}
        onClick={() => setIsOpen?.(!isOpen)}
        {...props}
      >
        <div className="flex-1 text-left">
          {children}
        </div>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </button>
    )
  }

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={triggerClassName}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 rotate-180" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, placement = "popper", position = "popper", ...props }, ref) => {
  const { searchable, search, setSearch, searchPlaceholder, multiple, isOpen, setIsOpen } = React.useContext(SelectSearchContext)
  const hiddenInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchable && hiddenInputRef.current) {
      hiddenInputRef.current.focus()
    }
  }, [searchable])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (!searchable || !setSearch) return

    // Handle character input
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault()
      setSearch((search || "") + e.key)
    }
    // Handle backspace
    else if (e.key === "Backspace") {
      e.preventDefault()
      setSearch((search || "").slice(0, -1))
    }
    // Handle escape to clear search
    else if (e.key === "Escape") {
      e.preventDefault()
      setSearch("")
      // Close dropdown on escape
      if (multiple) {
        setIsOpen?.(false)
      }
    }
  }, [searchable, search, setSearch, multiple, setIsOpen])

  if (multiple && isOpen) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-1">
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          data-multi-select-content
          className={cn(selectContentVariants({ placement }), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {searchable && (
            <>
              {/* Hidden input to capture keypresses */}
              <input
                ref={hiddenInputRef}
                className="absolute opacity-0 pointer-events-none"
                value={search || ""}
                onChange={() => {}} // Controlled by keydown handler
                autoFocus
              />
              
              {/* Search UI */}
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-transparent pl-8 pr-8 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder={searchPlaceholder}
                    value={search || ""}
                    onChange={(e) => setSearch?.(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 hover:opacity-100"
                      onClick={() => setSearch?.("")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          
          <div className="p-1 max-h-96 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }

  if (multiple) {
    return null // Don't render anything if multi-select but not open
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(selectContentVariants({ placement }), className)}
        position={position}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {searchable && (
          <>
            {/* Hidden input to capture keypresses */}
            <input
              ref={hiddenInputRef}
              className="absolute opacity-0 pointer-events-none"
              value={search || ""}
              onChange={() => {}} // Controlled by keydown handler
              autoFocus
            />
            
            {/* Search UI */}
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  className="w-full rounded-md border border-input bg-transparent pl-8 pr-8 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder={searchPlaceholder}
                  value={search || ""}
                  onChange={(e) => setSearch?.(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 hover:opacity-100"
                    onClick={() => setSearch?.("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  value: string
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, value, ...props }, ref) => {
  const { multiple, selectedValues, onValueChange, valueToLabelMap, setValueToLabelMap } = React.useContext(SelectSearchContext)
  
  // Register this item's value-to-label mapping
  React.useEffect(() => {
    if (setValueToLabelMap && valueToLabelMap) {
      // Only update if the value doesn't exist or the label has changed
      if (!valueToLabelMap.has(value) || valueToLabelMap.get(value) !== children) {
        const newMap = new Map(valueToLabelMap)
        newMap.set(value, children)
        setValueToLabelMap(newMap)
      }
    }
  }, [children, value, setValueToLabelMap, valueToLabelMap])
  
  const isSelected = selectedValues?.includes(value) || false

  const handleSelect = React.useCallback(() => {
    if (!multiple || !onValueChange || !selectedValues) return

    if (isSelected) {
      // Remove from selection
      onValueChange(selectedValues.filter(v => v !== value))
    } else {
      // Add to selection
      onValueChange([...selectedValues, value])
    }
  }, [multiple, onValueChange, selectedValues, value, isSelected])

  if (multiple) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={handleSelect}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        <span>{children}</span>
      </div>
    )
  }

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      value={value}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
