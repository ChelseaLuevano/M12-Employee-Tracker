// Import and require express
const express = require('express');

// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Function for app port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

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
