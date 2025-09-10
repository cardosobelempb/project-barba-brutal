import ContainerRoot from '@/components/templates/ContainerRoot';
import ContentRoot from '@/components/templates/ContentRoot';
import { ReactNode } from 'react';

type LayoutCenterProps = {
  children?: ReactNode;
};
export default function LayoutCenter({ children }: LayoutCenterProps) {
  return (
    <ContainerRoot>
      <ContentRoot>{children}</ContentRoot>
    </ContainerRoot>
  );
}
