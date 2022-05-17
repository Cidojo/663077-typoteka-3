'use strict';

const fs = require(`fs`).promises;
const {shuffle, getRandomInt, getRandomFormattedPastDate} = require(`../../utils/utils`);
const chalk = require(`chalk`);
const {ExitCode, MONTH_MS} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MONTH_PAST_DATE_RESTRICT = 3;
const MAX_ARTICLES_RESTRICT = 1000;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array.from({length: count}, () => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, 5).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    createdDate: getRandomFormattedPastDate(MONTH_PAST_DATE_RESTRICT * MONTH_MS),
    category: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_ARTICLES_RESTRICT) {
      console.info(chalk.red(`Не больше ${MAX_ARTICLES_RESTRICT} публикаций.`));
      process.exit(ExitCode.error);
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Успешно. Файл создан.`));
    } catch (err) {
      console.error(chalk.red(`Не получилось создать файл...`));
    }
  }
};
