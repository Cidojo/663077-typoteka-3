'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);

const MOCK_FILENAME = `mocks.json`;

const postsRoutes = new Router();

postsRoutes.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILENAME);
    const mocks = JSON.parse(fileContent) || [];
    res.json(mocks);
  } catch (_err) {
    console.log(_err);
    res.send([]);
  }
});

module.exports = postsRoutes;
