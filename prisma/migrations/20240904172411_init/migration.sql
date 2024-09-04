-- CreateTable
CREATE TABLE `WebSiteSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `imageDesktop` TEXT NULL,
    `imageMobile` TEXT NULL,
    `video` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NOT NULL,
    `logoWhite` VARCHAR(191) NOT NULL,
    `favicon` VARCHAR(191) NOT NULL,
    `emailContact` VARCHAR(191) NOT NULL,
    `youtube` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_userId_key`(`userId`),
    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authenticator` (
    `credentialID` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `credentialPublicKey` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL,
    `credentialDeviceType` VARCHAR(191) NOT NULL,
    `credentialBackedUp` BOOLEAN NOT NULL,
    `transports` VARCHAR(191) NULL,

    UNIQUE INDEX `Authenticator_credentialID_key`(`credentialID`),
    PRIMARY KEY (`userId`, `credentialID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_team` (
    `teamID` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `open` BOOLEAN NOT NULL DEFAULT false,
    `score` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `home` VARCHAR(191) NULL,
    `echest` VARCHAR(191) NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `tag` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `pvp` BOOLEAN NOT NULL DEFAULT false,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_allyrequests` (
    `requestingTeamID` VARCHAR(191) NOT NULL,
    `receivingTeamID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Betterteams_allyrequests_receivingTeamID_key`(`receivingTeamID`),
    PRIMARY KEY (`requestingTeamID`, `receivingTeamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_allies` (
    `teamID1` VARCHAR(191) NOT NULL,
    `teamID2` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Betterteams_allies_teamID2_key`(`teamID2`),
    PRIMARY KEY (`teamID1`, `teamID2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_bans` (
    `PlayerUUID` VARCHAR(191) NOT NULL,
    `TeamID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Betterteams_bans_TeamID_key`(`TeamID`),
    PRIMARY KEY (`PlayerUUID`, `TeamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_chestclaims` (
    `TeamID` VARCHAR(191) NOT NULL,
    `chestLoc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`TeamID`, `chestLoc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_players` (
    `playerUUID` VARCHAR(191) NOT NULL,
    `teamID` VARCHAR(191) NOT NULL,
    `playerRank` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NULL,

    UNIQUE INDEX `Betterteams_players_teamID_key`(`teamID`),
    PRIMARY KEY (`playerUUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betterteams_warps` (
    `TeamID` VARCHAR(191) NOT NULL,
    `warpInfo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`TeamID`, `warpInfo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamRegister` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `registerContext` TEXT NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `minecraftNickname` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NULL,
    `teamRegisterId` VARCHAR(191) NULL,
    `isOwner` BOOLEAN NOT NULL DEFAULT false,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quests` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `scoreReward` INTEGER NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventInGame` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `scoreRewardFirst` INTEGER NOT NULL,
    `scoreRewardSecond` INTEGER NOT NULL,
    `scoreRewardThird` INTEGER NOT NULL,
    `rewardFirst` VARCHAR(191) NOT NULL,
    `rewardSecond` VARCHAR(191) NOT NULL,
    `rewardThird` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventGameRanking` (
    `id` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `rankPosition` INTEGER NOT NULL,
    `eventInGameId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Betterteams_teamToQuests` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Betterteams_teamToQuests_AB_unique`(`A`, `B`),
    INDEX `_Betterteams_teamToQuests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Authenticator` ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betterteams_team` ADD CONSTRAINT `Betterteams_team_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betterteams_allyrequests` ADD CONSTRAINT `Betterteams_allyrequests_requestingTeamID_fkey` FOREIGN KEY (`requestingTeamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_allyrequests` ADD CONSTRAINT `Betterteams_allyrequests_receivingTeamID_fkey` FOREIGN KEY (`receivingTeamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_allies` ADD CONSTRAINT `Betterteams_allies_teamID1_fkey` FOREIGN KEY (`teamID1`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_allies` ADD CONSTRAINT `Betterteams_allies_teamID2_fkey` FOREIGN KEY (`teamID2`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_bans` ADD CONSTRAINT `Betterteams_bans_TeamID_fkey` FOREIGN KEY (`TeamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_chestclaims` ADD CONSTRAINT `Betterteams_chestclaims_TeamID_fkey` FOREIGN KEY (`TeamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_players` ADD CONSTRAINT `Betterteams_players_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Betterteams_warps` ADD CONSTRAINT `Betterteams_warps_TeamID_fkey` FOREIGN KEY (`TeamID`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `TeamRegister` ADD CONSTRAINT `TeamRegister_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_teamRegisterId_fkey` FOREIGN KEY (`teamRegisterId`) REFERENCES `TeamRegister`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Quests` ADD CONSTRAINT `Quests_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventInGame` ADD CONSTRAINT `EventInGame_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventGameRanking` ADD CONSTRAINT `EventGameRanking_eventInGameId_fkey` FOREIGN KEY (`eventInGameId`) REFERENCES `EventInGame`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventGameRanking` ADD CONSTRAINT `EventGameRanking_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `_Betterteams_teamToQuests` ADD CONSTRAINT `_Betterteams_teamToQuests_A_fkey` FOREIGN KEY (`A`) REFERENCES `Betterteams_team`(`teamID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Betterteams_teamToQuests` ADD CONSTRAINT `_Betterteams_teamToQuests_B_fkey` FOREIGN KEY (`B`) REFERENCES `Quests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
