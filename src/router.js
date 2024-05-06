const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

router.get('/users', userController.getAll);
router.post('/users', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userController.createUser
);

module.exports = router;