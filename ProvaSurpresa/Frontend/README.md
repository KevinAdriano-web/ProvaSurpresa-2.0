# Frontend - Prova Surpresa

Frontend em React para o sistema de provas online.

## Tecnologias

- React 18
- React Router DOM
- Axios
- Vite

## Instalação

```bash
cd Frontend
npm install
```

## Configuração

O frontend está configurado para se conectar com o backend na porta 5010. Se o backend estiver em outra porta, ajuste o arquivo `vite.config.js`.

## Executar

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

## Funcionalidades

### Para todos os usuários:
- Login e registro
- Visualizar provas disponíveis
- Responder provas
- Ver histórico de respostas

### Para professores:
- Criar novas provas
- Adicionar múltiplas perguntas
- Configurar alternativas com resposta correta
- Adicionar imagens às perguntas (opcional)

## Estrutura de Pastas

```
Frontend/
├── src/
│   ├── contexts/          # Context API (AuthContext)
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProvasList.jsx
│   │   ├── ProvaForm.jsx
│   │   ├── ProvaView.jsx
│   │   └── MinhasRespostas.jsx
│   ├── services/          # Configuração de API
│   ├── App.jsx            # Component principal
│   ├── App.css            # Estilos
│   ├── main.jsx           # Entrada da aplicação
│   └── index.css          # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## Como usar

1. **Registrar uma conta**: Acesse `/register` e crie uma conta como aluno ou professor
2. **Fazer login**: Use suas credenciais em `/login`
3. **Ver provas**: A página inicial lista todas as provas disponíveis
4. **Responder prova**: Clique em "Ver Prova" para responder
5. **Criar prova** (professor): Use o botão "Criar Prova" no menu
6. **Ver respostas**: Acesse "Minhas Respostas" no menu

## Proxy

O Vite está configurado para fazer proxy das requisições `/api/*` para o backend em `http://localhost:5010`.
