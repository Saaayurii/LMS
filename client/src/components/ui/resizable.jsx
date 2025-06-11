import React from "react";
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle
} from "react-resizable-panels";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

const ResizablePanelGroup = React.forwardRef(({ 
  className, 
  direction = "horizontal", 
  ...props 
}, ref) => (
  <PanelGroup
    ref={ref}
    direction={direction}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
));

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle = true,
  direction = "horizontal",
  className,
  ...props
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-1 bg-border after:absolute after:inset-0 after:-left-1 after:-right-1 after:z-10",
      direction === "vertical" && "h-1 w-full after:-top-1 after:-bottom-1",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className={cn(
        "z-20 rounded-full bg-border",
        direction === "horizontal" 
          ? "h-8 w-1.5 -left-0.5 top-1/2 -translate-y-1/2" 
          : "w-8 h-1.5 -top-0.5 left-1/2 -translate-x-1/2"
      )}>
        {direction === "horizontal" ? (
          <GripVertical className="h-4 w-4 mx-auto" />
        ) : (
          <GripHorizontal className="h-4 w-4 mx-auto" />
        )}
      </div>
    )}
  </PanelResizeHandle>
);

export { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle 
};