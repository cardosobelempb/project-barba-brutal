import { cn } from '@/lib/utils';

import ContainerRoot from '../ContainerRoot';
import ContentRoot from '../ContentRoot';

type ContentRootProps = {
  className?: string;
};
export default function FooterRoot({ className }: ContentRootProps) {
  return (
    <ContainerRoot as={'footer'} className={cn('', className)}>
      <ContentRoot as={'section'} className={cn('py-8 sm:py-10')}>
        <h1>The Blog</h1>
      </ContentRoot>
    </ContainerRoot>
  );
}
