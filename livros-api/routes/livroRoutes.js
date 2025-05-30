const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.getLivros);
router.post('/', livroController.criarLivro);
router.patch('/:id/favorite', livroController.favoritarLivro);

module.exports = router;
