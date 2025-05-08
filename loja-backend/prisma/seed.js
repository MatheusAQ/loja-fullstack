require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('123456', 10);

    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: passwordHash,
        },
    });

    console.log('Usuário admin criado com sucesso.');

    const products = [
        {
            name: 'Camiseta',
            price: 100,
            description: 'Camiseta estilosa de algodão',
            image: '/assets/image/camisetaplaneta.png'
        },
        {
            name: 'Fone Nebuloso',
            price: 122,
            description: 'Fone de ouvido de alta qualidade',
            image: '/assets/image/fone-semfundo.png'
        },
        {
            name: 'Caneca Star',
            price: 40,
            description: 'Caneca inspirada em Star Wars',
            image: '/assets/image/caneca_star.png'
        },
        {
            name: 'Camiseta Nasa',
            price: 130,
            description: 'Camiseta com logo da NASA',
            image: '/assets/image/camisa nasa.png'  // <- para bater com o HTML
        }
    ];

    for (let product of products) {
        const existingProduct = await prisma.product.findUnique({
            where: { name: product.name },
        });

        if (!existingProduct) {
            await prisma.product.create({
                data: product
            });
            console.log(`${product.name} adicionado ao banco.`);
        } else {
            console.log(`${product.name} já existe no banco.`);
        }
    }

    console.log('Produtos adicionados com sucesso.');
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
