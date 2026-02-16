'use client';

import { motion, type Variants, type Transition, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

// This defines the props for our component, including `className`
type BaseAnimatedProps = {
  variants: Variants;
  transition?: Transition;
  triggerOnce?: boolean;
  delay?: number;
};

// This creates a polymorphic component that can be any HTML element
export type AnimatedProps<T extends React.ElementType> = BaseAnimatedProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BaseAnimatedProps | 'className'> & {
    as?: T;
    className?: string;
  };

export const Animated = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    {
      as,
      className,
      variants,
      transition,
      triggerOnce = true,
      delay = 0,
      ...props
    }: AnimatedProps<T>,
    ref: React.Ref<any>
  ) => {
    const Component = React.useMemo(() => motion(as || 'div'), [as]);
    return (
      <Component
        ref={ref}
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: triggerOnce, amount: 0.25 }}
        variants={variants}
        transition={{ ...transition, delay }}
        {...props}
      />
    );
  }
);

Animated.displayName = 'Animated';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
