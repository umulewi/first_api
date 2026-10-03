require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler =
 require("./middleware/errorMiddleware");
app.get("/", (req, res) => {
 res.json({
 success: true,
 message: "Node.js MySQL API is running"
 });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use((req, res) => {
 res.status(404).json({
 success: false,
 message: "Route not found"
 });
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(
 `Server running on http://localhost:${PORT}`
 );
});
