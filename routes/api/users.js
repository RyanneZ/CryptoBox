const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

// POST /api/users/signup
router.post('/signup', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
router.post('/deposit', usersCtrl.deposit)
router.post('/buy', usersCtrl.buy)
router.post('/portfolio', usersCtrl.portfolio)

module.exports = router;