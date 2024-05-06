const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const tagsController = require('./controllers/tagsController');

const userMiddleware = require('./middlewares/userMiddleware');
const tagsMiddleware = require('./middlewares/tagsMiddleware');

//Usuarios
router.get('/users', userController.getAll);
router.post('/users', 
    userMiddleware.validateName, 
    userMiddleware.validateEmail, 
    userMiddleware.validatePassword, 
    userController.createUser
);

//Tags
router.get('/tags', tagsController.getAll);
router.post('/tags', tagsMiddleware.validateNomeTag, tagsController.createTag);
router.delete('/tags/:id_tag', tagsController.deleteTag);
router.put('/tags/:id_tag', tagsController.updateTag);



module.exports = router;