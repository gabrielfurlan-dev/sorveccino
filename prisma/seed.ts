import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await adicionarAcompanhamentos()
    await adicionarFrutas()
    await adicionarCremes()
    await adicionarTamanhoCoposAcai()
}

async function adicionarTamanhoCoposAcai() {
    await prisma.embalagem.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            categoria: "Copos de Acai",
            tamanho: 330,
            nome: "Copo 330ml",
            unidadeMedida: "ml"
        }
    })
    await prisma.embalagem.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            categoria: "Copos de Acai",
            tamanho: 440,
            nome: "Copo 440ml",
            unidadeMedida: "ml"
        }
    })
    await prisma.embalagem.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            categoria: "Copos de Acai",
            tamanho: 550,
            nome: "Copo 550ml",
            unidadeMedida: "ml"
        }
    })
    await prisma.embalagem.upsert({
        where: { id: '4' },
        update: {},
        create: {
            id: '4',
            categoria: "Copos de Acai",
            tamanho: 770,
            nome: "Copo 770ml",
            unidadeMedida: "ml"
        }
    })
    await prisma.embalagem.upsert({
        where: { id: '5' },
        update: {},
        create: {
            id: '5',
            categoria: "Potes de Acai",
            tamanho: 1,
            nome: "Pote 1L",
            unidadeMedida: "L"
        }
    })

    console.log("Copos de açai adicionados com sucesso.")
}
async function adicionarAcompanhamentos() {
    await prisma.adicional.upsert({
        where: { id: '1' },
        update: {},
        create: { id: '1', categoria: "Acompanhamentos", nome: "Paçoca", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '2' },
        update: {},
        create: { id: '2', categoria: "Acompanhamentos", nome: "Granola", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '3' },
        update: {},
        create: { id: '3', categoria: "Acompanhamentos", nome: "Amendoim Granulado", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '4' },
        update: {},
        create: { id: '4', categoria: "Acompanhamentos", nome: "Ouro Branco", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '5' },
        update: {},
        create: { id: '5', categoria: "Acompanhamentos", nome: "Sonho de Valsa", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '6' },
        update: {},
        create: { id: '6', categoria: "Acompanhamentos", nome: "KitKat", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '7' },
        update: {},
        create: { id: '7', categoria: "Acompanhamentos", nome: "Ovo Maltine", preco: 2.5 }
    })
    await prisma.adicional.upsert({
        where: { id: '8' },
        update: {},
        create: { id: '8', categoria: "Acompanhamentos", nome: "Leite em Pó", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '9' },
        update: {},
        create: { id: '9', categoria: "Acompanhamentos", nome: "Confete", preco: 2.5 }
    })

    console.log("acompanhamentos adicionados com sucesso.")
}
async function adicionarFrutas() {
    await prisma.adicional.upsert({
        where: { id: '22' },
        update: {},
        create: { id: '22', categoria: "Frutas", nome: "Morango", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '23' },
        update: {},
        create: { id: '23', categoria: "Frutas", nome: "Banana", preco: 2 }
    })
    await prisma.adicional.upsert({
        where: { id: '24' },
        update: {},
        create: { id: '24', categoria: "Frutas", nome: "Cereja", preco: 4 }
    })

    console.log("Frutas adicionadas com sucesso.")
}
async function adicionarCremes() {
    await prisma.adicional.upsert({
        where: { id: '10' },
        update: {},
        create: { id: '10', categoria: "Cremes", nome: "Creme de Ninho", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '11' },
        update: {},
        create: { id: '11', categoria: "Cremes", nome: "Creme de Avelã", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '12' },
        update: {},
        create: { id: '12', categoria: "Cremes", nome: "Creme de Cookies Branco", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '13' },
        update: {},
        create: { id: '13', categoria: "Cremes", nome: "Creme de Bombom", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '14' },
        update: {},
        create: { id: '14', categoria: "Cremes", nome: "Nutella", preco: 7 }
    })
    await prisma.adicional.upsert({
        where: { id: '15' },
        update: {},
        create: { id: '15', categoria: "Cremes", nome: "Pistache", preco: 7 }
    })
    await prisma.adicional.upsert({
        where: { id: '16' },
        update: {},
        create: { id: '16', categoria: "Cremes", nome: "Creme de Coco", preco: 4 }
    })
    await prisma.adicional.upsert({
        where: { id: '17' },
        update: {},
        create: { id: '17', categoria: "Cremes", nome: "Leite Condensado", preco: 1.5 }
    })
    await prisma.adicional.upsert({
        where: { id: '18' },
        update: {},
        create: { id: '18', categoria: "Cremes", nome: "Calda de Chocolate", preco: 1.5 }
    })
    await prisma.adicional.upsert({
        where: { id: '19' },
        update: {},
        create: { id: '19', categoria: "Cremes", nome: "Calda de Morango", preco: 1.5 }
    })
    await prisma.adicional.upsert({
        where: { id: '20' },
        update: {},
        create: { id: '20', categoria: "Cremes", nome: "Calda de Limão", preco: 1.5 }
    })
    await prisma.adicional.upsert({
        where: { id: '21' },
        update: {},
        create: { id: '21', categoria: "Cremes", nome: "Calda de Caramelo", preco: 1.5 }
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