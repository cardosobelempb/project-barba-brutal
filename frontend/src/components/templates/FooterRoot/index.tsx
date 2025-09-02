import BrandRoot from "@/components/BrandRoot";
import { ProfissionalSocial } from "@/components/professional";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

import BoxRoot from "../BoxRoot";
import ContainerRoot from "../ContainerRoot";
import ContentRoot from "../ContentRoot";

type ContentRootProps = {
  className?: string;
};
export default function FooterRoot({ className }: ContentRootProps) {
  return (
    <ContainerRoot as={"footer"} className={cn("bg-black", className)}>
      <ContentRoot
        as={"section"}
        className={cn(
          "py-4 sm:py-8",
          "grid grid-cols-1 sm:grid-cols-3 text-zinc-400"
        )}
      >
        <BrandRoot />
        <BoxRoot className="flex flex-col items-center gap-y-2 sm:gap-y-0 sm:flex sm:items-start">
          <h2 className="text-2xl font-bold text-zinc-200 mb-2">Sobre</h2>
          <ul className="flex flex-col gap-y-1 items-center sm:items-start">
            <li>
              <Link className="text-sm" href={"/"}>
                Nossa Hístoria
              </Link>
            </li>
            <li>
              <Link className="text-sm" href={"/"}>
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link className="text-sm" href={"/"}>
                Termos de Uso
              </Link>
            </li>
          </ul>
        </BoxRoot>
        <BoxRoot className="flex flex-col items-center gap-y-2 sm:gap-y-0 sm:flex sm:items-start">
          <h2 className="text-2xl font-bold text-zinc-200 pb-2">Contato</h2>
          <ul className="flex flex-col gap-y-1 items-center sm:items-start">
            <li>
              <Link className="text-sm" href={"/"}>
                suporte@barbarbrutal.com.br
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-x-2 text-sm" href={"/"}>
                <FaWhatsapp className="text-green-500 size-5" /> Whatsapp
              </Link>
            </li>
          </ul>
        </BoxRoot>
      </ContentRoot>
      <ContentRoot className="flex flex-col sm:flex-row justify-between items-center text-zinc-400 gap-y-2 sm:gap-y-0 pb-4">
        <ProfissionalSocial />
        <BoxRoot className="">
          <p className="text-center sm:text-right ">
            Fleito com {new Date().getFullYear()} - Todos direitos reservados
          </p>
        </BoxRoot>
      </ContentRoot>
    </ContainerRoot>
  );
}
