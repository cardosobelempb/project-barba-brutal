import { ReactNode } from 'react';

import { ThemeProvider } from './ThemeProvider';

type ProviderRootProps = {
  children: ReactNode;
};

export default function ProviderRoot({ children }: ProviderRootProps) {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
