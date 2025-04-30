const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Protected route example - only for authenticated users
router.get('/profile', auth, (req, res) => {
    res.json({ message: 'Profile accessed successfully', userId: req.user.userId });
});

// Protected route example - only for admin users
router.get('/admin', auth, checkRole(['admin']), (req, res) => {
    res.json({ message: 'Admin panel accessed successfully' });
});

module.exports = router;