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
})



// describe("FoursquareVenueSearch", function() {
//   var foursquare, request

//   var onSuccess, onFailure


//   beforeEach(function() {
//     jasmine.Ajax.install()


//     onSuccess = jasmine.createSpy('onSuccess')

//     onFailure = jasmine.createSpy('onFailure')


//     // foursquare = new FoursquareVenueSearch()


//     // foursquare.search('40.019461,-105.273296', {
//     //   onSuccess: onSuccess,
//     //   onFailure: onFailure
//     // })


//     request = jasmine.Ajax.requests.mostRecent()

//     expect(request.url).toBe('venues/search')

//     expect(request.method).toBe('POST')

//     expect(request.data()).toEqual({latLng: ['40.019461, -105.273296']})

//   })


//   describe("on success", function() {
//     beforeEach(function() {
//       request.respondWith(TestResponses.search.success)

//     })


//     it("calls onSuccess with an array of Locations", function() {
//       expect(onSuccess).toHaveBeenCalled()


//       var successArgs = onSuccess.calls.mostRecent().args[0]


//       expect(successArgs.length).toEqual(1)

//       expect(successArgs[0]).toEqual(jasmine.any(Venue))

//     })

//   })

// })



  // let onSuccess
  // let onFailure
  // let request
  // beforeEach(function () {
  //   jasmine.Ajax.install()

  // })

  // afterEach(function () {
  //   jasmine.Ajax.uninstall()


  // })


  // it('works', () => {


  //   // request = jasmine.Ajax.requests.mostRecent()

  //   onSuccess = jasmine.createSpy('onSuccess')

  //   onFailure = jasmine.createSpy('onFailure')


  //   const request = jasmine.Ajax.requests.mostRecent()

  //   request.respondWith({
  //     status: 200,
  //     responseText: '{"data":{}}'
  //   })




  //   // expect(request.url).toBe('venues/search')

  //   // expect(request.method).toBe('POST')

  //   // expect(request.data()).toEqual({ latLng: ['40.019461, -105.273296'] })

  // })
