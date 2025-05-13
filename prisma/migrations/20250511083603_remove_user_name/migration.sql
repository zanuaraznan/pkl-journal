/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Made the column `nisn` on table `datasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `datasiswa` MODIFY `nisn` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`;
