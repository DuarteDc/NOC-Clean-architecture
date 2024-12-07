/*
  Warnings:

  - You are about to drop the column `mesaage` on the `LogModel` table. All the data in the column will be lost.
  - Added the required column `message` to the `LogModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP COLUMN "mesaage",
ADD COLUMN     "message" TEXT NOT NULL;
