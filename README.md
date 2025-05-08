Este é um projeto de loja virtual full stack desenvolvido com:

Backend**: Node.js + Express + Prisma + SQLite
Frontend**: HTML, CSS, AngularJS
Autenticação**: JWT + bcrypt
Funcionalidades: Cadastro e listagem de produtos, carrinho de compras, login


Não consegui fazer 100% funcional o adicionar ao carrinho de compras, tive problemas no desenvolvimento e acabou quebrando durante o progresso

Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

1. Clone o repositório
Primeiro, clone o repositório em sua máquina local:

bash
Copiar
Editar
git clone 
cd loja-backend

2. Instale as dependências
Instale as dependências do projeto utilizando o npm:

bash
Copiar
Editar
npm install
3. Crie o arquivo .env
Crie um arquivo .env na raiz do diretório e adicione as seguintes variáveis de ambiente:

bash
Copiar
Editar
DATABASE_URL="file:./dev.db"
ACCESS_KEY="minha_chave_secreta"
DATABASE_URL: Configura o caminho para o banco de dados SQLite.

ACCESS_KEY: Chave secreta para a assinatura dos tokens JWT.

4. Configure o Banco de Dados
Para configurar o banco de dados, rode as migrações e seeding com os seguintes comandos:

bash
Copiar
Editar
npx prisma migrate dev --name init
npx prisma db seed
5. Inicie o servidor
Agora você pode rodar o servidor com o seguinte comando:

bash
Copiar
Editar
npm run dev
O servidor estará rodando na porta configurada
