"use client";
import { LeadingRoot } from "@/components/LeadingRoot/LeadingRoot";
import { ProfissionalMapper } from "@/components/professional";
import { ServiceMapper } from "@/components/services";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";
import ContainerRoot from "@/components/templates/ContainerRoot";
import FooterRoot from "@/components/templates/FooterRoot";

export default function HomePage() {
  return (
    <>
      <LeadingRoot />
      <ContainerRoot as={"main"} className="flex flex-col gap-y-4">
        <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/servicos.webp">
          <ServiceMapper />
        </BackgroundRoot>

        <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/profissionais.webp">
          <ProfissionalMapper />
        </BackgroundRoot>
      </ContainerRoot>
      <FooterRoot />
    </>
  );
}
