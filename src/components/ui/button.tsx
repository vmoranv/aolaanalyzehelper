import * as React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from '@/lib/button-variants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      // When asChild is true, return a span instead of div to avoid button-specific props issues
      return (
        <span
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLSpanElement>}
          role="button"
          tabIndex={0}
        />
      );
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button };
