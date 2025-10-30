// main.js
const db = require("./conn");

// Create the Students table
db.query(
  `
  CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    course VARCHAR(30)
  )
`,
  (err) => {
    if (err) throw err;
    console.log('✅ Table "Students" created or already exists.');
  }
);

// Insert some values
const students = [
  ["John", 20, "BCA"],
  ["Alice", 21, "MCA"],
  ["Bob", 19, "BBA"],
];

db.query(
  "INSERT INTO Students (name, age, course) VALUES ?",
  [students],
  (err) => {
    if (err) throw err;
    console.log("✅ Sample values inserted.");
  }
);

// Display all records
db.query("SELECT * FROM Students", (err, results) => {
  if (err) throw err;
  console.table(results);
  db.end();
});
