const express = require('express');
const { registerView, loginView, registerUser } = require('../controllers/loginControllers');
const router = express.Router();
router.post('/register', registerUser);
router.get('/register', registerView);
router.get('/login', loginView);


module.exports = router;