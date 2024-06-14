-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCliente" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" DATETIME NOT NULL,
    "cupomId" TEXT,
    CONSTRAINT "Pedido_cupomId_fkey" FOREIGN KEY ("cupomId") REFERENCES "Cupom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PedidoPendente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomeCliente" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" DATETIME NOT NULL,
    "cupomId" TEXT,
    CONSTRAINT "PedidoPendente_cupomId_fkey" FOREIGN KEY ("cupomId") REFERENCES "Cupom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acai" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" DATETIME NOT NULL,
    "embalagemId" TEXT NOT NULL,
    "pedidoId" TEXT,
    "pedidoPendenteId" TEXT,
    CONSTRAINT "Acai_embalagemId_fkey" FOREIGN KEY ("embalagemId") REFERENCES "Embalagem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Acai_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Acai_pedidoPendenteId_fkey" FOREIGN KEY ("pedidoPendenteId") REFERENCES "PedidoPendente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cupom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataExpiracao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Embalagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" DATETIME NOT NULL,
    "categoria" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "unidadeMedida" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Adicional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" DATETIME NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "acaiId" TEXT,
    CONSTRAINT "Adicional_acaiId_fkey" FOREIGN KEY ("acaiId") REFERENCES "Acai" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
