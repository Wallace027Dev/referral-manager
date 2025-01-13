/*
  Warnings:

  - You are about to drop the column `pixKey` on the `user` table. All the data in the column will be lost.
  - Added the required column `link_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pix_key` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pixKey`,
    ADD COLUMN `link_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `pix_key` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Click` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `clickedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Click` ADD CONSTRAINT `Click_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
