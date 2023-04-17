# Songify
An app that turns music into corresponding GIFs
___

## Installation
Clone the repository
```sh
git clone https://github.com/noxfall/songifyapp5
```

Install dependencies
```sh
$ cd songifyapp5
$ npm install
```

Create a __```.env```__ file in the root directory of the project with following variables

```js
VITE_LASTFM_API=<your LastFM api key>
VITE_GIPHY_API=<your Giphy api key>
VITE_MM_API=<your Musixmatch api key> // to fetch the lyrics
VITE_SC_RAPIDAPI=<your RapidAPI soundcloud-scraper api key> // to play the music
```

Finally, you can run the app with
```sh
$ npm run dev
```