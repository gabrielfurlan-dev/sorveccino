import { UpdateOrderCommandSchema } from "@/lib/Backend/Order/Types/Commands/UpdateOrderCommand";
import { Update } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const order = UpdateOrderCommandSchema.parse(await req.json());
    await Update(order);
    return NextResponse.json({
      success: true,
      message: "Order updated",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
