'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [
  `id`,
  `title`,
  `announce`,
  `fullText`,
  `createdDate`,
  `category`,
  `comments`
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(articleKeys);
  const keysExists = newArticle.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
