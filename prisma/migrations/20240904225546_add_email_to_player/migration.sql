-- AlterTable
ALTER TABLE `event` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `players` ADD COLUMN `email` VARCHAR(191) NULL;
