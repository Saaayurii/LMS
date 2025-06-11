// components/ui/Slider.jsx
import React from 'react';

export const Slider = ({ 
  value = [50], 
  onValueChange, 
  min = 0, 
  max = 100, 
  step = 1,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  return (
    <div className={`relative w-full ${className}`} {...props}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="
          w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
          dark:bg-gray-700
        "
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};