/*
  Warnings:

  - You are about to drop the `Entry` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('AWESOME', 'GOOD', 'OKAY', 'BAD', 'AWFUL');

-- DropTable
DROP TABLE "Entry";

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "mood" "Mood" NOT NULL,
    "notes" TEXT,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActiviyToEntry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActiviyToEntry_AB_unique" ON "_ActiviyToEntry"("A", "B");

-- CreateIndex
CREATE INDEX "_ActiviyToEntry_B_index" ON "_ActiviyToEntry"("B");

-- AddForeignKey
ALTER TABLE "_ActiviyToEntry" ADD CONSTRAINT "_ActiviyToEntry_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviyToEntry" ADD CONSTRAINT "_ActiviyToEntry_B_fkey" FOREIGN KEY ("B") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
