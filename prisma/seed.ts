import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await adicionarAcompanhamentos()
    await adicionarFrutas()
    await adicionarCremes()
    await adicionarTamanhoCoposAcai()
}

async function adicionarTamanhoCoposAcai() {
    await prisma.tamanhoCoposAcai.upsert({
        where: { id: '1' },
        update: {},
        create: { id: '1', tamanho: "330ml", preco: 10 }
    })
    await prisma.tamanhoCoposAcai.upsert({
        where: { id: '2' },
        update: {},
        create: { id: '2', tamanho: "440ml", preco: 12 }
    })
    await prisma.tamanhoCoposAcai.upsert({
        where: { id: '3' },
        update: {},
        create: { id: '3', tamanho: "550ml", preco: 14 }
    })
    await prisma.tamanhoCoposAcai.upsert({
        where: { id: '4' },
        update: {},
        create: { id: '4', tamanho: "770", preco: 17 }
    })
    await prisma.tamanhoCoposAcai.upsert({
        where: { id: '5' },
        update: {},
        create: { id: '5', tamanho: "1L", preco: 24 }
    })

    console.log("Copos de açai adicionados com sucesso.")
}
async function adicionarAcompanhamentos() {
    await prisma.acompanhamentos.upsert({
        where: { id: '1' },
        update: {},
        create: { id: '1', nome: "Paçoca", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '2' },
        update: {},
        create: { id: '2', nome: "Granola", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '3' },
        update: {},
        create: { id: '3', nome: "Amendoim Granulado", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '4' },
        update: {},
        create: { id: '4', nome: "Ouro Branco", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '5' },
        update: {},
        create: { id: '5', nome: "Sonho de Valsa", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '6' },
        update: {},
        create: { id: '6', nome: "KitKat", preco: 4 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '7' },
        update: {},
        create: { id: '7', nome: "Ovo Maltine", preco: 2.5 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '8' },
        update: {},
        create: { id: '8', nome: "Leite em Pó", preco: 2 }
    })
    await prisma.acompanhamentos.upsert({
        where: { id: '9' },
        update: {},
        create: { id: '9', nome: "Confete", preco: 2.5 }
    })

    console.log("acompanhamentos adicionados com sucesso.")
}
async function adicionarFrutas() {
    await prisma.frutas.upsert({
        where: { id: '22' },
        update: {},
        create: { id: '22', nome: "Morango", preco: 4 }
    })
    await prisma.frutas.upsert({
        where: { id: '23' },
        update: {},
        create: { id: '23', nome: "Banana", preco: 2 }
    })
    await prisma.frutas.upsert({
        where: { id: '24' },
        update: {},
        create: { id: '24', nome: "Cereja", preco: 4 }
    })

    console.log("Frutas adicionadas com sucesso.")
}
async function adicionarCremes() {
    await prisma.cremes.upsert({
        where: { id: '10' },
        update: {},
        create: { id: '10', nome: "Creme de Ninho", preco: 4 }
    })
    await prisma.cremes.upsert({
        where: { id: '11' },
        update: {},
        create: { id: '11', nome: "Creme de Avelã", preco: 4 }
    })
    await prisma.cremes.upsert({
        where: { id: '12' },
        update: {},
        create: { id: '12', nome: "Creme de Cookies Branco", preco: 4 }
    })
    await prisma.cremes.upsert({
        where: { id: '13' },
        update: {},
        create: { id: '13', nome: "Creme de Bombom", preco: 4 }
    })
    await prisma.cremes.upsert({
        where: { id: '14' },
        update: {},
        create: { id: '14', nome: "Nutella", preco: 7 }
    })
    await prisma.cremes.upsert({
        where: { id: '15' },
        update: {},
        create: { id: '15', nome: "Pistache", preco: 7 }
    })
    await prisma.cremes.upsert({
        where: { id: '16' },
        update: {},
        create: { id: '16', nome: "Creme de Coco", preco: 4 }
    })
    await prisma.cremes.upsert({
        where: { id: '17' },
        update: {},
        create: { id: '17', nome: "Leite Condensado", preco: 1.5 }
    })
    await prisma.cremes.upsert({
        where: { id: '18' },
        update: {},
        create: { id: '18', nome: "Calda de Chocolate", preco: 1.5 }
    })
    await prisma.cremes.upsert({
        where: { id: '19' },
        update: {},
        create: { id: '19', nome: "Calda de Morango", preco: 1.5 }
    })
    await prisma.cremes.upsert({
        where: { id: '20' },
        update: {},
        create: { id: '20', nome: "Calda de Limão", preco: 1.5 }
    })
    await prisma.cremes.upsert({
        where: { id: '21' },
        update: {},
        create: { id: '21', nome: "Calda de Caramelo", preco: 1.5 }
    })

    console.log("Cremes adicionados com sucesso.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })