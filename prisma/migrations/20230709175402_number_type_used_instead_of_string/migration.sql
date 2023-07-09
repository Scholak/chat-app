/*
  Warnings:

  - You are about to alter the column `userOne` on the `Friend` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userTwo` on the `Friend` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `sender` on the `FriendRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `reciever` on the `FriendRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Friend` MODIFY `userOne` INTEGER NOT NULL,
    MODIFY `userTwo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FriendRequest` MODIFY `sender` INTEGER NOT NULL,
    MODIFY `reciever` INTEGER NOT NULL;
