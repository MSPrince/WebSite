const express = require("express");
const adminController = require("../controller/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Route to get all users - protected by auth and admin middleware
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);

// edit user
router.get(
  "/users/:id",
  authMiddleware,
  // adminMiddleware,
  adminController.getUserById
);

// update user
router.patch(
  "/users/update/:id", authMiddleware,adminMiddleware, adminController.updateUserById
);





// delete user
router.delete(
  "/users/delete/:id",authMiddleware,adminMiddleware,adminController.deleteUserById
);

// Route to get all contacts - protected by auth and admin middleware
router.get(
  "/contacts",
  authMiddleware,
  adminMiddleware,
  adminController.getAllContacts
)
router.delete(
  "/contacts/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteContactById
);

module.exports = router;
