const express = require('express');
const router = express.Router();

const routerAvaliacao = require('./routerAvaliacao');
const routerComentario = require('./routerComentario');
const routerFavorito = require('./routerFavorito');
const routerHorario = require('./routerHorario');
const routerLocalizacao = require('./routerLocalizacao');
const routerPreco = require('./routerPreco');
const routerTags = require('./routerTags');
const routerTagsProf = require('./routerTagsProf');
const routerUser = require('./routerUser');


router.use(routerAvaliacao);
router.use(routerComentario);
router.use(routerFavorito);
router.use(routerHorario);
router.use(routerLocalizacao);
router.use(routerPreco);
router.use(routerTags);
router.use(routerTagsProf);
router.use(routerUser);


module.exports = router;