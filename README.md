# 🚀 Etherning - Sistema de Autenticação

Sistema completo de autenticação com login e cadastro usando Node.js, Express e MongoDB.

## ✨ Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com autenticação JWT
- ✅ Validação de dados
- ✅ Criptografia de senhas (bcrypt)
- ✅ Banco de dados NoSQL (MongoDB)
- ✅ Interface moderna e responsiva
- ✅ Dashboard protegido

## 🛠️ Tecnologias

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt.js
- Express Validator

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) ou conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

## 🚀 Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar MongoDB

**Opção A - MongoDB Local:**
- Certifique-se de que o MongoDB está rodando localmente na porta padrão (27017)
- O arquivo `.env` já está configurado para uso local

**Opção B - MongoDB Atlas (Cloud):**
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Obtenha sua connection string
4. Edite o arquivo `.env` e substitua `MONGODB_URI`:
```
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/etherning
```

### 3. Iniciar o servidor

**Modo de desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo de produção:**
```bash
npm start
```

O servidor iniciará em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
etherning/
├── config/
│   └── database.js          # Configuração do MongoDB
├── models/
│   └── User.js              # Model de usuário
├── routes/
│   └── auth.js              # Rotas de autenticação
├── public/
│   ├── login.html           # Página de login
│   ├── cadastro.html        # Página de cadastro
│   ├── dashboard.html       # Dashboard do usuário
│   ├── style.css            # Estilos
│   └── js/
│       ├── login.js         # Script de login
│       └── cadastro.js      # Script de cadastro
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo de variáveis
├── .gitignore               # Arquivos ignorados pelo git
├── server.js                # Servidor Express
├── package.json             # Dependências
└── README.md                # Este arquivo
```

## 🔑 Variáveis de Ambiente

Arquivo `.env`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/etherning
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

⚠️ **IMPORTANTE**: Em produção, altere o `JWT_SECRET` para uma chave segura!

## 📡 Rotas da API

### Autenticação

**POST** `/api/auth/register`
- Registra um novo usuário
- Body: `{ name, email, password }`
- Retorna: Token JWT e dados do usuário

**POST** `/api/auth/login`
- Faz login de um usuário
- Body: `{ email, password }`
- Retorna: Token JWT e dados do usuário

**GET** `/api/auth/me`
- Obtém dados do usuário logado
- Headers: `Authorization: Bearer <token>`
- Retorna: Dados do usuário

### Teste

**GET** `/api/health`
- Verifica se o servidor está funcionando
- Retorna: Status do servidor

## 🖥️ Como usar

1. Acesse `http://localhost:3000/cadastro.html`
2. Crie uma nova conta
3. Você será redirecionado para o dashboard
4. Ou faça login em `http://localhost:3000/login.html`

## 🔒 Segurança

- Senhas são criptografadas com bcrypt (10 rounds)
- Autenticação baseada em JWT
- Validação de dados no backend
- Proteção CORS configurada
- Senhas nunca são retornadas nas consultas

## 📝 Validações

**Cadastro:**
- Nome: mínimo 3 caracteres
- Email: formato válido
- Senha: mínimo 8 caracteres

**Login:**
- Email: formato válido
- Senha: obrigatória

## 🐛 Troubleshooting

**Erro de conexão com MongoDB:**
- Verifique se o MongoDB está rodando
- Confirme a connection string no `.env`
- Verifique as credenciais (se usando Atlas)

**Porta já em uso:**
- Altere a variável `PORT` no arquivo `.env`

**Erro ao instalar dependências:**
- Tente remover `node_modules` e `package-lock.json`
- Execute `npm install` novamente

## 📦 Dependências Principais

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```

## 🎨 Telas

- **Login**: Interface limpa para autenticação
- **Cadastro**: Formulário completo com validações
- **Dashboard**: Painel com informações do usuário

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ para demonstração de sistema de autenticação completo.

---

**Dúvidas?** Abra uma issue no repositório!

