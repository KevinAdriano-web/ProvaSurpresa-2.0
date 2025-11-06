import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('=== Setup do Banco de Dados ===\n')

async function setup() {
  let connection = null
  
  try {
    console.log('1️⃣  Conectando ao MySQL...')
    
    // Remover aspas da senha se houver
    let senha = process.env.MYSQL_PASSWORD || ''
    if (senha.startsWith("'") && senha.endsWith("'")) {
      senha = senha.slice(1, -1)
    }
    
    // Conectar sem especificar o banco (para poder criá-lo)
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: senha,
      multipleStatements: true
    })
    
    console.log('✓ Conectado ao MySQL\n')
    
    console.log('2️⃣  Criando banco de dados...')
    const dbName = process.env.MYSQL_DATABASE || 'provaweb2'
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
    console.log(`✓ Banco '${dbName}' criado/verificado\n`)
    
    console.log('3️⃣  Usando o banco de dados...')
    await connection.query(`USE ${dbName}`)
    console.log('✓ Banco selecionado\n')
    
    console.log('4️⃣  Criando tabelas...')
    
    // Tabela login
    await connection.query(`
      CREATE TABLE IF NOT EXISTS login (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'aluno'
      )
    `)
    console.log('✓ Tabela login')
    
    // Tabela prova
    await connection.query(`
      CREATE TABLE IF NOT EXISTS prova (
        id INT PRIMARY KEY AUTO_INCREMENT,
        login INT NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (login) REFERENCES login(id) ON DELETE CASCADE
      )
    `)
    console.log('✓ Tabela prova')
    
    // Tabela pergunta
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pergunta (
        id INT PRIMARY KEY AUTO_INCREMENT,
        prova INT NOT NULL,
        ordem INT NOT NULL,
        pergunta TEXT NOT NULL,
        imagem VARCHAR(255),
        FOREIGN KEY (prova) REFERENCES prova(id) ON DELETE CASCADE
      )
    `)
    console.log('✓ Tabela pergunta')
    
    // Tabela alternativa
    await connection.query(`
      CREATE TABLE IF NOT EXISTS alternativa (
        id INT PRIMARY KEY AUTO_INCREMENT,
        pergunta INT NOT NULL,
        descricao TEXT NOT NULL,
        correta BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON DELETE CASCADE
      )
    `)
    console.log('✓ Tabela alternativa')
    
    // Tabela prova_resposta
    await connection.query(`
      CREATE TABLE IF NOT EXISTS prova_resposta (
        id INT PRIMARY KEY AUTO_INCREMENT,
        login INT NOT NULL,
        prova INT NOT NULL,
        dt_resposta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (login) REFERENCES login(id) ON DELETE CASCADE,
        FOREIGN KEY (prova) REFERENCES prova(id) ON DELETE CASCADE
      )
    `)
    console.log('✓ Tabela prova_resposta')
    
    // Tabela prova_resposta_item
    await connection.query(`
      CREATE TABLE IF NOT EXISTS prova_resposta_item (
        id INT PRIMARY KEY AUTO_INCREMENT,
        prova_resposta INT NOT NULL,
        pergunta INT NOT NULL,
        alternativa INT NOT NULL,
        FOREIGN KEY (prova_resposta) REFERENCES prova_resposta(id) ON DELETE CASCADE,
        FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON DELETE CASCADE,
        FOREIGN KEY (alternativa) REFERENCES alternativa(id) ON DELETE CASCADE
      )
    `)
    console.log('✓ Tabela prova_resposta_item\n')
    
    console.log('5️⃣  Verificando tabelas criadas...')
    const [tables] = await connection.query('SHOW TABLES')
    console.log(`✓ Total de ${tables.length} tabelas:`)
    tables.forEach(table => {
      const tableName = Object.values(table)[0]
      console.log(`   - ${tableName}`)
    })
    
    console.log('\n🎉 Setup concluído com sucesso!')
    console.log('\n💡 Agora você pode iniciar o backend: npm start')
    
  } catch (err) {
    console.error('\n❌ Erro durante o setup:', err.message)
    console.error('\n📋 Detalhes:', err)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n✓ Conexão fechada')
    }
  }
}

setup()
