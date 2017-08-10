/* global describe it beforeEach afterEach*/

import {expect} from 'chai';
import factory from '../factories';
import User from '../../server/models/User';

let testPw = '123';

describe('User Model', () => {
  let userInfo;
  let user1;
  beforeEach((done) => {

    userInfo = {
      email: 'test@test.com',
      password: '123',
      profile: {
        firstName: 'Jacob',
        lastName: 'Stoebel',
      },
    };
    
    user1 = new User(userInfo)
    done()

  }); // beforeEach

  afterEach((done) => {
    User.remove({}, () => {
      done();
    });
  }); // afterEach

  it('requires a unique email', (done) => {
    const userPromise = user1.save()
    userPromise.then((user) => {
      const user2 = new User(userInfo);
      const user2Promise = user2.save();
      user2Promise
        .then((usr) => {
          done(new Error('test failed.'));
        }).catch((err) => {
          expect(err.code).to.equal(11000);
          done();
        })
    })

  });
});
