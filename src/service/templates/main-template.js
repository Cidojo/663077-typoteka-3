'use strict';

module.exports.getMainTemplate = (message) => {
  return `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`
    .trim();
};
