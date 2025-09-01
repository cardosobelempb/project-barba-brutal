import { cn } from "@/lib/utils";

import type { ElementType } from "react";
import React from "react";

type ContentRootProps = {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
};
export default function ContentRoot({
  children,
  as = "div",
  className,
  ...props
}: ContentRootProps) {
  const baseClasses = cn("lg:max-w-7xl", "mx-auto", className);
  return React.createElement(
    as,
    {
      className: cn(
        baseClasses,

        className
      ),
      ...props,
    },
    children
  );
}
