const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.getLivros);
router.get('/favorites', livroController.getLivrosFavoritos);
router.get('/:id', livroController.getLivroPorId);
router.post('/', livroController.criarLivro);
router.put('/:id', livroController.updateLivro);
router.delete('/:id', livroController.deleteLivro); 
router.patch('/:id/favorite', livroController.favoritarLivro);

module.exports = router;
