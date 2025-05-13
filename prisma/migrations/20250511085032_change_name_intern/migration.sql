/*
  Warnings:

  - You are about to drop the `dataintern` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_id_pkl_fkey`;

-- DropIndex
DROP INDEX `Siswa_id_pkl_fkey` ON `siswa`;

-- DropTable
DROP TABLE `dataintern`;

-- CreateTable
CREATE TABLE `Data_PKL` (
    `id_pkl` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pkl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_pkl_fkey` FOREIGN KEY (`id_pkl`) REFERENCES `Data_PKL`(`id_pkl`) ON DELETE RESTRICT ON UPDATE CASCADE;
