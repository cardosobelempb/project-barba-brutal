import LayoutCenter from "@/components/layout/LayoutCenter";
import { RegisterForm } from "@/components/pages/RegisterForm/register.form";
import { generateMetadata, HeadRoot } from "@/components/shared/HeadRoot";
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
        <HeadRoot
          title="Entrar na sua conta | MeuApp"
          description="Acesse sua conta para gerenciar seus dados, acompanhar pedidos ou continuar suas atividades."
        />

        <RegisterForm />
      </LayoutCenter>
    </BackgroundRoot>
  );
}
