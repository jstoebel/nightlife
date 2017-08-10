/* global describe it beforeEach afterEach*/

import app from '../../server/index';
 
import {expect} from 'chai';
import factory from '../factories';
import request from 'supertest';
import User from '../../server/models/User';
import Promise from 'bluebird'
import jwt from 'jsonwebtoken';
import {secret as appSecret} from '../../server/config/config';
import sampleData from '../sampleData.json'
import sinon from 'sinon'
import mockery from 'mockery'

const generateToken = (user) => {
  return jwt.sign(user, appSecret, {
    expiresIn: 10080, // in seconds
  });
};

 
describe('Bars Controller', function() {
  
  let yelpMock;
  beforeEach((done) => {

    // set up mocking
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    done()
  }); // beforeEach

  describe('search', () => {

    let resultsSuccess;
    let promiseFail;
    let tokenRefreshSuccess;
    beforeEach(() => {

      resultsSuccess = new Promise((resolve, reject) => {
        resolve({
          jsonBody: {
            businesses: sampleData
          }
        })
      })

      promiseFail = new Promise((resolve, reject) => {
        reject('failed!')
      })

      tokenRefreshSuccess = new Promise((resolve, reject) => {
        resolve({
          jsonBody: {
            access_token: '123'
          }
        })
      })


    }) // beforeEach
    
    it('succeeds on first try', (done) => {

      const yelpMock = {
        client: function(){
          return {
              search: sinon.stub().returns(resultsSuccess)
          }
        }
      }

      mockery.registerMock('yelp-fusion', yelpMock);

      request(app)
        .get('/api/bars/search/12345')
        .expect(200)
        .then((resp) => {
          expect(JSON.stringify(resp.body.bars)).to.equal(JSON.stringify(sampleData))
          done()
        })

    }) // end test

    it('fails -> refreshes token -> succeeds', (done) => {

        const yelpMock = {
          client: sinon.stub()
                        .onFirstCall().returns({
                          search: function() {
                            return promiseFail
                          }
                        })
                        .onSecondCall().returns({
                          search: function() {
                            return resultsSuccess
                          }
                        }),
          accessToken: sinon.stub().returns(tokenRefreshSuccess)
        }
    

        mockery.registerMock('yelp-fusion', yelpMock);
        request(app)
          .get('/api/bars/search/12345')
          .expect(200)
          .then((resp) => {
            expect(JSON.stringify(resp.body.bars)).to.equal(JSON.stringify(sampleData))
            done()
          })
    })

    it('fails on second try', (done) => {
        const yelpMock = {
          client: sinon.stub().returns({
                          search: function() {
                            return promiseFail
                          }
                        }),
          accessToken: sinon.stub().returns(tokenRefreshSuccess)
        }
        mockery.registerMock('yelp-fusion', yelpMock);
        request(app)
          .get('/api/bars/search/12345')
          .expect(500)
          .then((resp) => {
            expect(JSON.stringify(resp.body.msg))
              .to.equal(
                JSON.stringify(
                  "Something went wrong. Please try again later."
                )
              )
            done()
          })
    })

    it('fails to refresh token', (done) => {
      const yelpMock = {
        client: sinon.stub().returns({
                        search: function() {
                          return promiseFail
                        }
                      }),
        accessToken: sinon.stub().returns(promiseFail)
      }
      mockery.registerMock('yelp-fusion', yelpMock);
      request(app)
        .get('/api/bars/search/12345')
        .expect(500)
        .then((resp) => {
          expect(JSON.stringify(resp.body.msg))
            .to.equal(
              JSON.stringify(
                "Something went wrong. Please try again later."
              )
            )
          done()
        })
    })

  }) // end describe



  describe('rsvp', () => {

    let aBar = {
      barName: 'a bar',
      barId: 'a-bar'
    }

    describe('logged in', () => {
      let jwt;
      let testUser;
      let userMock
      let saveStub
      beforeEach((done) => {
          
          // stub auth: https://stackoverflow.com/questions/41995464/how-to-mock-middleware-in-express-to-skip-authentication-for-unit-test

          const testUser = {
            email: 'jstoebel@test.com',
            password: '123',
            rsvps: []
          }
          
          jwt = generateToken(testUser)
          const findOneStub = sinon.stub().yields(null, testUser)
          // saveStub = sinon.stub(User.prototype, 'save')
          userMock = {
            findOne: findOneStub,
          }

          mockery.registerMock('../models/User', userMock)
          done()

      }) // beforeEach

      afterEach((done) => {

        saveStub.restore()
        done()
      })

      it.skip('creates a new rsvp', (done) => {

        request(app)
          .post('/api/bars/rsvp')
          .send(Object.assign({}, aBar, {rsvp: true}))
          .set('Authorization', jwt)
          .expect(200, done)
      })

      it.skip('removes an rsvp', (done) => {
        testUser.rsvps.push({
           barId: aBar.barId,
           name: aBar.barName,
        })
        testUser.save((err) => {
          if (err) {
            throw err
          }
        })

        request(app)
          .post('/api/bars/rsvp')
          .set('Authorization', jwt)
          .send(aBar)
          .expect(200)
          .then((resp) => {
            expect(resp.body.msg).to.equal('RSVP removed successfully.')
            expect(testUser.rsvps).to.have.length(0)
            done()
          })
        done()
      })

      it.skip('prevents double rsvp', (done) => {
        done()
      })

      it.skip('raises error when rsvp can\'t be created', (done) => {
        done()
      })

      it.skip('raises error when rsvp can\'t be removed', (done) => {
        done()
      })

    })

    describe('not logged in', () => {
      
      it.skip('rejects an invalid jwt', (done) => {
        done()
      })
    })

    describe('getRSVPs', () => {
    })
  })


});
