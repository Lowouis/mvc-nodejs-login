const express = require('express');
const { registerView, loginView, registerUser, loginUser, logoutUser } = require('../controllers/loginControllers');
const { dashboardView } = require('../controllers/dashboardControllers');
const { protectRoute } = require("../auth/protect");
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard',protectRoute ,dashboardView);


module.exports = router;