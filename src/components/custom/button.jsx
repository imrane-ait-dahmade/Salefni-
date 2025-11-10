import { forwardRef } from 'react';

const Button = forwardRef(({ title, fct, style = "", ...props }, ref) => {
  return (
    <button 
      ref={ref} 
      className={`
        inline-flex items-center justify-center 
        rounded-md px-4 py-2 text-sm font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${style}
      `}
      onClick={fct}
      {...props}
    >
      {title}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;