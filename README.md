Este é um projeto de loja virtual full stack desenvolvido com:

Backend**: Node.js + Express + Prisma + SQLite
Frontend**: HTML, CSS, AngularJS
Autenticação**: JWT + bcrypt
Funcionalidades: Cadastro e listagem de produtos, carrinho de compras, login


Não consegui fazer 100% funcional o adicionar ao carrinho de compras, tive problemas no desenvolvimento e acabou quebrando durante o progresso

Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

Clone the repository
git clone
cd loja-backend
Install the dependencies
npm install
Create the .env
Create a .env file in the root dir and add:

DATABASE_URL="file:./dev.db"
ACCESS_KEY="minha_chave_secreta"
Setup the DataBase
npx prisma migrate dev --name init
npx prisma db seed
Run the server
npm run dev
