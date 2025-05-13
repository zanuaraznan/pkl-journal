import AuthContainer from "@/components/Auth/AuthContainer";
import FormLogin from "@/components/Auth/FormLogin";

export const metadata = {
  title: "Login | PKL SMKN 3 Kediri",
};

export default function Page() {
  return (
    <AuthContainer
      title="Login | PKL SMKN 3 Kediri"
      subtitle="Silahkan login dengan akun Anda terlebih dahulu."
      link={{ text: "Belum memiliki akun?", path: "/register" }}>
      <FormLogin />
    </AuthContainer>
  );
}
