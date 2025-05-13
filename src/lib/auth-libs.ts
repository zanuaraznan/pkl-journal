import { prisma } from "./prisma";

export const getSiswaFromDB = async (id_user: string) => {
  try {
    const siswa = await prisma.siswa.findUnique({ where: { id_user } });
    return siswa;
  } catch (err) {
    console.error(err);
    return null;
  }
};
