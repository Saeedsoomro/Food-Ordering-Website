const express = require("express");
const { getAllProduct, createProduct, getProductDetails, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router =  express.Router();

router.route("/products").get(getAllProduct)
router.route("/product/new").post(createProduct)
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct)
router.route("/product/:id").get(getProductDetails);

module.exports = router