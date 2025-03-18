const express = require('express');
const { registerUser, verifyEmail, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/customer-register', registerUser);
router.post('/admin-register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/customer-login', loginUser);
router.post('/admin-login', loginUser);

module.exports = router;