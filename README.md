[![Build Status](https://travis-ci.org/cancerberoSgx/hyperquest-promise.png?branch=master)](https://travis-ci.org/cancerberoSgx/hyperquest-promise)
[![Dependencies](https://david-dm.org/cancerberosgx/hyperquest-promise.svg)](https://david-dm.org/cancerberosgx/hyperquest-promise)


# Hyperquest returning Promises

[hyperquest](https://github.com/substack/hyperquest) returning promises

Same API, same code, both in browser and node.js.

For those not familiar, this is library for making requests that will work both in node.js and browser thanks to browserify or similar bundler. 

## Install

```npm install --save hyperquest-promise ```

## Usage

GET Spotify user's profile (using async/await - that's the beauty of promises) 

```ts
import { get } from 'hyperquest-promise'

(async () => {
  const {html} = await get('https://cancerberosgx.github.io/demos/index.html')
})();

export async function getSpotifyProfile() {
  const response = await get('https://api.spotify.com/v1/me/playlists', 
    {headers: {Authorization: `Bearer ${THE_TOKEN}`}})
  return (!response || !response.data) ? null || JSON.parse(response.data)
}
```

## API documentation

For API documentation , please go to [hyperquest](https://github.com/substack/hyperquest) or [request](https://github.com/request/request). 

The API is the same as hyperquest with the only difference that methods will return a `Promise`