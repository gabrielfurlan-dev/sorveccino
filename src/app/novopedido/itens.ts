import { obterItensDeAcai } from '@/lib/repos/acai'
import { NextApiRequest, NextApiResponse } from "next";

export default async function ObterItensAcai(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // const itensAcai = await obterItensDeAcai();
        // console.log(itensAcai)
        // return itensAcai;
        return []
    } catch (ex) {
        throw new Error("Não foi possivel obter os itens do açai")
    }
}