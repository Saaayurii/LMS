import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({ className, ...props }) {
  return (
    <DayPicker
      className={`p-2 rounded-md border bg-white shadow-sm ${className || ""}`}
      {...props}
    />
  );
}
