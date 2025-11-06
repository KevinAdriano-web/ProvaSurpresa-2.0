# Sistema Prova Surpresa

Sistema completo de provas online com backend em Node.js/Express e frontend em React.

## Estrutura do Projeto

```
ProvaSurpresa/
├── Backend/           # API REST em Node.js
│   ├── src/
│   │   ├── controller/
│   │   ├── repository/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── rotas.js
│   ├── sql/
│   └── package.json
│
└── Frontend/          # Interface em React
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── index.html
    └── package.json
```

## Pré-requisitos

- Node.js 16+
- MySQL 8+
- npm ou yarn

## Configuração do Banco de Dados

1. Execute o script SQL em `Backend/sql/ddl.sql` para criar as tabelas
2. Configure a conexão no arquivo `Backend/src/repository/conection.js`

## Instalação

### Backend

```bash
cd Backend
npm install
npm start
```

O backend estará disponível em `http://localhost:5010`

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Funcionalidades

### Autenticação
- Login e registro de usuários
- Autenticação via JWT
- Suporte para roles (aluno/professor)

### Para Alunos
- Visualizar provas disponíveis
- Responder provas
- Ver histórico de respostas

### Para Professores
- Criar novas provas
- Adicionar múltiplas perguntas
- Configurar alternativas com resposta correta
- Adicionar imagens às perguntas (opcional)
- Todas as funcionalidades de aluno

## API Endpoints

### Autenticação
- `POST /login` - Login de usuário
- `POST /register` - Registro de novo usuário

### Provas
- `GET /provas` - Listar todas as provas
- `GET /provas/:id` - Obter detalhes de uma prova
- `POST /provas` - Criar nova prova (professor)

### Respostas
- `POST /respostas` - Submeter respostas de uma prova
- `GET /respostas/me` - Listar respostas do usuário logado

## Tecnologias Utilizadas

### Backend
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- CORS

### Frontend
- React 18
- React Router DOM
- Axios
- Vite

## Desenvolvimento

Para desenvolvimento, execute ambos os servidores (backend e frontend) simultaneamente em terminais separados.

## Portas

- Backend: 5010
- Frontend: 3000

O frontend está configurado para fazer proxy das requisições `/api/*` para o backend automaticamente.
