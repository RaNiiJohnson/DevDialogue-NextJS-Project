/*
  Warnings:

  - You are about to drop the `Code` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "code" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Code";
PRAGMA foreign_keys=on;
