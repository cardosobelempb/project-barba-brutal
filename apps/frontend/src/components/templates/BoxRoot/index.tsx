import { cn } from '@/lib/utils';

import type { ElementType } from 'react';
import React from 'react';

type BoxRootProps = {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
};
export default function BoxRoot({
  children,
  as = 'div',
  className,
  ...props
}: BoxRootProps) {
  const baseClasses = cn('w-full', '', className);
  return React.createElement(
    as,
    {
      className: cn(baseClasses, className),
      ...props
    },
    children
  );
}
