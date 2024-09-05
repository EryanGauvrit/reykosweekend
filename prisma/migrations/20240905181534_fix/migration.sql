/*
  Warnings:

  - You are about to drop the `_betterteams_teamtoquests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_betterteams_teamtoquests` DROP FOREIGN KEY `_Betterteams_teamToQuests_A_fkey`;

-- DropForeignKey
ALTER TABLE `_betterteams_teamtoquests` DROP FOREIGN KEY `_Betterteams_teamToQuests_B_fkey`;

-- DropForeignKey
ALTER TABLE `quests` DROP FOREIGN KEY `Quests_eventId_fkey`;

-- DropTable
DROP TABLE `_betterteams_teamtoquests`;

-- DropTable
DROP TABLE `quests`;

-- CreateTable
CREATE TABLE `Quest` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `scoreReward` INTEGER NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Betterteams_teamToQuest` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Betterteams_teamToQuest_AB_unique`(`A`, `B`),
    INDEX `_Betterteams_teamToQuest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quest` ADD CONSTRAINT `Quest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Betterteams_teamToQuest` ADD CONSTRAINT `_Betterteams_teamToQuest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Betterteams_teamToQuest` ADD CONSTRAINT `_Betterteams_teamToQuest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Quest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
