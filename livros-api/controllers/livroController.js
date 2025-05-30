const Livro = require('../models/Livro');

// Buscar todos os livros (com filtro de busca por título)
exports.getLivros = async (req, res) => {
  const search = req.query.search || '';
  const regex = new RegExp(search, 'i'); // 'i' = case insensitive
  try {
    const livros = await Livro.find({ title: regex }).sort({ createdAt: -1 });
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros.' });
  }
};

// Criar novo livro
exports.criarLivro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    const novoLivro = await livro.save();
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao salvar livro.' });
  }
};

// Favoritar ou desfavoritar livro
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

// Buscar livros favoritos
exports.getLivrosFavoritos = async (req, res) => {
  try {
    const favoritos = await Livro.find({ favorite: true }).sort({ createdAt: -1 });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livros favoritos.' });
  }
};

// Buscar livro por ID
exports.getLivroPorId = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar livro.' });
  }
};

// Atualizar livro
exports.updateLivro = async (req, res) => {
  try {
    const livroAtualizado = await Livro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!livroAtualizado) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar livro.' });
  }
};

// Excluir livro
exports.deleteLivro = async (req, res) => {
  try {
    const livroExcluido = await Livro.findByIdAndDelete(req.params.id);
    if (!livroExcluido) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json({ mensagem: 'Livro excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir livro.' });
  }
};
