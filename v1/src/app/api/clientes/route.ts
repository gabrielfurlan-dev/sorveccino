import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/connection';
import { customers } from '@/db/schemas';

export async function GET(req: NextRequest) {
    try {
        const costumer = await db.select().from(customers);
        console.log(costumer);
        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        console.log('Erro ao buscar clientes: ', error);
        return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
    }
}