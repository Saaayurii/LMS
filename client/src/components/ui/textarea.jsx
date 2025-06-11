// src/components/ui/textarea.jsx

import React from "react";

const Textarea = ({ value, onChange, placeholder, ...props }) => {
  return (
    <textarea
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export { Textarea };
