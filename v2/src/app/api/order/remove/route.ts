import { Delete } from "@/lib/Backend/Order/UseCases/OrderUseCases";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Missing id",
      });

    await Delete(id);

    return NextResponse.json({
      success: true,
      message: `Order "${id}" deleted`,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
