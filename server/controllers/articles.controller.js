/** @format */

const Article = require('../models/articles.model');
const cloudinary = require('cloudinary');

module.exports = {
  addArticle: (req, res, next) => {
    const { text, title, claps, description } = req.body;
    //let obj = { text, title, claps, description, feature_img: _feature_img != null ? `/uploads/${_filename}` : '' }
    if (req.files.image) {
      cloudinary.uploader.upload(
        req.files.image.path,
        (result) => {
          const obj = {
            text,
            title,
            claps,
            description,
            feature_img: result.url != null ? result.url : '',
          };
          saveArticle(obj);
        },
        {
          resource_type: 'image',
          eager: [{ effect: 'sepia' }],
        }
      );
    } else {
      // eslint-disable-next-line no-use-before-define
      saveArticle({ text, title, claps, description, feature_img: '' });
    }
    const saveArticle = (obj) => {
      new Article(obj).save((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(400);
        else {
          return article.addAuthor(req.body.author_id).then((_article) => {
            return res.send(_article);
          });
        }
        next();
      });
    };
  },
  getAll: (req, res, next) => {
    Article.find(req.params.id)
      .populate('author')
      .populate('comments.author')
      .exec((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(404);
        else {
          res.send(article);
          next();
        }
      });
  },
  clapArticle: (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
      return article
        .comment({
          author: req.body.author_id,
          text: req.body.comment,
        })
        .then(() => {
          return res.json({ msg: 'Done' });
        })
        .catch(next);
    });
  },
  /**
   * comment, author_id, article_id
   */
  commentArticle: (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
      return article
        .comment({
          author: req.body.author_id,
          text: req.body.comment,
        })
        .then(() => {
          return res.json({ msg: 'Done' });
        });
    });
  },

  getArticle: (req, res, next) => {
    Article.findById(req.params.id)
      .populate('author')
      .populate('comments.author')
      .exec((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(404);
        else res.send(article);
        next();
      });
  },
};
