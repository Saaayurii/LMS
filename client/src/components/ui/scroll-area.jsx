import React from 'react';
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef(({ 
  className,
  orientation = "vertical",
  scrollHideDelay = 600,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className={cn(
        "h-full w-full",
        orientation === "vertical" ? "overflow-y-auto" : "overflow-x-auto",
        "[scrollbar-width:none] [-webkit-overflow-scrolling:touch]",
        "[-ms-overflow-style:-ms-autohiding-scrollbar]",
        "[&::-webkit-scrollbar]:hidden"
      )}>
        {children}
      </div>
      
      {/* Кастомный скроллбар */}
      <div className={cn(
        "flex touch-none select-none transition-opacity",
        orientation === "vertical" 
          ? "h-full w-2.5 top-0 right-0" 
          : "h-2.5 w-full bottom-0 left-0",
        "absolute duration-200 opacity-0 hover:opacity-100",
        "bg-transparent"
      )}>
        <div className={cn(
          "relative flex-1 rounded-full bg-border",
          orientation === "vertical" ? "w-1.5" : "h-1.5"
        )}>
          <div className={cn(
            "absolute rounded-full bg-foreground/20",
            orientation === "vertical" 
              ? "w-full left-0" 
              : "h-full top-0",
            "transition-colors hover:bg-foreground/50"
          )} />
        </div>
      </div>
    </div>
  );
});

export { ScrollArea };