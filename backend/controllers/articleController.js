import ArticleModel from '../models/articleModel.js';
const ArticleController = {};

ArticleController.getAllArticlesByCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const articles = await ArticleModel.find({ clientId: id });
    if (articles) {
      res.status(200).json({ articles });
    } else {
      res.status(404).json('Articles not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

ArticleController.newArticle = async (req, res) => {
  const { name, description, price, countInStock, clientId } = req.body;

  try {
    const article = new ArticleModel({
      name,
      description,
      price: Number(price),
      countInStock: Number(countInStock),
      clientId,
    });

    await article.save();

    res.status(200).send({ msg: 'Article created successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

ArticleController.updateArticle = async (req, res) => {
  const { _id, name, description, price, countInStock, clientId } = req.body;

  try {
    const article = await ArticleModel.findById(_id);

    if (article) {
      article.name = name;
      article.description = description;
      article.price = Number(price);
      article.countInStock = Number(countInStock);
      article.clientId = clientId;

      await article.save();
      res.status(200).send({ msg: 'Article updated successfully!' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

ArticleController.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id);

    if (article) {
      await article.remove();
      res.status(200).send({ msg: 'Article deleted!' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

export default ArticleController;
