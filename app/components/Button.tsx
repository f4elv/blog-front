import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-red-800 text-white hover:bg-red-700 cursor-pointer":
              variant === "primary",

            "bg-transparent text-red-800 hover:bg-red-800/10 border border-red-800 cursor-pointer":
              variant === "secondary",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
