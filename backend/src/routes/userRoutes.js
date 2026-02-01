const express = require('express');
const router = express.Router();
const {
    registerUser,
    authUser,
    getMe,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
