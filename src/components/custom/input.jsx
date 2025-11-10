import { forwardRef } from 'react';

const Input = forwardRef(({label, placeholder, name, type = "text", className = "", ...props }, ref) => {
  return (
   <div>
      <label htmlFor={name}>{label}</label>
         <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      name={name}
      className={`
        flex h-10 w-full rounded-md border border-gray-300 
        bg-white px-3 py-2 text-sm 
        placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200
        ${className}
      `}
      {...props}
    />
   </div>
 
  );
});

Input.displayName = 'Input';

export default Input;