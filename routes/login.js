const express = require('express');
const { registerView, loginView, registerUser, loginUser } = require('../controllers/loginControllers');
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/register', registerView);
router.get('/login', loginView);


module.exports = router;