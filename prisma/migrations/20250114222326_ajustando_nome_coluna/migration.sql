/*
  Warnings:

  - You are about to drop the column `clickedAt` on the `click` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Click_userId_fkey` ON `click`;

-- AlterTable
ALTER TABLE `click` DROP COLUMN `clickedAt`,
    ADD COLUMN `clicked_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Click` ADD CONSTRAINT `Click_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
