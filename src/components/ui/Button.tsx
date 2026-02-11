import * as React from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Text as CustomText } from './Text';

const buttonVariants = cva(
    'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'bg-primary active:opacity-90',
                destructive: 'bg-destructive active:opacity-90',
                outline:
                    'border border-gray-300 bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent',
                secondary: 'bg-secondary active:opacity-80',
                ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-gray-100',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-14 rounded-md px-8', // Match input height (py-3.5 + text + borders approx 56px)
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const buttonTextVariants = cva(
    'text-sm font-medium selection:text-white',
    {
        variants: {
            variant: {
                default: 'text-white',
                destructive: 'text-destructive-foreground',
                outline: 'text-primary',
                secondary: 'text-secondary-foreground',
                ghost: 'text-primary',
                link: 'text-primary',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);


export interface ButtonProps
    extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
    label?: string;
    labelClasses?: string;
    className?: string;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
    ({ className, variant, size, label, labelClasses, children, ...props }, ref) => {
        return (
            <Pressable
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {label ? (
                    <CustomText
                        className={cn(
                            buttonTextVariants({ variant }),
                            size === 'lg' ? 'text-lg font-semibold' : '',
                            labelClasses
                        )}
                    >
                        {label}
                    </CustomText>
                ) : (
                    children
                )}
            </Pressable>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonTextVariants };
