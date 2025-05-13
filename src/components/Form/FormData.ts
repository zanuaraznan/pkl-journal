export type FieldRegisterName =
  | "email"
  | "password"
  | "nama"
  | "nisn"
  | "alamat";
export type FieldLoginName = "email" | "password";
export type FieldJournalName = "tanggal" | "teks";

interface FieldType<FieldName> {
  type: string;
  name: FieldName;
  placeholder: string;
}

type FieldRegisterType = FieldType<FieldRegisterName>;
type FieldLoginType = FieldType<FieldLoginName>;
type FieldJournalType = FieldType<FieldJournalName>;

export const fieldRegisterList: FieldRegisterType[] = [
  { type: "email", name: "email", placeholder: "Email (@smkn3kediri.sch.id)" },
  { type: "password", name: "password", placeholder: "Password" },
  { type: "text", name: "nama", placeholder: "Nama siswa" },
  { type: "text", name: "nisn", placeholder: "Masukkan NISN siswa" },
  {
    type: "text",
    name: "alamat",
    placeholder: "Alamat rumah siswa",
  },
];

export const fieldLoginList: FieldLoginType[] = [
  { type: "email", name: "email", placeholder: "siswa@smkn3kediri.sch.id" },
  { type: "password", name: "password", placeholder: "Password" },
];

export const fieldJournalList: FieldJournalType[] = [
  { type: "date", name: "tanggal", placeholder: "" },
  {
    type: "text",
    name: "teks",
    placeholder: "Ceritakan kegiatanmu hari ini ..",
  },
];
