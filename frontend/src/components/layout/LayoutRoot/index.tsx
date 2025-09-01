import ContainerRoot from '@/components/templates/ContainerRoot';
import { ReactNode } from 'react';

type LayoutCenterProps = {
  children?: ReactNode;
};
export default function LayoutRoot({ children }: LayoutCenterProps) {
  return (
    <ContainerRoot className='flex flex-col w-full min-h-screen'>
      {children}
    </ContainerRoot>
  );
}
