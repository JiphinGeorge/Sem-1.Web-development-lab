// dbConnection.js
const mysql = require("mysql2");

// Create a connection without specifying the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", // 🔒 replace with your MySQL password
});

// Step 1: Create the database if it doesn’t exist
connection.query("CREATE DATABASE IF NOT EXISTS CollegeDB", (err) => {
  if (err) throw err;
  console.log('✅ Database "CollegeDB" created or already exists.');
});

// Step 2: Connect directly to CollegeDB for use in other files
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "CollegeDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to CollegeDB successfully.");
});

// Export this connection
module.exports = db;
