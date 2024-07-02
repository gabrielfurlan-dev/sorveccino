import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/db/connection";
import { itens } from "@/db/schemas/itens";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const items = await db.select().from(itens);
            console.log(items);
            res.status(200).json(items);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            res.status(500).json({ error: 'Erro ao buscar itens' });
        }
    } else {
        res.status(405).end()
    }
}