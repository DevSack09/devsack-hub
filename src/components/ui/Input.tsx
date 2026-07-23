import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-secondary text-sm font-medium text-foreground/80">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "rounded-lg border border-border bg-background/50 px-4 py-2.5 font-secondary text-sm text-foreground",
          "outline-none transition-colors focus:border-dev-blue focus-visible:ring-2 focus-visible:ring-dev-blue/40",
          className
        )}
        {...props}
      />
    </div>
  );
}
