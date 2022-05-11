'use strict'

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

const getRandomPastDate = (min) => {
  const minLimit = parseInt(min, 10) || 0;
  const nowMs = new Date();

  return new Date(getRandomInt(minLimit, nowMs));
};

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

new Date().

module.exports = {
  getRandomInt,
  shuffle,
  getRandomPastDate,
  formatDate,
}
