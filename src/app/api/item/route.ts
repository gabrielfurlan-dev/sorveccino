import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/db/connection";
import { itens } from "@/db/schemas/itens";

export async function GET(req: NextRequest) {
    try {
        const items = await db.select().from(itens);
        console.log(items);
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar coisas:', error);
        return NextResponse.json({ error: 'Erro ao buscar itens' }, { status: 500 });
    }
}