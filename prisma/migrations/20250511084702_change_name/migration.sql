/*
  Warnings:

  - The primary key for the `dataintern` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `dataintern` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `dataintern` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `dataintern` table. All the data in the column will be lost.
  - You are about to drop the `datasiswa` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id_pkl` was added to the `DataIntern` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nama` to the `DataIntern` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `datasiswa` DROP FOREIGN KEY `DataSiswa_internId_fkey`;

-- DropForeignKey
ALTER TABLE `datasiswa` DROP FOREIGN KEY `DataSiswa_userId_fkey`;

-- AlterTable
ALTER TABLE `dataintern` DROP PRIMARY KEY,
    DROP COLUMN `address`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `alamat` VARCHAR(191) NULL,
    ADD COLUMN `id_pkl` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_pkl`);

-- DropTable
DROP TABLE `datasiswa`;

-- CreateTable
CREATE TABLE `Siswa` (
    `id_siswa` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nisn` INTEGER NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `id_pkl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Siswa_userId_key`(`userId`),
    UNIQUE INDEX `Siswa_nisn_key`(`nisn`),
    PRIMARY KEY (`id_siswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_pkl_fkey` FOREIGN KEY (`id_pkl`) REFERENCES `DataIntern`(`id_pkl`) ON DELETE RESTRICT ON UPDATE CASCADE;
