"use server";

import { hash } from "bcrypt-ts";
import { JournalSchema, LoginSchema, RegisterSchema } from "./zod";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { auth, signIn } from "./auth";
import { AuthError } from "next-auth";
import {
  fieldJournalList,
  fieldLoginList,
  fieldRegisterList,
} from "../components/Form/FormData";
import { getSiswaFromDB } from "./auth-libs";

export const SignUpCredentials = async (_: any, formData: FormData) => {
  const fieldNames = fieldRegisterList.map((field) => field.name);
  const fieldObj = Object.fromEntries(
    fieldNames.map((key) => [key, formData.get(key) as string])
  );

  const validatedFields = RegisterSchema.safeParse(fieldObj);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password, nama, nisn, alamat } = validatedFields.data;
  const pwHash = await hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { message: "Akun sudah digunakan" };
  }

  try {
    await prisma.user.create({
      data: {
        email,
        password: pwHash,
        siswa: {
          create: {
            nama,
            nisn,
            alamat,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Gagal menambahkan akun." };
  }
  redirect("/login");
};

export const SignInCredentials = async (_: any, formData: FormData) => {
  const fieldNames = fieldLoginList.map((field) => field.name);
  const fieldObj = Object.fromEntries(
    fieldNames.map((key) => [key, formData.get(key) as string])
  );

  const validatedFields = LoginSchema.safeParse(fieldObj);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.email) {
    return { message: "Akun atau password salah" };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return { message: "Akun atau password salah" };
        default:
          return { message: "Something went wrong" };
      }
    }
  }
};

export const JournalActionForm = async (_: any, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) {
    return { message: "Session tidak ditemukan." };
  }

  const siswa = await getSiswaFromDB(session?.user.id!);
  if (!siswa?.id_siswa) {
    return { message: "Data siswa tidak ditemukan." };
  }
  const id_siswa = siswa.id_siswa;

  const fieldNames = fieldJournalList.map((field) => field.name);
  const fieldObj = Object.fromEntries(
    fieldNames.map((key) => [key, formData.get(key) as string])
  );
  const validatedFields = JournalSchema.safeParse(fieldObj);
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { tanggal, teks } = validatedFields.data;
  const tanggalISO = new Date(tanggal).toISOString();
  console.log(tanggalISO);

  const journalArray = await prisma.journal.findMany({
    where: {
      id_siswa,
      tanggal: {
        gte: new Date(new Date(tanggalISO).setHours(0, 0, 0, 0)),
        lte: new Date(new Date(tanggalISO).setHours(23, 59, 59, 999)),
      },
    },
    select: { teks: true },
  });

  if (journalArray.length >= 2)
    return { message: "Jurnal harian telah melebihi batas maksimal, yaitu 2." };

  try {
    await prisma.journal.create({
      data: {
        tanggal: tanggalISO,
        teks,
        id_siswa,
      },
    });
    return { success: true, message: "Data berhasil ditambahkan" };
  } catch (err) {
    console.error(err);
    return { message: "Gagal menambahkan jurnal" };
  }
};
