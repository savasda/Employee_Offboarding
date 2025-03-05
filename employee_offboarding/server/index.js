const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
let db;
async function initDb() {
  db = await open({
    filename: "server/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT,
      department TEXT,
      status TEXT,
      email TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS equipments (
      id TEXT PRIMARY KEY,
      name TEXT,
      employee_id TEXT,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );
  `);

  const departments = ["Engineering", "Marketing", "Sales", "HR", "IT", "Finance", "Customer Support"];
  const equipmentList = ["Laptop", "Monitor", "Keyboard", "Mouse", "Phone", "Tablet"];

  const employeeData = [];
  
  // Generate 50 unique users
  for (let i = 1; i <= 50; i++) {
    const empId = `EMP${String(i).padStart(4, "0")}`; // Unique ID: EMP0001, EMP0002, ...
    const name = `User${i}`;
    const email = `user${i}@example.com`;
    const department = departments[i % departments.length];

    employeeData.push({ empId, name, email, department });
  }

  for (const emp of employeeData) {
    // Insert employee
    await db.run(
      `INSERT OR IGNORE INTO employees (id, name, department, status, email) VALUES (?, ?, ?, ?, ?)`,
      [emp.empId, emp.name, emp.department, "ACTIVE", emp.email]
    );

    // Assign 2 random pieces of equipment
    for (let j = 1; j <= 2; j++) {
      const equipId = `EQ${emp.empId.slice(3)}${j}`; // Unique equipment ID: EQ00011, EQ00012, ...
      const equipName = equipmentList[(j + parseInt(emp.empId.slice(3))) % equipmentList.length];

      await db.run(
        `INSERT OR IGNORE INTO equipments (id, name, employee_id) VALUES (?, ?, ?)`,
        [equipId, equipName, emp.empId]
      );
    }
  }
}


app.get("/employees", async (req, res) => {
  const employees = await db.all("SELECT * FROM employees");
  for (const employee of employees) {
    employee.equipments = await db.all("SELECT * FROM equipments WHERE employee_id = ?", [employee.id]);
  }
  res.json(employees);
});

app.get("/employees/:id", async (req, res) => {
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [req.params.id]);
  if (employee) {
    employee.equipments = await db.all("SELECT * FROM equipments WHERE employee_id = ?", [employee.id]);
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.post("/users/:id/offboard", async (req, res) => {
  const { id } = req.params;
  const offboardData = req.body;
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [id]);
  if (employee) {
    await db.run("UPDATE employees SET status = ? WHERE id = ?", ["OFFBOARDED", id]);
    res.json({ message: "Employee offboarded", data: offboardData });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

const PORT = 5001;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});