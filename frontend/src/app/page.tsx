import { ProfissionalMapper } from "@/components/professional";
import { ServiceMapper } from "@/components/services";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";
import ContainerRoot from "@/components/templates/ContainerRoot";
import FooterRoot from "@/components/templates/FooterRoot";
import HeaderRoot from "@/components/templates/HeaderRoot";

export default function HomePage() {
  return (
    <>
      <HeaderRoot />
      <ContainerRoot as={"main"} className="flex flex-col gap-y-8">
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
