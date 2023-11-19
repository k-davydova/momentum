import { greetingTranslation } from "./translation.js"

const body = document.querySelector('body');
const time = document.querySelector('.time');
const domDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const name = document.querySelector('.name');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const language = document.querySelector('.language');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const audio = document.querySelector('audio');
const playListWrapper = document.querySelector('.play-list');
const liList = document.querySelectorAll('.play-item');
const settingsBtn = document.querySelector('.settings-icon');
const settingsBox = document.querySelector('.settings');
const bgOptions = document.getElementById('bg-select');
const bgInput = document.getElementById('bg-input');
const bgLabel = document.querySelector('.bg-label');
const themeLabel = document.querySelector('.theme-label');
const hiddenText = document.querySelector('.hidden-text');
const playerLabel = document.querySelector('.player-label');
const weatherLabel = document.querySelector('.weather-label');
const watchLabel = document.querySelector('.watch-label');
const dataLabel = document.querySelector('.data-label');
const greetingLabel = document.querySelector('.greeting-label');
const quoteLabel = document.querySelector('.quote-label');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const inputs = document.getElementsByName('hidden');

const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];

let languageValue = (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en';

/* UTILS */

let randomNum = getRandomNumber(20, 1);

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* CLOCK AND CALENDAR */

const showDate = () => {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString(`${languageValue}`, options);
  domDate.textContent = currentDate;
};

const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  const num = (hours >= 6) ? Math.floor(hours / 6) : 0;
  return num;
};

const showGreeting = () => {
  const num = getTimeOfDay();
  greeting.textContent = `${greetingTranslation[languageValue][num]}`;
  name.placeholder = `${greetingTranslation[languageValue].placeholder}`;
};

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString('ru-RU');

  time.textContent = currentTime;

  showGreeting();
  showDate();
  setTimeout(showTime, 1000);
};
showTime();

/* BACKGROUND */

const setBg = () => {
  const num = getTimeOfDay();
  const random = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/k-davydova/stage1-tasks/assets/images/${timeOfDay[num]}/${random}.jpg`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url("https://raw.githubusercontent.com/k-davydova/stage1-tasks/assets/images/${timeOfDay[num]}/${random}.jpg")`;
  });
};
