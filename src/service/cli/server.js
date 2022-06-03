'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const postsRoutes = require(`./routes/posts-routes`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;


const app = express();
app.use(express.json());

app.use(`/posts`, postsRoutes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    console.log(__dirname);

    app.listen(port, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
