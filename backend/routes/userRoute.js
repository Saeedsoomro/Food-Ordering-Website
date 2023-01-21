const express = require("express");
const { registerUser, loginUser, getUser, logout, getUserDetails, getAllUser, updateUserRole, deleteUser, createReview, getReview } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(getUser);
router.route("/logout").get(logout);
router.route("/user/:id").get(getUserDetails);
router.route("/admin/users").get(getAllUser);
router.route("/admin/user/:id").put(updateUserRole);
router.route("/admin/user/:id").delete(deleteUser);
router.route("/review").post(createReview);
router.route("/review/:product_id").get(getReview);

module.exports = router