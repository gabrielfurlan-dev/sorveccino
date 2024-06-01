/*
  Warnings:

  - You are about to drop the `CoposAcai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CoposAcai";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TamanhoCoposAcai" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tamanho" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL
);
