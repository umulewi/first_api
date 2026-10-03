const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const register = (req, res) => {
 const { name, email, password } = req.body;
 if (!name || !email || !password) {
 return res.status(400).json({
 success: false,
 message: "Name, email and password are required"
 });
 }
 User.findByEmail(email, (err, results) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Database error"
 });
 }
 if (results.length > 0) {
 return res.status(409).json({
 success: false,
 message: "Email already exists"
 });
 }
 bcrypt.hash(password, 10, (err, hashedPassword) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Password hashing failed"
 });
 }
 User.create(
 name,
 email,
 hashedPassword,
 "user",
 (err, result) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Failed to create user"
 });
 }
 res.status(201).json({
 success: true,
 message: "User registered successfully",
 user: {
 id: result.insertId,
 name,
 email,
 role: "user"
 }
 });
 }
 );
 });
 });
};
const login = (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
 return res.status(400).json({
 success: false,
 message: "Email and password are required"
 });
 }
 User.findByEmail(email, (err, results) => {
    if (err) {
 return res.status(500).json({
 success: false,
 message: "Database error"
 });
 }
 if (results.length === 0) {
 return res.status(401).json({
 success: false,
 message: "Invalid email or password"
 });
 }
 const user = results[0];
 bcrypt.compare(password, user.password, (err, isMatch) => {
 if (err) {
 return res.status(500).json({
 success: false,
 message: "Password verification failed"
 });
 }
 if (!isMatch) {
 return res.status(401).json({
 success: false,
 message: "Invalid email or password"
 });
 }
 const token = jwt.sign(
 {
 id: user.id,
 email: user.email,
 role: user.role
 },
 process.env.JWT_SECRET,
 { expiresIn: process.env.JWT_EXPIRES_IN }
 );
 res.json({
 success: true,
 message: "Login successful",
 token,
 user: {
 id: user.id,
 name: user.name,
 email: user.email,
 role: user.role
 }
 });
 });
 });
};
module.exports = { register, login };