import { obterItensDeAcai } from '@/lib/repos/acai'

export async function GET() {
    try {
        const itensAcai = await obterItensDeAcai();
        return Response.json({
            itensAcai
        })
    } catch (ex) {
        throw new Error("Não foi possivel obter os itens do açai")
    }
}