# hyperquest-promises

## What
[hyperquest](https://github.com/substack/hyperquest) returning promises

For those not familiar, this is alibrary for making requests that will work both in node.js and browser thanks to browserify. 

Code taken from here: https://gist.github.com/nikcorg/0999f547a32299e44fef

(I really needed this as a node.js project.)

## Install

```npm install --save hyperquest-promise ```

## Usage

GET Spotify user's profile (using async/await - that's the beauty of promises) 

```js
const get = require('hyperquest-promises').get
module.exports.getSpotifyProfile = async () => {
  const response = await get('https://api.spotify.com/v1/me/playlists', {headers: {Authorization: `Bearer ${THE_TOKEN}`}})
  return (!response || !response.data) ? null || JSON.parse(response.data)
}
```

This project is written with typescript and supports new ecma modules so you can import modules like this : 
TODO

```ts
import { get } from 'hyperquest-promises'
module.exports.getSpotifyProfile = async () => {
  const response = await get('https://api.spotify.com/v1/me/playlists', {headers: {Authorization: `Bearer ${THE_TOKEN}`}})
  return (!response || !response.data) ? null || JSON.parse(response.data)
}
```js
For API documentation , please go to [hyperquest](https://github.com/substack/hyperquest) or [request](https://github.com/request/request). 
The API is the same as hyperquest with the only difference that methods will return a `Promise`