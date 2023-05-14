/*
  Warnings:

  - You are about to drop the `_ActivityToEntry` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `user_id` on table `activities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `entries` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ActivityToEntry" DROP CONSTRAINT "_ActivityToEntry_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivityToEntry" DROP CONSTRAINT "_ActivityToEntry_B_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_user_id_fkey";

-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_user_id_fkey";

-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "entries" ALTER COLUMN "user_id" SET NOT NULL;

-- DropTable
DROP TABLE "_ActivityToEntry";
