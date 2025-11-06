import mysql from 'mysql2/promise'


let conection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adriano',
  database: 'freiDB'
})


export { conection }

