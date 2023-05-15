/*
  Warnings:

  - You are about to drop the column `mood` on the `entries` table. All the data in the column will be lost.
  - Added the required column `mood_id` to the `entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "entries" DROP COLUMN "mood",
ADD COLUMN     "mood_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Mood";

-- CreateTable
CREATE TABLE "moods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
);
