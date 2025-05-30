const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.getLivros);
router.get('/favorites', livroController.getLivrosFavoritos);
router.post('/', livroController.criarLivro);
router.patch('/:id/favorite', livroController.favoritarLivro);

module.exports = router;
