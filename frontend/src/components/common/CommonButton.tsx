import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>((
  {
    variant = 'default',
    size = 'default',
    children,
    className,
    type = 'button',
    isLoading = false,
    ...props
  },
  ref
) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      ref={ref} 
      className={cn(
        "transition-all duration-200",
        {
          'opacity-50 cursor-not-allowed': isLoading,
          'hover:brightness-110': !isLoading,
        },
        "transition-colors duration-300 hover:bg-gray-400",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </Button>
  );
});

CommonButton.displayName = 'CommonButton';

export default CommonButton;
