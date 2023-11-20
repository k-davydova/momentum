import { greetingTranslation } from "./translation.js";
import { weatherTranslation } from "./translation.js";
import { settingsTranslation } from "./translation.js";
import { playList } from "./playList.js";

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
const audio = document.querySelector('audio');
const playButton = document.querySelector('.play');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListWrapper = document.querySelector('.play-list');
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
const hideInput = [player, weather, time, domDate, greetingContainer, quoteContainer]

let languageValue = (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en';
city.value = (localStorage.getItem('city')) ? localStorage.getItem('city') : `${weatherTranslation[languageValue].cityValue}`;
language.textContent = (localStorage.getItem('langContent')) ? (localStorage.getItem('langContent')) : 'RU';
bgOptions.value = (localStorage.getItem('bgSettings')) ? (localStorage.getItem('bgSettings')) : 'github';

/* UTILS */

let randomNum = getRandomNumber(20, 1);

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setLocalStorage = () => {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', languageValue);
  localStorage.setItem('languageContent', language.textContent);
  localStorage.setItem('bgSettings', bgOptions.value);
  localStorage.setItem('bgInput', bgInput.value);
};
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }

  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }

  if (localStorage.getItem('language')) {
    languageValue = localStorage.getItem('language');
  }

  if (localStorage.getItem('languageContent')) {
    language.textContent = localStorage.getItem('languageContent');
  }

  if (localStorage.getItem('bgSettings')) {
    bgOptions.value = localStorage.getItem('bgSettings');
  }

  if (localStorage.getItem('bgInput')) {
    bgInput.value = localStorage.getItem('bgInput');
  }
};
window.addEventListener('load', async () => {
  await getLocalStorage();

  getWeather(languageValue);
});

/* SETTINGS LANGUAGE */

const changeSettingsLanguage = (languageValue) => {
  bgLabel.textContent = `${settingsTranslation[languageValue].background}`;
  themeLabel.textContent = `${settingsTranslation[languageValue].theme}`;
  hiddenText.textContent = `${settingsTranslation[languageValue].legend}`;
  playerLabel.textContent = `${settingsTranslation[languageValue].player}`;
  weatherLabel.textContent = `${settingsTranslation[languageValue].weather}`;
  watchLabel.textContent = `${settingsTranslation[languageValue].watch}`;
  dataLabel.textContent = `${settingsTranslation[languageValue].data}`;
  greetingLabel.textContent = `${settingsTranslation[languageValue].greeting}`;
  quoteLabel.textContent = `${settingsTranslation[languageValue].quote}`;
};
changeSettingsLanguage(languageValue);

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

bgInput.value = (localStorage.getItem('bgInput')) ? (localStorage.getItem('bgInput')) : timeOfDay[getTimeOfDay()];

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

/* API BACKGROUND */

const getLinkToUnplash = async () => {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${bgInput.value}&client_id=-iYCWTv2vt0ugbCkMPuyg8ZwnpnCYgGOsTs-aNrRYo0`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();

  img.src = `${data.urls.regular}`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

const getLinkToFlickr = async () => {
  const random = getRandomNumber(20, 0);
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7a243f81fa6c109226733fd8f965279d&tags=${bgInput.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();

  img.src = `${data.photos.photo[random].url_l}`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  });
};

/* BACKGROUND */

const setBg = () => {
  const num = getTimeOfDay();
  const random = randomNum.toString().padStart(2, '0');
  const img = new Image();

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay[num]}/${random}.jpg`;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay[num]}/${random}.jpg")`;
  });
};
setBg();

const getSlideNext = () => {
  if (bgOptions.value === 'github') {
    (randomNum < 20) ? randomNum++ : randomNum = 1;
    setBg();
  }

  if (bgOptions.value === 'unplash') {
    getLinkToUnplash();
  }

  if (bgOptions.value === 'flickr') {
    getLinkToFlickr();
  }
};
slideNext.addEventListener('click', getSlideNext);

