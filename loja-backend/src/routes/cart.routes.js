// cart.routes.js (backend)
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET - visualizar o carrinho com dados do produto
router.get("/", async (req, res) => {
    try {
        const cartItems = await prisma.cartItem.findMany({
            include: { product: true }
        });
        res.json(cartItems);
    } catch (err) {
        console.error("Erro ao carregar o carrinho:", err);
        res.status(500).json({ error: "Erro ao carregar o carrinho" });
    }
});

// POST - adicionar ao carrinho
router.post("/", async (req, res) => {
    const { productId, quantity } = req.body;

    // Verifica se os dados estão corretos
    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    try {

        const existingItem = await prisma.cartItem.findFirst({ where: { productId } });

        if (existingItem) {

            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            });
            return res.json(updatedItem);
        }


        const newItem = await prisma.cartItem.create({
            data: { productId, quantity }
        });

        res.status(201).json(newItem);
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
    }
});


router.delete("/", async (req, res) => {
    try {
        await prisma.cartItem.deleteMany();
        res.status(204).end();
    } catch (err) {
        console.error("Erro ao limpar carrinho:", err);
        res.status(500).json({ error: "Erro ao limpar carrinho" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    console.log(`Tentando remover o item com id: ${id}`);

    try {

        const existingItem = await prisma.cartItem.findUnique({
            where: { id: parseInt(id) }
        });


        if (!existingItem) {
            console.log("Item não encontrado.");
            return res.status(404).json({ error: "Item não encontrado" });
        }


        const deletedItem = await prisma.cartItem.delete({
            where: { id: parseInt(id) }
        });

        console.log("Item removido:", deletedItem);
        res.status(200).json(deletedItem);
    } catch (err) {
        console.error("Erro ao remover item:", err);
        res.status(500).json({ error: "Erro ao remover item do carrinho" });
    }
});

module.exports = router;
