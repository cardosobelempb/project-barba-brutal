import { cn } from "@/lib/utils";
import React, { ElementType } from "react";

type ContainerRootProps = {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
};

export default function ContainerRoot({
  children,
  as = "div",
  className,
  ...props
}: ContainerRootProps) {
  const baseClasses = cn("w-full px-8", className);
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
