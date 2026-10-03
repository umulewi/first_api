const User = require("../models/userModel");
// CREATE
const createUser = (req, res) => {
 const { name, email, password, role } = req.body;
 if (!name || !email || !password) {
 return res.status(400).json({
 success: false,
 message: "Name, email and password are required"
 });
 }
 User.findByEmail(email, (err, results) => {
 if (err) {
 return res.status(500).json({
 success: false, message: "Database error"
 });
 }
 if (results.length > 0) {
 return res.status(409).json({
 success: false, message: "Email already exists"
 });
 }
 bcrypt.hash(password, 10, (err, hashedPassword) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Password hashing failed"
 });
 }
 const userRole = role === "admin" ? "admin" : "user";
 User.create(name, email, hashedPassword, userRole,
 (err, result) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to create user"
 });
 }
 res.status(201).json({
 success: true,
 message: "User created successfully",
 user: {
 id: result.insertId,
 name,
 email,
 role: userRole
 }
 });
 }
 );
 });
 });
};
// READ ALL
const getUsers = (req, res) => {
 User.findAll((err, results) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to fetch users"
 });
 }
 res.json({
 success: true,
 count: results.length,
 users: results
 });
 });
};
// READ ONE
const getUserById = (req, res) => {
 const { id } = req.params;
 User.findById(id, (err, results) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to fetch user"
 });
 }
 if (results.length === 0) {
 return res.status(404).json({
 success: false,
 message: "User not found"
 });
 }
 res.json({
 success: true,
 user: results[0]
 });
 });
};
// UPDATE
const updateUser = (req, res) => {
 const { id } = req.params;
 const { name, email, role } = req.body;
 if (!name || !email) {
 return res.status(400).json({
 success: false,
 message: "Name and email are required"
 });
 }
 User.findById(id, (err, results) => {
 if (err) {
 return res.status(500).json({
 success: false, message: "Database error"
 });
 }
 if (results.length === 0) {
 return res.status(404).json({
 success: false, message: "User not found"
 });
 }
 const userRole = role === "admin" ? "admin" : "user";
 User.update(id, name, email, userRole, (err) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to update user"
 });
 }
 res.json({
 success: true,
 message: "User updated successfully"
 });
 });
 });
};
// DELETE
const deleteUser = (req, res) => {
 const { id } = req.params;
 User.findById(id, (err, results) => {
 if (err) {
 return res.status(500).json({
 success: false, message: "Database error"
 });
 }
 if (results.length === 0) {
 return res.status(404).json({
 success: false, message: "User not found"
 });
 }
 User.delete(id, (err) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to delete user"
 });
 }
 res.json({
 success: true,
 message: "User deleted successfully"
 });
 });
 });
};
module.exports = {
 createUser,
 getUsers,
 getUserById,
 updateUser,
 deleteUser
};