import { describe, expect } from "bun:test";
import { AddOrderCommand } from "@/lib/orders/commands/addOrderCommand";
import { execute } from "@/lib/orders/useCases/addOrderUseCase";

describe("Should Save Order", async () => {
  
    //TODO: NEED TO INSERT A NEW COSTUMER FIRST BECAUSE THE ORDER NEEDS TO BE ASSOCIATED WITH A COSTUMER
  
    const order: AddOrderCommand = {
    costumerId: "1",
    date: new Date(),
    acais: [
      {
        price: 5,
        packaging: {
          id: "1",
          categoria: "acai",
          nome: "Copo 330ml",
          unidadeMedida: "ml",
          tamanho: 330,
          preco: 10,
        },
        additionals: [
          {
            id: "1",
            nome: "Morango",
            categoria: "Frutas",
            preco: 4,
          },
          {
            id: "2",
            nome: "Creme de Ninho",
            categoria: "Cremes",
            preco: 4,
          },
        ],
        onservations: "",
        category: "acai",
      },
    ],
  };

  await execute(order);

});
