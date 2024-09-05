/*
  Warnings:

  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_teamRegisterId_fkey`;

-- DropTable
DROP TABLE `players`;

-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `minecraftNickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `teamId` VARCHAR(191) NULL,
    `teamRegisterId` VARCHAR(191) NULL,
    `isOwner` BOOLEAN NOT NULL DEFAULT false,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamRegisterId_fkey` FOREIGN KEY (`teamRegisterId`) REFERENCES `TeamRegister`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