const getSlidePrev = () => {
  if (bgOptions.value === 'github') {
    (randomNum > 1) ? randomNum-- : randomNum = 20
    setBg();
  }

  if (bgOptions.value === 'unplash') {
    getLinkToUnplash()
  }

  if (bgOptions.value === 'flickr') {
    getLinkToFlickr()
  }
};
slidePrev.addEventListener('click', getSlidePrev);

/* WEATHER */

const getWeather = async (languageValue) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languageValue}&appid=4cadd631dd38c7d84ea6a65644bf4799&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  try {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = '';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = `${data.weather[0].description}`;
    wind.textContent = `${weatherTranslation[languageValue].windSpeed} ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${weatherTranslation[languageValue].humidity} ${data.main.humidity}%`;
  } catch (error) {
    weatherError.textContent = `Sorry, I can't find this city`;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
};
getWeather(languageValue);

city.addEventListener('change', () => {
  getWeather(languageValue);
});

/* QUOTES */

const getQuote = async () => {
  const random = getRandomNumber(9, 0);
  const quotes = 'assets/json/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = `${data[languageValue][random].text}`;
  author.textContent = `${data[languageValue][random].author}`;
};
getQuote();

changeQuote.addEventListener('click', () => {
  getQuote();
});

language.addEventListener('click', () => {
  (languageValue === 'en') ? languageValue = 'ru' : languageValue = 'en';
  (languageValue === 'en') ? language.textContent = 'RU' : language.textContent = 'EN';

  getWeather(languageValue);
  getQuote(languageValue);
  changeSettingsLanguage(languageValue);
  showGreeting();
});

/* SETTINGS */

settingsBtn.addEventListener('click', () => {
  settingsBox.classList.toggle('_active');
  settingsBtn.classList.toggle('_active');
});

const chooseBackground = () => {
  if (bgOptions.value === 'github') {
    bgInput.value = '';
    setBg();
  }

  if (bgOptions.value === 'unplash') {
    getLinkToUnplash();
  }

  if (bgOptions.value === 'flickr') {
    getLinkToFlickr();
  }
};

bgOptions.addEventListener('change', chooseBackground);
bgInput.addEventListener('change', chooseBackground);
window.addEventListener('load', chooseBackground);

const hideElements = () => {
  inputs.forEach((el, index) => {
    el.addEventListener('change', () => {
      if (el.checked) {
        hideInput[index].style.transition = '0.8s';
        hideInput[index].style.opacity = '0';
        hideInput[index].style.visibility = 'hidden';
      } else {
        hideInput[index].style.opacity = '100';
        hideInput[index].style.visibility = 'visible';
      }
    });
  });
};
hideElements();

/* PLAYER */

const songLength = playList.length - 1;

let isPlay = false;
let currentSong = 0;

const addPlaylist = () => {
  playList.forEach((el, index) => {
    const item = document.createElement('li');

    item.classList.add('play-item');
    item.textContent = `${el.title}`;

    playListWrapper.append(item)
  })
};
addPlaylist();

const addPlayListActiveClass = () => {
  const playItems = document.querySelectorAll('.play-item');

  playItems.forEach((item, index) => {
    if (index === currentSong) {
      item.classList.add('item-active')
    } else {
      item.classList.remove('item-active')
    }
  })
};
addPlayListActiveClass()

const playAudio = () => {
  audio.src = `${playList[currentSong].src}`;
  audio.currentTime = 0;

  if (!isPlay) {
    audio.play();
    isPlay = true;
    playButton.classList.add('pause');
  } else {
    audio.pause();
    isPlay = false;
    playButton.classList.remove('pause');
  }

  addPlayListActiveClass();
};
playButton.addEventListener('click', playAudio);

const playNext = () => {
  (currentSong < songLength) ? currentSong++ : currentSong = 0;
  isPlay = false;

  playAudio();
};
playNextButton.addEventListener('click', playNext);

const playPrev = () => {
  (currentSong > 0) ? currentSong-- : currentSong = 3;
  isPlay = false;

  playAudio();
};
playPrevButton.addEventListener('click', playPrev);
