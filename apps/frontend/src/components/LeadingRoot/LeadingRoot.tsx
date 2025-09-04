import Link from "next/link";

import BackgroundRoot from "../templates/BackgroundRoot/BackgroundRoot";
import BoxRoot from "../templates/BoxRoot";
import ContainerRoot from "../templates/ContainerRoot";
import ContentRoot from "../templates/ContentRoot";
import HeaderRoot from "../templates/HeaderRoot";
import { Button } from "../ui/button";

export const LeadingRoot = () => {
  return (
    <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/principal.webp">
      <HeaderRoot />
      <ContainerRoot className="pt-24">
        <ContentRoot
          as="section"
          className="h-[450px] sm:h-[700px] flex flex-col"
        >
          <BoxRoot className="flex flex-col items-center justify-center h-96 flex-1">
            <h1 className="text-4xl lg:text-5xl text-gradient text-zinc-400 font-extralight">
              Transformações
            </h1>
            <h2 className="text-6xl lg:text-8xl font-black text-gradient mb-8">
              Lendárias
            </h2>
            <p className="text-sm text-zinc-400 mb-4">
              🤘 Seu estilo é o nosoo rock! 🤘
            </p>

            <Button variant={"ghost"} asChild>
              <Link
                className="px-3 py-2 bg-green-500 hover:bg-green-400 hover:text-black rounded"
                href={"/"}
              >
                Agendar Agora
              </Link>
            </Button>
          </BoxRoot>
        </ContentRoot>
      </ContainerRoot>
    </BackgroundRoot>
  );
};
