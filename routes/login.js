const express = require('express');
const { registerView, loginView, registerUser, loginUser } = require('../controllers/loginControllers');
const { dashboardView } = require('../controllers/dashboardControllers');
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', dashboardView);


module.exports = router;