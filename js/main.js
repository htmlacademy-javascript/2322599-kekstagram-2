const MIN_VALUE = 1;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MAX_AVATAR = 6;
const MAX_PHOTO = 25;

const NAMES = [
  'София',
  'Федор',
  'Лев',
  'Алиса',
  'Милана',
  'Илья',
  'Мария',
  'Анастасия',
  'Елизавета',
  'Владимир'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => {
  const commentCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  Array.from({length: commentCount}, (_, i) => ({
    id : i + 1,
    avatar: `img/avatar-${getRandomInteger(MIN_VALUE, MAX_AVATAR)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  }));
};

const generatePhotos = () => {
  Array.from({length: MAX_PHOTO}, (_, i) => ({
    id : i + 1,
    url: `photos/${i + 1}.jpg`,
    description: `Фотография номер ${i + 1}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: generateComments()
  }));
};

generatePhotos();
