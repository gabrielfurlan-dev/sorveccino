import { GetAll } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await GetAll();
    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
