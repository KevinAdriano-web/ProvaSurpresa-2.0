# ⚠️ Solução de Problemas Comuns

## Problema: Backend não inicia (ECONNREFUSED)

### Sintoma
```
Error: ECONNREFUSED
code: 'ECONNREFUSED'
```

### Causas Possíveis
1. **MySQL não está rodando**
2. **Credenciais do banco incorretas**
3. **Banco de dados não existe**
4. **Porta do MySQL incorreta**

### Soluções

#### 1. Verificar se o MySQL está rodando

**Windows:**
```powershell
# Verificar serviço
Get-Service -Name MySQL*

# Iniciar serviço
Start-Service -Name MySQL80  # ou MySQL57, MySQL, etc
```

**Ou pelo MySQL Workbench:**
- Abra o MySQL Workbench
- Tente conectar ao servidor local
- Se não conectar, inicie o serviço MySQL

#### 2. Verificar/Corrigir arquivo .env

Edite o arquivo `Backend\.env`:
```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD='SuaSenha'  # Use sua senha real
MYSQL_DATABASE=provaweb2   # Nome do seu banco
```

#### 3. Criar o Banco de Dados

Execute no MySQL Workbench ou terminal:
```sql
CREATE DATABASE IF NOT EXISTS provaweb2;
USE provaweb2;

-- Execute o script DDL
SOURCE C:/Users/Rita/ProvaSurpresa-2.0/ProvaSurpresa/Backend/sql/ddl.sql;
```

Ou pelo MySQL Workbench:
1. Conecte ao servidor
2. File → Open SQL Script
3. Selecione `Backend/sql/ddl.sql`
4. Execute o script (⚡ ícone)

#### 4. Testar Conexão Manualmente

Crie um arquivo `test-db.js` no Backend:
```javascript
import mysql from 'mysql2/promise'
import 'dotenv/config'

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    })
    console.log('✓ Conexão bem-sucedida!')
    console.log('Host:', process.env.MYSQL_HOST)
    console.log('User:', process.env.MYSQL_USER)
    console.log('Database:', process.env.MYSQL_DATABASE)
    await connection.end()
  } catch (err) {
    console.error('✗ Erro na conexão:', err.message)
    console.log('\nVerifique:')
    console.log('- MySQL está rodando?')
    console.log('- Credenciais estão corretas?')
    console.log('- Banco de dados existe?')
  }
}

test()
```

Execute:
```powershell
node test-db.js
```

---

## Problema: Frontend não encontra o Backend

### Sintoma
```
Network Error
ERR_CONNECTION_REFUSED
```

### Soluções

1. **Verifique se o Backend está rodando na porta 5010**
```powershell
# Backend deve mostrar:
..: API subiu com sucesso
✓ Conectado ao banco de dados: provaweb2
```

2. **Verifique o proxy no vite.config.js**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5010',  // Porta do backend
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

3. **Limpe o cache do navegador**
- Ctrl + F5 (hard refresh)
- Ou abra em aba anônima

---

## Problema: npm start não funciona

### Frontend
Se aparecer `Missing script: "start"`, já está corrigido no package.json.

Se ainda não funcionar:
```powershell
cd Frontend
npm install
npm run dev
```

### Backend
```powershell
cd Backend
npm install
npm install nodemon --save-dev
npm start
```

---

## Problema: Módulos não encontrados

### Sintoma
```
Cannot find module 'cors'
Cannot find module 'dotenv'
```

### Solução
```powershell
cd Backend
npm install cors dotenv nodemon --save-dev

cd ../Frontend
npm install
```

---

## Checklist de Inicialização

Antes de iniciar o projeto, verifique:

- [ ] MySQL está rodando
- [ ] Banco de dados `provaweb2` existe
- [ ] Tabelas foram criadas (rodou ddl.sql)
- [ ] Arquivo `.env` está configurado corretamente
- [ ] Dependências instaladas: `npm install` (Backend e Frontend)
- [ ] Portas 3000 e 5010 estão livres

---

## Inicialização Correta

### Passo 1: Backend
```powershell
cd Backend
npm install
npm start
```

**Deve aparecer:**
```
[nodemon] starting `node ./src/app.js`
✓ Conectado ao banco de dados: provaweb2
..: API subiu com sucesso
```

### Passo 2: Frontend (novo terminal)
```powershell
cd Frontend
npm install
npm start
```

**Deve aparecer:**
```
VITE v5.4.21  ready in 346 ms
➜  Local:   http://localhost:3000/
```

---

## Verificar se está funcionando

1. Abra http://localhost:3000
2. Você deve ver a página de Login
3. Clique em "Registre-se"
4. Crie uma conta de teste
5. Se conseguir criar e fazer login, está tudo OK! ✓

---

## Problemas Persistentes?

1. **Verifique os logs completos** nos terminais
2. **Abra o Console do navegador** (F12) para ver erros JavaScript
3. **Teste a API diretamente**:
   ```powershell
   curl http://localhost:5010/provas
   # ou
   Invoke-WebRequest http://localhost:5010/provas
   ```

4. **Reinicie tudo**:
   ```powershell
   # Pare todos os terminais (Ctrl+C)
   # Feche o VS Code
   # Reinicie o MySQL
   # Abra o VS Code novamente
   # Inicie Backend, depois Frontend
   ```
