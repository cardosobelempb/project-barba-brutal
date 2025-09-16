import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";

type ProviderRootProps = {
  children: ReactNode;
};

export default function ProviderRoot({ children }: ProviderRootProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
}
