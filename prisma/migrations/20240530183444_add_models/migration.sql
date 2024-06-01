-- CreateTable
CREATE TABLE "Acompanhamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "CoposAcai" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tamanho" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL
);
