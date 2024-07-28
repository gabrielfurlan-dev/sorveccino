import { NewOrderFormSchema } from "@/lib/Backend/Order/Types/Commands/NewOrderForm";
import { New } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const order = NewOrderFormSchema.parse(await request.json());
    await New(order);
    return NextResponse.json({ success: true, message: "Order created" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
