const express = require("express");
const router = express.Router();
const {
 createUser,
 getUsers,
 getUserById,
 updateUser,
 deleteUser
} = require("../controllers/userController");
const authenticateToken =
 require("../middleware/authMiddleware");
const authorizeRoles =
 require("../middleware/roleMiddleware");
// CREATE — admin only
router.post(
 "/",
 authenticateToken,
 authorizeRoles("admin"),
 createUser
);
// READ ALL — authenticated users
router.get(
 "/",
 authenticateToken,
 getUsers
);
// READ ONE — authenticated users
router.get(
 "/:id",
 authenticateToken,
 getUserById
);
// UPDATE — admin only
router.put(
 "/:id",
 authenticateToken,
 authorizeRoles("admin"),
 updateUser
);
// DELETE — admin only
router.delete(
 "/:id",
 authenticateToken,
 authorizeRoles("admin"),
 deleteUser
);
module.exports = router;