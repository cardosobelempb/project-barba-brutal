import LayoutCenter from "@/components/layout/LayoutCenter";
import AuthSignInForm from "@/components/pages/AuthSignInForm";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";

export default function SignInPage() {
  return (
    <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/principal.webp&version_id=null">
      <LayoutCenter>
        <AuthSignInForm />
      </LayoutCenter>
    </BackgroundRoot>
  );
}
