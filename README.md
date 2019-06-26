[![Build Status](https://travis-ci.org/cancerberoSgx/hyperquest-promise.png?branch=master)](https://travis-ci.org/cancerberoSgx/hyperquest-promise)
[![Dependencies](https://david-dm.org/cancerberosgx/hyperquest-promise.svg)](https://david-dm.org/cancerberosgx/hyperquest-promise)


# Hyperquest returning Promises

[hyperquest](https://github.com/substack/hyperquest) returning promises

Same API, same code, both in browser and node.js.

For those not familiar, this is library for making requests that will work both in node.js and browser thanks to browserify or similar bundler. 

## Install

```npm install --save hyperquest-promise ```

## Usage

Use async/await for shorter syntax. Resolves with a Request object and request.data is a Buffer. By default encodes text as binary.

```ts
import { get } from 'hyperquest-promise'

(async () => {
  const {buffer} = await get('https://foo.com/f/bar.jpg')
  writeFileSync('bar.jpg', buffer)
})();

export async function getSpotifyProfile() {
  const response = await get('https://api.spotify.com/v1/me/playlists', 
    {headers: {Authorization: `Bearer ${THE_TOKEN}`}})
  return (!response || !response.data) ? null || JSON.parse(response.data.toString())
}
```

## API documentation

For API documentation , please go to [hyperquest](https://github.com/substack/hyperquest) or [request](https://github.com/request/request). 

The API is the same as hyperquest with the only difference that methods will return a `Promise`.

### Options signature

 * `url?: string`:
 * `scheme?: string`:
 * `method?: string`:
 * `host?: string`:
 * `port?: string`:
 * `encoding?: string`:
 * `path?: string`:
 * `agent?: string | false`:
 * `headers?: Headers`:
 * `withCredentials?: any`:
 * `localAddress?: any`:
 * `pfx?: any`:
 * `key?: any`:
 * `cert?: any`:
 * `ca?: any`:
 * `ciphers?: any`:
 * `rejectUnauthorized?: any`:
 * `secureProtocol?: any`:
 