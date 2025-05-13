-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_id_intern_fkey`;

-- DropIndex
DROP INDEX `Siswa_id_intern_fkey` ON `siswa`;

-- AlterTable
ALTER TABLE `siswa` MODIFY `id_intern` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_intern_fkey` FOREIGN KEY (`id_intern`) REFERENCES `Internship`(`id_intern`) ON DELETE SET NULL ON UPDATE CASCADE;
