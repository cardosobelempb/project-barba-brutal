import LayoutCenter from "@/components/layout/LayoutCenter";
import AuthSignInForm from "@/components/pages/AuthSignInForm";
import { HeadRoot } from "@/components/shared/HeadRoot";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";

// export const metadata: Metadata = generateMetadata({
//   title: "Entrar na sua conta | MeuApp",
//   description:
//     "Acesse sua conta para gerenciar seus dados, acompanhar pedidos ou continuar suas atividades.",
// });

export default function SignInPage() {
  return (
    <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/principal.webp&version_id=null">
      <LayoutCenter>
        <HeadRoot
          title="Entrar na sua conta | MeuApp"
          description="Acesse sua conta para gerenciar seus dados, acompanhar pedidos ou continuar suas atividades."
        />
        <AuthSignInForm />
      </LayoutCenter>
    </BackgroundRoot>
  );
}
