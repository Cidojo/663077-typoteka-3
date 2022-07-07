'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `72Xcx3`,
    "title": `Что такое золотое сечение`,
    "announce": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Не беречь поросли, не видать и дерева. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Без труда не выловишь и рыбку из пруда.`,
    "fullText": `Как начать действовать? Для начала просто соберитесь. Не плюй в колодец, пригодится воды напиться. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "createdDate": `2022-06-09 13:58:26`,
    "category": [
      `Кино`
    ],
    "comments": [
      {
        "id": `Z4PjSG`,
        "text": `Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `21bT68`,
        "text": `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `0icNaF`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `bejSHm`,
    "title": `Рок — это протест`,
    "announce": `Из под его пера вышло 8 платиновых альбомов. Не беречь поросли, не видать и дерева. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Не плюй в колодец, пригодится воды напиться. Простые ежедневные упражнения помогут достичь успеха.`,
    "createdDate": `2022-04-20 10:53:37`,
    "category": [
      `Программирование`
    ],
    "comments": [
      {
        "id": `CeKwxa`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
      },
      {
        "id": `VXb_9m`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `W2mdtp`,
        "text": `Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `uQwOgC`,
    "title": `Обзор новейшего смартфона`,
    "announce": `Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Без труда не выловишь и рыбку из пруда.`,
    "createdDate": `2022-06-21 13:31:01`,
    "category": [
      `Разное`
    ],
    "comments": [
      {
        "id": `4BwWCs`,
        "text": `Это где ж такие красоты? Плюсую, но слишком много буквы!`
      },
      {
        "id": `yNq6MV`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `knpA33`,
        "text": `Это где ж такие красоты? Планируете записать видосик на эту тему?`
      },
      {
        "id": `gyskF4`,
        "text": `Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "id": `JulON8`,
    "title": `Рок — это протест`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. Программировать не настолько сложно, как об этом говорят. Не плюй в колодец, пригодится воды напиться. Без труда не выловишь и рыбку из пруда.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Не плюй в колодец, пригодится воды напиться. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Без труда не выловишь и рыбку из пруда. Из под его пера вышло 8 платиновых альбомов.`,
    "createdDate": `2022-05-15 16:52:14`,
    "category": [
      `Разное`
    ],
    "comments": [
      {
        "id": `IZIFg5`,
        "text": `Совсем немного... Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
      },
      {
        "id": `27Pg02`,
        "text": `Согласен с автором! Мне кажется или я уже читал это где-то? Совсем немного...`
      }
    ]
  },
  {
    "id": `nBj_Qv`,
    "title": `Борьба с прокрастинацией`,
    "announce": `Без труда не выловишь и рыбку из пруда. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать? Для начала просто соберитесь. Без труда не выловишь и рыбку из пруда. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов. Не плюй в колодец, пригодится воды напиться. Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов.`,
    "createdDate": `2022-05-31 05:08:29`,
    "category": [
      `Железо`
    ],
    "comments": [
      {
        "id": `Z_N5rw`,
        "text": `Совсем немного...`
      },
      {
        "id": `lIjl9l`,
        "text": `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
      },
      {
        "id": `FKuMfu`,
        "text": `Согласен с автором! Совсем немного... Планируете записать видосик на эту тему?`
      },
      {
        "id": `hU6MOB`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Совсем немного...`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "72Xcx3"`, () => expect(response.body[0].id).toBe(`72Xcx3`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/72Xcx3`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Что такое золотое сечение"`, () => expect(response.body.title).toBe(`Что такое золотое сечение`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    "title": `Кто виноват?`,
    "announce": `Вечный вопрос`,
    "fullText": `Что делать?`,
    "createdDate": `2022-07-07 23:00:00`,
    "category": [
      `Вечное`
    ],
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    "title": `Кто виноват?`,
    "announce": `Вечный вопрос`,
    "fullText": `Что делать?`,
    "createdDate": `2022-07-07 23:00:00`,
    "category": [
      `Вечное`
    ],
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app)
        .post(`/articles`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const updatedArticle = {
    "title": `Кто виноват?`,
    "announce": `Вечный вопрос`,
    "fullText": `Что делать?`,
    "createdDate": `2022-07-07 23:00:00`,
    "category": [
      `Вечное`
    ],
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/72Xcx3`)
      .send(updatedArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(updatedArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/72Xcx3`)
    .expect((res) => expect(res.body.title).toBe(`Кто виноват?`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    "title": `Это`,
    "announce": `Валидный`,
    "fullText": `Объект статьи`,
    "createdDate": `2022-07-07 23:00:00`,
    "category": [
      `однако 404`
    ],
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    "title": `Это`,
    "announce": `Невалидный`,
    "fullText": `Объект статьи`,
    "category": [
      `Нет поля creationDate`
    ],
  };

  return request(app)
    .put(`/articles/72Xcx3`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/72Xcx3`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`72Xcx3`));

  test(`Article count is 4 now`, () => {
    return request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(4));
  });
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/72Xcx3/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "Z4PjSG"`, () => expect(response.body[0].id).toBe(`Z4PjSG`));
});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/72Xcx3/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/72Xcx3/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/72Xcx3/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/72Xcx3/comments/Z4PjSG`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`Z4PjSG`));

  test(`Comments count is 2 now`, () => request(app)
    .get(`/articles/72Xcx3/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/72Xcx3/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/article/NOEXST/comments/Z4PjSG`)
    .expect(HttpCode.NOT_FOUND);

});
