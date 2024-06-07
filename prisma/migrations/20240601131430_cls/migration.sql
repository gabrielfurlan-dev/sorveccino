-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "pedidoId" TEXT,
    CONSTRAINT "Item_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCliente" TEXT NOT NULL
);
