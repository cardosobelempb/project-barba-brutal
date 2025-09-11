import ContainerRoot from "@/components/templates/ContainerRoot";
import ContentRoot from "@/components/templates/ContentRoot";
import { ReactNode } from "react";

type LayoutCenterProps = {
  children?: ReactNode;
};
export default function LayoutCenter({ children }: LayoutCenterProps) {
  return (
    <ContainerRoot className="flex flex-col justify-center items-center h-screen w-screen">
      <ContentRoot>{children}</ContentRoot>
    </ContainerRoot>
  );
}
