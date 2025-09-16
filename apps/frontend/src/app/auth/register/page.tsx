import LayoutCenter from "@/components/layout/LayoutCenter";
import AuthRegisterForm from "@/components/pages/AuthRegisterForm";
import { generateMetadata } from "@/components/shared/HeadRoot";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Criar uma conta | Agendamento",
  description:
    "Cadastre-se gratuitamente para acessar todos os recursos da plataforma e começar agora mesmo.",
});

export default function RegisterPage() {
  return (
    <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/principal.webp">
      <LayoutCenter>
        <AuthRegisterForm />
      </LayoutCenter>
    </BackgroundRoot>
  );
}
