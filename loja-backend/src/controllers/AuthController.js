const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const AuthController = {

    async login(req, res) {
        const { username, password } = req.body;

        try {

            const user = await prisma.user.findUnique({
                where: { username: username }
            });

            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }


            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }


            const token = jwt.sign({ userId: user.id }, 'seu-segredo', { expiresIn: '1h' });


            return res.json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro no servidor' });
        }
    }
};

module.exports = AuthController;
