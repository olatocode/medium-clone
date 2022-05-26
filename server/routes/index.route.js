/** @format */

const user = require('./user.route');
const article = require('./articles.route');

module.exports = (router) => {
  user(router);
  article(router);
};
