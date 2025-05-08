Este é um projeto de loja virtual full stack desenvolvido com:

Backend**: Node.js + Express + Prisma + SQLite
Frontend**: HTML, CSS, AngularJS
Autenticação**: JWT + bcrypt
Funcionalidades: Cadastro e listagem de produtos, carrinho de compras, login


Não consegui fazer 100% funcional o adicionar ao carrinho de compras, tive problemas no desenvolvimento e acabou quebrando durante o progresso

Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

1)Clone the repository

2)Install the dependencies

  npm install
  
3)Create the .env

  DATABASE_URL="file:./dev.db"
  ACCESS_KEY="minha_chave_secreta"

4)Setup the DataBase

  npx prisma migrate dev --name init
  npx prisma db seed

5)Run the server

npm run dev
