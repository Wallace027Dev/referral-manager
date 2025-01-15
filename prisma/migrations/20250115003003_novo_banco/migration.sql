-- DropIndex
DROP INDEX `Click_user_id_fkey` ON `click`;

-- AddForeignKey
ALTER TABLE `Click` ADD CONSTRAINT `Click_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
