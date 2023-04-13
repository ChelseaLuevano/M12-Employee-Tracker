// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'HappyDog13$',
      database: 'human_resources_db'
    },
    console.log(`Connected to the books_db database.`)
  );
  