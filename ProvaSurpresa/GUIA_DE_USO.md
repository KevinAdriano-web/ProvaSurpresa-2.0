# Guia de Uso - Sistema Prova Surpresa

## 🚀 Início Rápido

### Opção 1: Script Automático (Windows)
```powershell
.\start.ps1
```

### Opção 2: Manual

**Terminal 1 - Backend:**
```bash
cd Backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

## 📋 Passo a Passo

### 1. Configurar Banco de Dados

1. Crie um banco de dados MySQL
2. Execute o script SQL em `Backend/sql/ddl.sql`
3. Configure a conexão em `Backend/src/repository/conection.js`

### 2. Primeiro Acesso

1. Acesse `http://localhost:3000`
2. Clique em "Registre-se"
3. Preencha os dados:
   - Email
   - Senha (mínimo 6 caracteres)
   - Tipo de Conta: Aluno ou Professor
4. Após registrar, faça login

### 3. Como Usar (Professor)

#### Criar uma Prova

1. Faça login como professor
2. Clique em "Criar Prova" no menu
3. Preencha o título da prova
4. Para cada pergunta:
   - Digite o texto da pergunta
   - (Opcional) Adicione URL de uma imagem
   - Preencha as 4 alternativas
   - Marque a alternativa correta
5. Use "Adicionar Pergunta" para mais perguntas
6. Clique em "Criar Prova"

#### Exemplo de Prova

**Título:** Conhecimentos Gerais de Programação

**Pergunta 1:**
- Texto: "Qual linguagem é mais usada para desenvolvimento web frontend?"
- Alternativas:
  - A) Python ⬜
  - B) JavaScript ✅
  - C) Java ⬜
  - D) C++ ⬜

**Pergunta 2:**
- Texto: "O que significa HTML?"
- Alternativas:
  - A) HyperText Markup Language ✅
  - B) High Tech Modern Language ⬜
  - C) Home Tool Markup Language ⬜
  - D) Hyperlinks and Text Markup Language ⬜

### 4. Como Usar (Aluno)

#### Responder uma Prova

1. Faça login como aluno
2. Na página inicial, veja todas as provas disponíveis
3. Clique em "Ver Prova" na prova desejada
4. Leia cada pergunta e selecione uma alternativa
5. Certifique-se de responder todas as perguntas
6. Clique em "Submeter Prova"
7. Você será redirecionado para "Minhas Respostas"

#### Ver Respostas Enviadas

1. Clique em "Minhas Respostas" no menu
2. Veja o histórico de todas as provas respondidas
3. Informações mostradas:
   - Título da prova
   - Data e hora da resposta
   - ID da resposta

## 🎨 Interface

### Página de Login
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link para registro

### Página Inicial (Provas)
- Lista de todas as provas disponíveis
- Informações de cada prova:
  - Título
  - Criador (email do professor)
  - Número de perguntas
- Botão para visualizar prova

### Página de Criação de Prova (Professor)
- Campo de título
- Seção para cada pergunta:
  - Texto da pergunta
  - URL de imagem (opcional)
  - 4 alternativas com checkbox para marcar a correta
  - Botão para remover pergunta
- Botão "Adicionar Pergunta"
- Botão "Criar Prova"

### Página de Responder Prova (Aluno)
- Título da prova
- Informação do criador
- Cada pergunta em um card:
  - Número da pergunta
  - Texto da pergunta
  - Imagem (se houver)
  - Alternativas (A, B, C, D) como radio buttons
- Botão "Submeter Prova"

### Página de Respostas
- Lista de provas respondidas
- Cada card mostra:
  - Título da prova
  - Data e hora da resposta
  - ID da resposta

## 🔐 Segurança

- Senhas são armazenadas no banco (considere usar bcrypt em produção)
- JWT para autenticação
- Rotas protegidas requerem token
- Validação de permissões (professor vs aluno)

## 🐛 Solução de Problemas

### Frontend não conecta ao Backend
- Verifique se o backend está rodando na porta 5010
- Verifique o arquivo `Frontend/vite.config.js`
- Certifique-se de que o CORS está habilitado no backend

### Erro ao criar prova
- Verifique se você está logado como professor
- Certifique-se de marcar a alternativa correta em todas as perguntas
- Todas as alternativas devem estar preenchidas

### Erro ao submeter resposta
- Certifique-se de responder todas as perguntas
- Verifique se você está autenticado
- Verifique a conexão com o backend

### Erro de banco de dados
- Verifique as configurações em `Backend/src/repository/conection.js`
- Certifique-se de que o MySQL está rodando
- Verifique se as tabelas foram criadas corretamente

## 📱 Responsividade

O sistema é responsivo e funciona em:
- Desktop (melhor experiência)
- Tablets
- Smartphones

## 🎯 Recursos

### Implementados
- ✅ Autenticação (login/registro)
- ✅ Criar provas (professor)
- ✅ Listar provas
- ✅ Responder provas (aluno)
- ✅ Ver histórico de respostas
- ✅ Múltiplas perguntas por prova
- ✅ 4 alternativas por pergunta
- ✅ Imagens nas perguntas (opcional)
- ✅ Interface responsiva

### Melhorias Futuras
- Ver resultado da prova (acertos/erros)
- Editar prova existente
- Deletar prova
- Tempo limite para resposta
- Ranking de alunos
- Filtros e busca de provas
- Dashboard do professor
- Exportar resultados

## 📞 Suporte

Para problemas ou dúvidas, verifique:
1. Console do navegador (F12)
2. Terminal do backend
3. Terminal do frontend
4. Logs do MySQL
