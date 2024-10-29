import { db } from "@/db/connection";
import { faker } from '@faker-js/faker';
import { orders } from "./schemas";
// import { customers } from "@/db/schemas/customers";
// import { embalagens } from "./test/embalagens";
// import { itens } from "./test/itens";

const [order] = await db.insert(orders).values({
    description: "Açai de nutella com morango",
    total: "21.75",
    totalRecieved: "16.75",
    customer: {
        name: "Cristiano Rosinaldo",
        notes: "Siiiuuu"
    }
}).returning({
    id: orders.id
})

// await db.delete(customers).execute();
// console.log("deleting customers...");

// const [customer] = await db.insert(customers).values({
//     name: faker.person.fullName(),
//     cpf: "719.207.030-04",
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     zipCode: faker.location.zipCode(),
//     address: faker.location.street(),
//     city: faker.location.city(),
//     state: faker.location.state(),
//     number: faker.location.buildingNumber(),
//     complement: faker.location.secondaryAddress(),
//     neighborhood: faker.location.county()
// }).returning({
//     id: customers.id
// })

// console.log(`customer added: id = ${customer.id}`);

// const [item] = await db.insert(itens).values({
//     nome: 'Morango',
//     categoria: 'Frutas',
//     preco: '1.99',
// }).returning({
//     id: itens.id
// });

// console.log(`item added: id = ${item.id}`);

// const [embalagem] = await db.insert(embalagens).values({
//     tamanho: '330',
//     unidadeMedida: 'ml',
//     idItem: item.id
// }).returning({
//     id: embalagens.id
// });

// console.log(`embalagem added: id = ${embalagem.id}`);

console.log('Database seeded successfully.');
process.exit();