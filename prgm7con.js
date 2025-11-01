// connection.js
const mysql = require('mysql2');

// Connect without database first
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  password: '123',
  database: 'school',  // <- select database here
  connectTimeout: 10000
});

// Ensure database exists
db.query('CREATE DATABASE IF NOT EXISTS school', (err) => {
  if (err) {
    console.error('❌ Failed to create database:', err.message);
    process.exit(1);
  }
  console.log('✅ Database "school" is ready');

  // Switch to using the database
  db.changeUser({ database: 'school' }, (err) => {
    if (err) {
      console.error('❌ Failed to switch to database:', err.message);
      process.exit(1);
    }
    console.log('✅ Using database "school"');

    // Ensure the students table exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL
      )
    `;
    db.query(createTableQuery, (err) => {
      if (err) {
        console.error('❌ Failed to create students table:', err.message);
        process.exit(1);
      }
      console.log('✅ Students table is ready');
    });
  });
});

module.exports = db;
