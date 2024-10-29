import { GetAll } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(23, 59, 59);

    const data = await GetAll({
      startDate: yesterday,
      endDate: new Date(),});
    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
