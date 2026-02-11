import * as React from 'react';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Platform } from 'react-native';
import { Check } from 'lucide-react-native';
import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 native:h-[20px] native:w-[20px] native:rounded',
                props.checked && 'bg-primary',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn('items-center justify-center h-full w-full')}
            >
                <Check size={14} strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5} color="white" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
