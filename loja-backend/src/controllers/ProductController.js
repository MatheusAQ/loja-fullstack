const prisma = require('../models/PrismaService');

class ProductController {
    static async create(req, res) {
        const { name, price, description, image } = req.body;


        if (!name || !price) {
            return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
        }

        try {
            const existingProduct = await prisma.product.findUnique({
                where: { name },
            });

            if (existingProduct) {
                return res.status(409).json({ message: 'Produto com esse nome já existe.' });
            }


            const product = await prisma.product.create({
                data: {
                    name,
                    price: parseFloat(price),
                    description: description || null,
                    image: image || null,
                },
            });

            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar produto.', error: error.message });
        }
    }

    static async list(req, res) {
        try {
            const products = await prisma.product.findMany();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
        }
    }
}

module.exports = ProductController;
