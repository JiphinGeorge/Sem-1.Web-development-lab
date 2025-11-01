const db = require('./prgm7con');
const prompt = require('prompt-sync')({ sigint: true });

// 1. Insert a new student
function insertStudent(next) {
  const id = parseInt(prompt("Enter student ID: "));
  const name = prompt("Enter student name: ");
  const course = prompt("Enter student course: ");

  const sql = "INSERT INTO students (id, name, course) VALUES (?, ?, ?)";
  db.query(sql, [id, name, course], (err) => {
    if (err) {
      console.error('❌ Error inserting student:', err.message);
    } else {
      console.log(`✅ Student ${name} inserted successfully!`);
    }
    next();
  });
}

// 2. Update student course
function updateStudentCourse(next) {
  const id = parseInt(prompt("Enter student ID to update: "));
  const newCourse = prompt("Enter new course: ");

  const sql = "UPDATE students SET course = ? WHERE id = ?";
  db.query(sql, [newCourse, id], (err) => {
    if (err) {
      console.error('❌ Error updating student:', err.message);
    } else {
      console.log(`✅ Updated course for student with ID=${id} to ${newCourse}`);
    }
    next();
  });
}

// 3. Delete student
function deleteStudent(next) {
  const id = parseInt(prompt("Enter student ID to delete: "));
  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('❌ Error deleting student:', err.message);
    } else {
      console.log(`🗑️ Student with ID=${id} deleted successfully!`);
    }
    next();
  });
}

// 4. Display Computer Science students
function displayCSStudents(next) {
  const sql = "SELECT * FROM students WHERE course = 'Computer Science'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching students:', err.message);
    } else {
      console.log("💻 Computer Science Students:");
      console.table(results);
    }
    next();
  });
}

// Menu
function menu() {
  console.log("\nSelect operation:");
  console.log("1. Insert student");
  console.log("2. Update student course");
  console.log("3. Delete student");
  console.log("4. Display Computer Science students");
  console.log("5. Exit");

  const choice = prompt("Enter your choice: ");

  switch(choice) {
    case '1':
      insertStudent(menu);
      break;
    case '2':
      updateStudentCourse(menu);
      break;
    case '3':
      deleteStudent(menu);
      break;
    case '4':
      displayCSStudents(menu);
      break;
    case '5':
      console.log("Exiting...");
      db.end();
      process.exit();
      break;
    default:
      console.log("❌ Invalid choice!");
      menu();
  }
}

// Start
menu();
