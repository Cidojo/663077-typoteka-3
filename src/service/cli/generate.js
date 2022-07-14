'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {shuffle, getRandomInt, getRandomFormattedPastDate} = require(`../../utils/utils`);
const {ExitCode, MONTH_MS, MAX_ID_LENGTH} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MONTH_PAST_DATE_RESTRICT = 3;
const MAX_ARTICLES_RESTRICT = 1000;
const MAX_COMMENTS = 4;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => {
  return Array.from({length: count}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
  }));
};

const generateArticles = (count, titles, categories, sentences, comments) => (
  Array.from({length: count}, () => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, 5).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    createdDate: getRandomFormattedPastDate(MONTH_PAST_DATE_RESTRICT * MONTH_MS),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticle > MAX_ARTICLES_RESTRICT) {
      console.info(chalk.red(`Не больше ${MAX_ARTICLES_RESTRICT} публикаций.`));
      process.exit(ExitCode.error);
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const content = JSON.stringify(generateArticles(countArticle, titles, categories, sentences, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Успешно. Файл создан.`));
    } catch (err) {
      console.error(chalk.red(`Не получилось создать файл...`));
    }
  }
};
