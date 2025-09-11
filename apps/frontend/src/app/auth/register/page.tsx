import LayoutCenter from "@/components/layout/LayoutCenter";
import AuthRegisterForm from "@/components/pages/AuthRegisterForm";
import BackgroundRoot from "@/components/templates/BackgroundRoot/BackgroundRoot";

export default function RegisterPage() {
  return (
    <BackgroundRoot src="https://mc.surb.com.br/api/v1/buckets/barba-brutal/objects/download?preview=true&prefix=banners/principal.webp">
      <LayoutCenter>
        <AuthRegisterForm />
      </LayoutCenter>
    </BackgroundRoot>
  );
}
