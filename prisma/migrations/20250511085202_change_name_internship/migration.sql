/*
  Warnings:

  - You are about to drop the column `id_pkl` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the `data_pkl` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_intern` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_id_pkl_fkey`;

-- DropIndex
DROP INDEX `Siswa_id_pkl_fkey` ON `siswa`;

-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `id_pkl`,
    ADD COLUMN `id_intern` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `data_pkl`;

-- CreateTable
CREATE TABLE `Internship` (
    `id_intern` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_intern`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_intern_fkey` FOREIGN KEY (`id_intern`) REFERENCES `Internship`(`id_intern`) ON DELETE RESTRICT ON UPDATE CASCADE;
