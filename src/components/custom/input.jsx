import { forwardRef } from 'react';

const Input = forwardRef(({label, placeholder, name, type = "text", className = "", ...props }, ref) => {
  return (
   <div className="w-full">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className={`
          flex h-10 w-full rounded-md border border-gray-600 
          bg-gray-800 text-white px-3 py-2 text-sm 
          placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent
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