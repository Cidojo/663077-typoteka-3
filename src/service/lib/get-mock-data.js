'use strict';

const fs = require(`fs`).promises;
const MOCK_FILENAME = `mocks.json`;

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const content = await fs.readFile(MOCK_FILENAME, `utf8`);
    data = content.trim().split(`\n`);
  } catch (err) {
    console.error(err);
    return (err);
  }

  return data;
};

module.exports = getMockData;
