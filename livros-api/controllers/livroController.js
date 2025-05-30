const Livro = require('../models/Livro');

exports.getLivros = async (req, res) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'i'); // 'i' = case insensitive
  const livros = await Livro.find({ title: regex }).sort({ createdAt: -1 });
  res.json(livros);
};

exports.criarLivro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    const novoLivro = await livro.save();
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao salvar livro.' });
  }
};

exports.favoritarLivro = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

    livro.favorite = !livro.favorite;
    await livro.save();
    res.json(livro);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao favoritar livro.' });
  }
};

exports.getLivrosFavoritos = async (req, res) => {
  try {
    const favoritos = await Livro.find({ favorite: true }).sort({ createdAt: -1 });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros favoritos.' });
  }
};
