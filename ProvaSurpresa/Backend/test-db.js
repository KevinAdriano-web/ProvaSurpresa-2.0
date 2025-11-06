import mysql from 'mysql2/promise'
import 'dotenv/config'

console.log('=== Teste de Conexão MySQL ===\n')
console.log('Configurações do .env:')
console.log('- Host:', process.env.MYSQL_HOST)
console.log('- User:', process.env.MYSQL_USER)
console.log('- Password:', process.env.MYSQL_PASSWORD ? '***' + process.env.MYSQL_PASSWORD.slice(-3) : '(vazia)')
console.log('- Database:', process.env.MYSQL_DATABASE)
console.log('\nTentando conectar...\n')

async function testarConexao() {
  try {
    // Remover aspas da senha se houver
    let senha = process.env.MYSQL_PASSWORD || ''
    if (senha.startsWith("'") && senha.endsWith("'")) {
      senha = senha.slice(1, -1)
      console.log('⚠️  Removendo aspas da senha...')
    }

    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: senha,
      database: process.env.MYSQL_DATABASE || 'provaweb2'
    })
    
    console.log('✓ CONEXÃO BEM-SUCEDIDA!')
    console.log('\nTestando query...')
    
    const [rows] = await connection.execute('SELECT 1 as test')
    console.log('✓ Query executada com sucesso:', rows)
    
    await connection.end()
    console.log('\n✓ Conexão fechada normalmente')
    console.log('\n🎉 Tudo OK! O problema pode estar nas aspas da senha no .env')
    
  } catch (err) {
    console.error('✗ ERRO NA CONEXÃO!\n')
    console.error('Código:', err.code)
    console.error('Mensagem:', err.message)
    console.error('\n📋 Possíveis causas:')
    
    if (err.code === 'ECONNREFUSED') {
      console.error('1. MySQL não está rodando')
      console.error('   → Inicie o MySQL Server/XAMPP/WAMP')
      console.error('2. Porta incorreta (padrão: 3306)')
      console.error('   → Verifique a porta no .env')
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('1. Usuário ou senha incorretos')
      console.error('   → Verifique as credenciais no .env')
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('1. Banco de dados não existe')
      console.error('   → Execute: CREATE DATABASE provaweb2;')
    }
    
    console.error('\n💡 Dica: Tente conectar pelo MySQL Workbench primeiro')
  }
}

testarConexao()
