import { cn } from "@/lib/utils";

import BrandRoot from "@/components/BrandRoot";
import ContainerRoot from "../ContainerRoot";
import ContentRoot from "../ContentRoot";

type ContentRootProps = {
  className?: string;
};
export default function HeaderRoot({ className }: ContentRootProps) {
  return (
    <ContainerRoot as={"header"} className={cn("justify-start", className)}>
      <ContentRoot as={"section"} className="flex items-end">
        <BrandRoot />
      </ContentRoot>
    </ContainerRoot>
  );
}
