const Livro = require('../models/Livro');

exports.getLivros = async (req, res) => {
  const livros = await Livro.find().sort({ createdAt: -1 });
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
