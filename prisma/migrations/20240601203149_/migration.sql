-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "pedidoAcaiId" TEXT,
    CONSTRAINT "Item_pedidoAcaiId_fkey" FOREIGN KEY ("pedidoAcaiId") REFERENCES "PedidoAcai" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PedidoAcai" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cobrarTaxaEntrega" BOOLEAN NOT NULL,
    "tamanhoCoposAcaiId" TEXT NOT NULL,
    "enderecoId" TEXT NOT NULL,
    CONSTRAINT "PedidoAcai_tamanhoCoposAcaiId_fkey" FOREIGN KEY ("tamanhoCoposAcaiId") REFERENCES "TamanhoCoposAcai" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoAcai_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "pontoDeReferencia" TEXT NOT NULL
);
