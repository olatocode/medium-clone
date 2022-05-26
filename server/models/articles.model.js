/** @format */

const mongoose = require('mongoose');
const articlesSchema = new mongoose.Schema({
  text: String,
  title: String,
  description: String,
  feature_img: String,
  claps: Number,
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  comments: [
    {
      author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
      text: String,
    },
  ],
});

articlesSchema.methods.clap = () => {
  this.claps++;
  return this.save();
};

articlesSchema.methods.comment = (c) => {
  this.comments.push(c);
  return this.save();
};

articlesSchema.methods.getUserArticle = (author_id) => {
  this.author = author_id;
  return this.save();
};

articlesSchema.methods.getUserArticle = (_id) => {
  articlesModel.find({ author: _id }).then((article) => {
    return article;
  });
  return this.save();
};

mongoose.models = {};
const articlesModel = mongoose.model('Article', articlesSchema);
module.exports = articlesModel;
