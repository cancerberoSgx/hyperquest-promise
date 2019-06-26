import { get } from '../src'
import { writeFileSync, readFileSync } from 'fs';

describe('hyperquest-promise', () => {

  it('signature works', () => {
    if (Math.random() > 2) { // false - we just want to test the signature
      get('url', { headers: { Auth: '' } }).then(response => console.log(response.data))
      expect('signature compiled OK').toBeTruthy()
    }
  })

  it('real server', (done) => {
    const express = require('express')
    const server = express()
    server.get('/url1', (req: any, res: any) => {
      res.send(JSON.stringify({ prop: 123 }))
    })
    server.listen(8081, () => {
      console.log(`Server listening at http://localhost:8081/`)
      get('http://localhost:8081/url1', { headers: { Auth: '' } })
        .then(response => {
          expect(JSON.parse(response.data.toString()).prop).toBe(123)
          done()
        })
        .catch(err => {
          server.close(); 
          fail(err)
        })
    })
  })

  it('real http address', async done=>{
    const url = 'https://cancerberosgx.github.io/demos/index.html'
    const {data} = await get(url)
    expect(data.toString()).toContain('<html>')
    done()
  })

  it('binary', async done=>{
    const url = 'https://cancerberosgx.github.io/demos/WASM-ImageMagick/supported-formats/formats/to_rotate.jpg'
    const r = await get(url)
    expect(r.data.toString('base64')).toEqual(readFileSync('spec/assets/to_rotate.jpg').toString('base64'))
    done()
  })
})

