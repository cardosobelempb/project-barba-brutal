import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ElementType } from "react";

type BackgroundRootProps = {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
  src?: string;
};

export default function BackgroundRoot({
  children,
  as = "div",
  className,
  src,
  ...props
}: BackgroundRootProps) {
  const baseClasses = cn("w-full h-full", className);

  return React.createElement(
    as,
    {
      className: cn("relative", baseClasses),
      ...props,
    },
    src ? (
      <Image
        src={src}
        alt="Image de fundo..."
        fill
        sizes="100%"
        priority
        className="object-cover object-top w-auto h-auto -z-30"
        quality={80}
      />
    ) : (
      ""
    ),
    <div className="bg-black sm:bg-transparent sm:bg sm:bg-gradient-to-r from-black/60 via-black/95 to-black/60">
      {children}
    </div>
  );
}
