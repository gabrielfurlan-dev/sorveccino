import { db } from "@/db/connection";
import { faker } from '@faker-js/faker';
import { customers } from "@/db/schemas/customers";

await db.delete(customers).execute();
console.log("deleting customers...");

const [customer] = await db.insert(customers).values({
    name: faker.person.fullName(),
}).returning({
    id: customers.id
})
console.log(`customer added: id = ${customer.id}`);

console.log('Database seeded successfully.');
process.exit();