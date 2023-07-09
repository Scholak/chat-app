/*
  Warnings:

  - You are about to alter the column `to` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `from` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `to` INTEGER NOT NULL,
    MODIFY `from` INTEGER NOT NULL;
