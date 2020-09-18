const express = require("express");
const {register, login, loggedInUser} = require("../controllers/authentication");
const {auth} = require("../middleware/auth");
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth,  loggedInUser);

module.exports = router;