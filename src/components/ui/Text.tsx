import * as React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textVariants = cva(
    'text-foreground',
    {
        variants: {
            variant: {
                default: 'text-base text-black dark:text-white',
                h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
                h2: 'text-3xl font-semibold tracking-tight first:mt-0',
                h3: 'text-2xl font-semibold tracking-tight',
                h4: 'text-xl font-semibold tracking-tight',
                p: 'text-base leading-7 text-gray-700 dark:text-gray-300',
                blockquote: 'mt-6 border-l-2 pl-6 italic text-gray-500',
                lead: 'text-xl text-muted-foreground',
                large: 'text-lg font-semibold',
                small: 'text-sm font-medium leading-none',
                muted: 'text-sm text-gray-500 dark:text-gray-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface TextProps
    extends RNTextProps,
    VariantProps<typeof textVariants> {
    className?: string;
}

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <RNText
                ref={ref}
                className={cn(textVariants({ variant, className }))}
                {...props}
            />
        );
    }
);
Text.displayName = 'Text';

export { Text, textVariants };
