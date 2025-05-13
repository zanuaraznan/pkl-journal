import AuthContainer from "@/components/Auth/AuthContainer";
import FormRegister from "@/components/Auth/FormRegister";

export const metadata = {
  title: "Register | PKL SMKN 3 Kediri",
};

export default function Page() {
  return (
    <AuthContainer
      title="Buat akun sekolah"
      subtitle="Daftarkan akun untuk siswa PKL."
      link={{ text: "Sudah memiliki akun?", path: "/login" }}>
      <FormRegister />
    </AuthContainer>
  );
}
