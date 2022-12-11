const express = require('express');
const { registerView, loginView, registerUser, loginUser, logoutUser } = require('../controllers/loginControllers');
const {BooksView, BooksRequest} = require('../controllers/bookControllers')
const { dashboardView } = require('../controllers/dashboardControllers');
const { protectRoute } = require("../auth/protect");
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard',protectRoute ,dashboardView);
router.get('/books', protectRoute,BooksView);
router.get('/books/:id',protectRoute, BooksRequest);
module.exports = router;