import { get } from '../src'
import { ClientResponse } from 'http';

  describe('hyperquest-promise', () => {
    // let onSuccess
    // let onFailure
    // let request
    // beforeEach(function () {
    //   jasmine.Ajax.install();
    //   onSuccess = jasmine.createSpy('onSuccess');
    //   onFailure = jasmine.createSpy('onFailure');
    //   request.respondWith(TestResponses.search.success);
    // });
    // afterEach(function () {
    //   jasmine.Ajax.uninstall();

    // });

    it('works', () => {



      // const request = jasmine.Ajax.requests.mostRecent();
      // request.respondWith({
      //   status: 200,
      //   responseText: '{"data":{}}'
      // });



      // expect(request.url).toBe('venues/search');
      // expect(request.method).toBe('POST');
      // expect(request.data()).toEqual({ latLng: ['40.019461, -105.273296'] });
    })

    it('signature works', () => {
      if(Math.random()>2){ // false - we just want to test the signature

        get('url', {headers: {Auth: ''}}).then(response=>console.log(response.data));
        expect('signature compiled OK').toBeTruthy()
      }
    })
  })



// describe("FoursquareVenueSearch", function() {
//   var foursquare, request;
//   var onSuccess, onFailure;

//   beforeEach(function() {
//     jasmine.Ajax.install();

//     onSuccess = jasmine.createSpy('onSuccess');
//     onFailure = jasmine.createSpy('onFailure');

//     // foursquare = new FoursquareVenueSearch();

//     // foursquare.search('40.019461,-105.273296', {
//     //   onSuccess: onSuccess,
//     //   onFailure: onFailure
//     // });

//     request = jasmine.Ajax.requests.mostRecent();
//     expect(request.url).toBe('venues/search');
//     expect(request.method).toBe('POST');
//     expect(request.data()).toEqual({latLng: ['40.019461, -105.273296']});
//   });

//   describe("on success", function() {
//     beforeEach(function() {
//       request.respondWith(TestResponses.search.success);
//     });

//     it("calls onSuccess with an array of Locations", function() {
//       expect(onSuccess).toHaveBeenCalled();

//       var successArgs = onSuccess.calls.mostRecent().args[0];

//       expect(successArgs.length).toEqual(1);
//       expect(successArgs[0]).toEqual(jasmine.any(Venue));
//     });
//   });
// });