import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface TouchButtonProps extends ButtonProps {
  touchOptimized?: boolean;
}

export const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, touchOptimized = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          touchOptimized && [
            'touch-manipulation', // Optimizes touch interactions
            'min-h-[44px]', // Minimum touch target size (44px is iOS recommendation)
            'min-w-[44px]',
            'active:scale-95', // Provides visual feedback on touch
            'transition-transform duration-100',
          ],
          className
        )}
        {...props}
      />
    );
  }
);

TouchButton.displayName = 'TouchButton';