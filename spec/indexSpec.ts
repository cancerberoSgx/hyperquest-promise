import { get } from '../src'

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
      const response = get('http://localhost:8081/url1', { headers: { Auth: '' } })
        .then(response => {
          expect(JSON.parse(response.data).prop).toBe(123)
          done()
        })
        .catch(err => {
          server.close(); fail(err)
        })
    })
  })

  it('real http address', async done=>{
    const url = 'https://cancerberosgx.github.io/demos/index.html'
    const {data} = await get(url)
    expect(data).toContain('<html>')
    done()
  })
})

