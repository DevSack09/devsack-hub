import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full px-5 py-2 font-secondary text-sm font-medium transition-colors",
        variant === "primary" && "bg-dev-blue text-black hover:bg-dev-blue/90",
        variant === "secondary" && "bg-dev-green text-black hover:bg-dev-green/90",
        variant === "ghost" && "bg-transparent text-white hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
