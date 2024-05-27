const express = require('express');
const router = express.Router();

const tagsProfController = require('../controllers/tagsProfController');
const tagsProfMiddleware = require('../middlewares/tagsProfMiddleware');

//Tags Professor
router.get('/tagsprof', tagsProfController.getAll);
router.post('/tagsprof', tagsProfMiddleware.tagProfEmUso, tagsProfController.createTagProf);
router.delete('/tagsprof/:id_usuario/:id_tag', tagsProfController.deleteTagProf);

module.exports = router;