const db = require("../config/db");
const User = {
 create: (name, email, password, role, callback) => {
 const sql = `
 INSERT INTO users (name, email, password, role)
 VALUES (?, ?, ?, ?)
 `;
 db.query(sql, [name, email, password, role], callback);
 },
 findByEmail: (email, callback) => {
 const sql = `SELECT * FROM users WHERE email = ?`;
 db.query(sql, [email], callback);
 },
 findAll: (callback) => {
 const sql = `
 SELECT id, name, email, role, created_at, updated_at
 FROM users ORDER BY id DESC
 `;
 db.query(sql, callback);
 },
 findById: (id, callback) => {
 const sql = `
 SELECT id, name, email, role, created_at, updated_at
 FROM users WHERE id = ?
 `;
 db.query(sql, [id], callback);
 },
 update: (id, name, email, role, callback) => {
 const sql = `
 UPDATE users
 SET name = ?, email = ?, role = ?
 WHERE id = ?
 `;
 db.query(sql, [name, email, role, id], callback);
 },
 delete: (id, callback) => {
 const sql = `DELETE FROM users WHERE id = ?`;
 db.query(sql, [id], callback);
 }
};
module.exports = User;