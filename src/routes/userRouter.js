const express = require("express");
const router = express.Router(); // express contients deja les router
const {registerUser, loginUser } = require ("../controllers/userController");

router.post("/register", registerUser);
router.post ("/login", loginUser);

module.exports = router;