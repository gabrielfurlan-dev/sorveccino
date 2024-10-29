import { Get } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const { id } = context.params;

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Missing id",
      });

    const data = await Get(id);

    return NextResponse.json({
      success: true,
      data: data,
      message: `Order "${id}" found.`,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      message: (error as Error).message,
    });
  }
}
