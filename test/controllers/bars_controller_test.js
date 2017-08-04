/* global describe it beforeEach afterEach*/

// import _ from 'lodash';
import app from '../../server/index';
// import {secret as appSecret} from '../../server/config/config';
import {expect} from 'chai';
import factory from '../factories';
// import jwt from 'jsonwebtoken';
import request from 'supertest';
import User from '../../server/models/User';
// import barsController from '../../server/controllers/bars'
import rewire from 'rewire'
import Promise from 'bluebird'
import sampleData from '../sampleData.json'
import sinon from 'sinon'
import mockery from 'mockery'

describe('Bars Controller', function() {
  
  let yelpMock;
  beforeEach((done) => {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    done()
  }); // beforeEach

  // afterEach((done) => {
  //   User.remove({}, () => {
  //     done();
  //   });
  // }); // afterEach

  // let barsControllerMock = rewire('../../server/controllers/bars')
  describe('search', () => {
    
    it('succeeds on first try', (done) => {

      const resultsPromise = new Promise((resolve) => {
        resolve({
          jsonBody: {
            businesses: sampleData
          }
        })
      })

      const yelpMock = {
        client: function(){
          return {
              search: function(){
                  return resultsPromise
              }
          }
        }
      }

      mockery.registerMock('yelp-fusion', yelpMock);

      request(app)
        .get('/api/bars/search/12345')
        .expect(200)
        .then((resp) => {


          console.log(resp.body.bars)
          console.log(sampleData)
          // not quite the same
          expect(resp.body.bars).to.equal(sampleData)
          done()
        })
        // .then((resp) => {
        //   expect(resp.body.bars).to.equal(sampleData)
        //   done()
        // }).catch((err) => {
        //   console.log("caught!")
        // })

    }) // end test

  }) // end describe

  describe('rsvp', () => {
 
  })

  describe('getRSVPs', () => {
  })

});
