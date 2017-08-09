/* global describe it beforeEach afterEach*/

import _ from 'lodash';
import app from '../../server/index';
import {secret as appSecret} from '../../server/config/config';
import {expect} from 'chai';
import factory from '../factories';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import User from '../../server/models/User';

let testPw = '123';

const generateToken = (user) => {
  return jwt.sign(user, appSecret, {
    expiresIn: 10080, // in seconds
  });
};

describe('Authentication Controller', function() {
  let userInfo;
  beforeEach((done) => {
    
    userInfo = new User({
      email: 'test@test.com',
      password: '123',
      profile: {
        firstName: 'Jacob',
        lastName: 'Stoebel',
      }
    })
    done()
  }); // beforeEach

  afterEach((done) => {

    User.remove({}, () => {
      User.count((err, count) => {
        console.log(`there are ${count} users`)
        done();
      })
    });
  }); // afterEach

  describe('LOGIN', () => {

    let testUser;
    beforeEach((done) => {

      const promise = userInfo.save()
      promise.then((doc) => {
        testUser = doc;
        done()
      })
      // testUser.save((err) => {
      //   if (err) {
      //     throw err;
      //   }
      //   done();
      // });
    });

    it('should return token and user info', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({email: testUser.email, password: testPw})
        .expect(200)
        .then((resp) => {
          expect(resp.body.token).to.not.equal(undefined);
          expect(resp.body.user.firstName).to.equal(testUser.profile.firstName);
          expect(resp.body.user.lastName).to.equal(testUser.profile.lastName);
          expect(resp.body.user.email).to.equal(testUser.email);
          expect(resp.body.user.role).to.equal(testUser.role);
          done();
        })
    }); // test
  });

  describe('REGISTER', () => {

    it('should return token and user info on successful reg', (done) => {

      console.log({
            email: userInfo.email,
            firstName: userInfo.profile.firstName,
            lastName: userInfo.profile.lastName,
            password: testPw,
      })

      request(app)
        .post('/api/auth/register')
        .send({
          email: userInfo.email,
          firstName: userInfo.profile.firstName,
          lastName: userInfo.profile.lastName,
          password: testPw,
        })
        .expect(201)
        .then((resp) => {
          expect(resp.body.token).to.not.equal(undefined);
          expect(resp.body.user.firstName).to.equal(userInfo.profile.firstName);
          expect(resp.body.user.lastName).to.equal(userInfo.profile.lastName);
          expect(resp.body.user.email).to.equal(userInfo.email);
          expect(resp.body.user.role).to.equal(userInfo.role);
          done();
        });
    }); // test

    let userAttrs = {
      email: 'test@test.com',
      firstName: 'Jacob',
      lastName: 'Stoebel',
      password: '123',
    }; // attrs to use in request

    const cases = [
      {field: 'email', attr: {email: ''}, message: 'You must enter an email address.'},
      {field: 'firstName', attr: {firstName: ''}, message: 'You must enter your full name.'},
      {field: 'lastName', attr: {lastName: ''}, message: 'You must enter your full name.'},
      {field: 'password', attr: {password: ''}, message: 'You must enter a password.'},
    ];

    cases.forEach((c, i) => {
      it(`should fail with missing ${c.field}`, (done) => {
          const paramsToUse = _.merge({}, userAttrs, c.attr);
          request(app)
            .post('/api/auth/register')
            .send(paramsToUse)
            .expect(422)
            .then((resp) => {
              expect(resp.body.error).to.equal(c.message);
              done();
            })
      }); // test
    }); // forEach
  }); // register

  describe('CHECK TOKEN', () => {
    it('allows a valid token', (done) => {
      
      const promise = userInfo.save()
      promise.then((doc) => {
        const tokenInfo = {
          _id: doc._id,
          firstName: doc.profile.firstName,
          lastName: doc.profile.lastName,
          email: doc.email,
          role: doc.role,
        };

        const expectedToken = 'JWT ' + generateToken(tokenInfo);
        request(app)
          .get('/api/auth/protected')
          .set('Authorization', expectedToken)
        .expect(200, done);
      })
    });

    it('rejects a bogus token', (done) => {

      const promise = userInfo.save()
      promise.then((doc) => {

        const expectedToken = 'bogus token'
        request(app)
          .get('/api/auth/protected')
          .set('Authorization', expectedToken)
        .expect(401, done);
      })

    });
  });
});
