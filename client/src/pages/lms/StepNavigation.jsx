import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

 const StepNavigation = ({ steps, currentStep, onSelect }) => (
  <div className="space-y-1 mb-6">
    {steps.map((step) => (
      <div
        key={step.id}
        className={cn(
          "flex items-center p-2 rounded-lg cursor-pointer transition-colors",
          currentStep === step.id
            ? "bg-accent text-accent-foreground"
            : "hover:bg-muted/50"
        )}
        onClick={() => onSelect(step.id)}
      >
        <div className="w-6 h-6 flex items-center justify-center mr-2">
          {step.icon}
        </div>
        <span className="text-sm">{step.title}</span>
        {step.hasData && (
          <Badge variant="secondary" className="ml-auto px-2 h-5">
            {step.itemsCount}
          </Badge>
        )}
      </div>
    ))}
  </div>
);

export default StepNavigation;