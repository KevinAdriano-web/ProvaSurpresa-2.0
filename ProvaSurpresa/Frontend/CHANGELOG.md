# Changelog - Prova Surpresa Frontend

## [1.0.0] - 2025-11-06

### ✨ Adicionado
- Interface completa em React 18
- Sistema de autenticação com Context API
- Páginas:
  - Login e Registro
  - Lista de provas
  - Formulário de criação de prova (professor)
  - Visualização e resposta de prova (aluno)
  - Histórico de respostas
- Componentes reutilizáveis:
  - Navbar
- Serviços:
  - Configuração de API com Axios
  - Interceptor para JWT
- Estilos responsivos e modernos
- Proxy configurado para API backend
- Validações de formulário
- Mensagens de erro e sucesso
- Navegação com React Router DOM

### 🔧 Backend - Melhorias
- Adicionado suporte a CORS
- Atualizado para se comunicar com o frontend

### 📚 Documentação
- README.md completo
- GUIA_DE_USO.md detalhado
- Exemplos de arquivos .env
- Script PowerShell para início rápido

### 🎨 Interface
- Design dark mode com suporte a light mode
- Cards para provas e perguntas
- Formulários intuitivos
- Feedback visual para seleção de alternativas
- Layout responsivo

### 🔐 Segurança
- Autenticação JWT
- Proteção de rotas
- Validação de permissões por role
- Armazenamento seguro de tokens

### 🚀 Performance
- Build otimizado com Vite
- Code splitting automático
- Hot Module Replacement (HMR)
- Lazy loading de componentes

## Tecnologias Utilizadas

### Frontend
- React 18.2.0
- React Router DOM 6.20.1
- Axios 1.6.2
- Vite 5.0.8

### Backend (atualizações)
- CORS 2.8.5

## Estrutura de Arquivos Criados

```
Frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProvasList.jsx
│   │   ├── ProvaForm.jsx
│   │   ├── ProvaView.jsx
│   │   └── MinhasRespostas.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## Rotas Implementadas

- `/login` - Página de login
- `/register` - Página de registro
- `/` - Lista de provas (protegida)
- `/provas/criar` - Criar prova (protegida, professor)
- `/provas/:id` - Visualizar/Responder prova (protegida)
- `/minhas-respostas` - Histórico de respostas (protegida)

## API Endpoints Utilizados

- `POST /login` - Login
- `POST /register` - Registro
- `GET /provas` - Listar provas
- `GET /provas/:id` - Obter prova
- `POST /provas` - Criar prova
- `POST /respostas` - Submeter respostas
- `GET /respostas/me` - Listar respostas do usuário
