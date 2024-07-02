import { db } from "@/db/connection";
import { faker } from '@faker-js/faker';
import { customers } from "@/db/schemas/customers";
import { embalagens } from "./schemas/embalagens";
import { itens } from "./schemas/itens";

// await db.delete(customers).execute();
// console.log("deleting customers...");

// const [customer] = await db.insert(customers).values({
//     name: faker.person.fullName(),
// }).returning({
//     id: customers.id
// })

// console.log(`customer added: id = ${customer.id}`);

const [item] = await db.insert(itens).values({
    nome: 'Morango',
    categoria: 'Frutas',
    preco: '1.99',
}).returning({
    id: itens.id
});

console.log(`item added: id = ${item.id}`);

const [embalagem] = await db.insert(embalagens).values({
    tamanho: '330',
    unidadeMedida: 'ml',
    idItem: item.id
}).returning({
    id: embalagens.id
});

console.log(`embalagem added: id = ${embalagem.id}`);

console.log('Database seeded successfully.');
process.exit();