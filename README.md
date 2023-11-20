# Momentum
[Live Demo](https://k-davydova.github.io/momentum/)

## Overview

**Momentum** - an analog of the [Chrome Web Store app](https://chromewebstore.google.com/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=ru&pli=1) for the Chrome browser.

The application displays the current time and user's name, with the background image and greeting changing based on the time of day. The features include a clock, image slider, weather widgets, audio player, daily quote block, and settings. User name and location are stored using local storage.

***Note***: The application's layout was provided, and my task was to create an interactive application using JavaScript.

## Key Skills:

- Date and time handling
- Audio manipulation
- Data storage using local storage
- Asynchronous request handling

## Application Features:

1. Clock and Calendar
2. Greeting
- The greeting text changes based on the time of day (morning, day, evening, night).
- User name is saved on page reload, stored in local storage.
3. Background Image Change
- The background image link is generated considering the time of day and a random image number.
- Images can be navigated using arrows on either side of the screen, looping sequentially.
4. Weather Widget
- Default city is Tbilisi until the user inputs another city.
- User-specified city is saved on page reload, stored in local storage.
- Weather data for the specified city is retrieved from the API.
- Error notification is displayed for incorrect values where the API doesn't return weather data.
5. Quote of the Day Widget
- A random quote and its author are displayed on application load.
- Clicking the quote button replaces it with another random quote.
6. Audio Player
- Clicking Play/Pause plays the first track in the play-list block, with the button icon changing to Pause.
- Tracks can be skipped using Play-next and Play-prev buttons.
- Tracks loop in a circular manner.
- The currently playing track is highlighted in the Play-list block.
- After the first track ends, the next track automatically starts playing.
7. Application Localization
- All values in the application change language when clicking the language button in settings.
8. Background Image Retrieval from API
- Unsplash and Flickr API can be used as sources for images.
9. Application Settings
- Language selection (en/ru) in application settings.
- Choose the source for background images: GitHub image collection, Unsplash API, Flickr API.
- If API is selected, specify a tag for images in the application settings.
- Hide/show any of the page blocks in application settings: time, date, greeting, quote of the day, weather forecast, audio player.