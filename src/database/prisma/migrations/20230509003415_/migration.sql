/*
  Warnings:

  - You are about to drop the `_ActiviyToEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActiviyToEntry" DROP CONSTRAINT "_ActiviyToEntry_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActiviyToEntry" DROP CONSTRAINT "_ActiviyToEntry_B_fkey";

-- DropTable
DROP TABLE "_ActiviyToEntry";

-- CreateTable
CREATE TABLE "_ActivityToEntry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToEntry_AB_unique" ON "_ActivityToEntry"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToEntry_B_index" ON "_ActivityToEntry"("B");

-- AddForeignKey
ALTER TABLE "_ActivityToEntry" ADD CONSTRAINT "_ActivityToEntry_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToEntry" ADD CONSTRAINT "_ActivityToEntry_B_fkey" FOREIGN KEY ("B") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
