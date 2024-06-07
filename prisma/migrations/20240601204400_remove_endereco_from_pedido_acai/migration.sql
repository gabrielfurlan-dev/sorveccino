/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `PedidoAcai` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "Cliente_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PedidoAcai" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cobrarTaxaEntrega" BOOLEAN NOT NULL,
    "tamanhoCoposAcaiId" TEXT NOT NULL,
    CONSTRAINT "PedidoAcai_tamanhoCoposAcaiId_fkey" FOREIGN KEY ("tamanhoCoposAcaiId") REFERENCES "TamanhoCoposAcai" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PedidoAcai" ("cobrarTaxaEntrega", "id", "tamanhoCoposAcaiId") SELECT "cobrarTaxaEntrega", "id", "tamanhoCoposAcaiId" FROM "PedidoAcai";
DROP TABLE "PedidoAcai";
ALTER TABLE "new_PedidoAcai" RENAME TO "PedidoAcai";
PRAGMA foreign_key_check("PedidoAcai");
PRAGMA foreign_keys=ON;
