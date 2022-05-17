'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const formatDate = (date) => {
  const dateTime = new Date(date).toISOString().split(`T`);
  const dateFormatted = dateTime[0];
  const timeFormatted = dateTime[1].substr(0, 8);

  return `${dateFormatted} ${timeFormatted}`;
};

const getRandomFormattedPastDate = (min) => {
  const minLimit = parseInt(min, 10) || 0;
  const nowMs = new Date();

  const randomDate = new Date(getRandomInt(nowMs - minLimit, nowMs));

  return formatDate(randomDate);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomFormattedPastDate,
};
