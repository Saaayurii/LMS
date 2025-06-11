import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const CollapsibleContext = React.createContext({
  open: false,
  setOpen: () => {},
})

const Collapsible = ({ className, children, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={cn("w-full space-y-2", className)}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

const CollapsibleTrigger = ({ className, children, ...props }) => {
  const { open, setOpen } = React.useContext(CollapsibleContext)
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      {open ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )
}

const CollapsibleContent = ({ className, children, ...props }) => {
  const { open } = React.useContext(CollapsibleContext)
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        open ? "animate-collapsible-open" : "animate-collapsible-close",
        className
      )}
      {...props}
    >
      <div className="px-4 pb-2 pt-0">{children}</div>
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }