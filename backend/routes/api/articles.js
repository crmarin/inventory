import express from 'express';
const router = express.Router();
import articleController from '../../controllers/articleController.js';

/**
 * @route	GET api/articles/:id
 * @desc	Get all articles by company
 * @access	Public
 */
router.get('/:id', articleController.getAllArticlesByCompany);

/**
 * @route	POST api/articles/new_article
 * @desc	Create a new article
 * @access	Private
 */
router.post('/new_article', articleController.newArticle);

/**
 * @route	POST api/articles/update_article
 * @desc	Update a article selected
 * @access	Private
 */
router.post('/update_article', articleController.updateArticle);

/**
 * @route	DELETE api/articles/delete_article
 * @desc	Delete a article selected
 * @access	Private
 */
router.delete('/delete_article/:id', articleController.deleteArticle);

export default router;
