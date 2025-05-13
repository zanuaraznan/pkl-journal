import { object, string } from "zod";

export const RegisterSchema = object({
  email: string({ required_error: "Email diperlukan" }).refine(
    (data) => data.endsWith("@smkn3kediri.sch.id"),
    {
      message: "Gunakan email sekolah (@smkn3kediri.sch.id)",
    }
  ),
  password: string({ required_error: "Password diperlukan" })
    .min(1, "Password harus lebih dari 8 karakter")
    .max(20, "Password harus kurang dari 20 karakter"),
  nama: string({ required_error: "Nama diperlukan" })
    .nonempty("Nama diperlukan")
    .max(50, "Nama harus kurang dari 50 karakter"),
  nisn: string({ required_error: "Nisn diperlukan" })
    .nonempty("Nisn diperlukan")
    .regex(/^\d{10}$/, { message: "Nisn harus tepat 10 degiit" }),
  alamat: string()
    .max(100, "Panjang alamat tidak lebih dari 100 karakter")
    .optional(),
});

export const LoginSchema = object({
  email: string({ required_error: "Email diperlukan" })
    .nonempty("Email diperlukan")
    .refine(
      (data) => {
        return data.length > 0 && data.endsWith("@smkn3kediri.sch.id");
      },
      {
        message: "Gunakan email @smkn3kediri.sch.id",
      }
    ),
  password: string({ required_error: "Password diperlukan" })
    .nonempty("Password diperlukan")
    .max(20, "Password harus kurang dari 20 karakter"),
});

export const JournalSchema = object({
  tanggal: string({ required_error: "Tanggal diperlukan" })
    .nonempty("Tanggal diperlukan")
    .date("Masukkan tanggal yang valid"),
  teks: string({ required_error: "Teks jurnal diperlukan" })
    .nonempty("Teks jurnal diperlukan")
    .max(255, "Teks jurnal harus kurang dari 255 karakter"),
});
