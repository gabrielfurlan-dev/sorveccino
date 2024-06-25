import { db } from "@/db/connection";
import { AddOrderCommand } from "../commands/addOrderCommand";
import { IOrderRepository } from "../interfaces/iOrderRepository";

export class OrderRepository implements IOrderRepository {
    async save(order: AddOrderCommand) {
        // await db.insert().values({
        //     ...order
        // })
    }

}