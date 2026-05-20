const express = require('express')
const router =  express.Router();
const { signup , login } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');


router.post('/signup',signup);

router.post('/login',login)

router.get('/profile', protect, (req, res) => {
    res.json({ message: "You have access to this protected data!", user: req.user });
});

module.exports = router