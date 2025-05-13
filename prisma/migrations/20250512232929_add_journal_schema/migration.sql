/*
  Warnings:

  - You are about to drop the column `userId` on the `siswa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_journal` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_userId_fkey`;

-- DropIndex
DROP INDEX `Siswa_userId_key` ON `siswa`;

-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `userId`,
    ADD COLUMN `id_journal` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_user` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Journal` (
    `id_journal` VARCHAR(191) NOT NULL,
    `id_siswa` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `teks` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_journal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Siswa_id_user_key` ON `Siswa`(`id_user`);

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id_siswa`) ON DELETE RESTRICT ON UPDATE CASCADE;
