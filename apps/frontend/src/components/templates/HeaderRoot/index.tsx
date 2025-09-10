import BrandRoot from "@/components/BrandRoot";
import { cn } from "@/lib/utils";
import Link from "next/link";

import BoxRoot from "../BoxRoot";
import ContainerRoot from "../ContainerRoot";
import ContentRoot from "../ContentRoot";

type ContentRootProps = {
  className?: string;
};
export default function HeaderRoot({ className }: ContentRootProps) {
  return (
    <ContainerRoot
      as={"header"}
      className={cn("justify-start bg-black/60 fixed z-50", className)}
    >
      <ContentRoot
        as={"section"}
        className="flex items-center justify-between h-24"
      >
        <BoxRoot>
          <BrandRoot className="justify-start" />
        </BoxRoot>
        <BoxRoot className="px-2">
          <nav>
            <ul className="flex justify-end">
              <li>
                <Link href={"/entrar"}>Entrar</Link>
              </li>
            </ul>
          </nav>
        </BoxRoot>
      </ContentRoot>
    </ContainerRoot>
  );
}
