/* global describe it beforeEach*/

import {Alert} from 'react-bootstrap';
import {expect} from 'chai';
import {Field} from 'redux-form';
import Login from '../../../src/components/ui/Login';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

describe('<Login/>', () => {
  let wrapper;
  let handleSubmit = sinon.spy();
  let loginUser = sinon.spy();
  beforeEach((done) => {
    wrapper = shallow(<Login
      handleSubmit={handleSubmit}
      loginUser={loginUser}
    /> );
    done();
  });

  describe('renders fields', () => {
    let fields;
    beforeEach((done) => {
      fields = wrapper.find(Field);
      done();
    });
    const fieldNames = ['email', 'password'];
    fieldNames.forEach((name) => {
      it(`renders ${name}`, (done) => {
        expect(fields.find({name: name})).to.have.length(1);
        done();
      });
    });
  });

  it('renders error message', (done) => {
    const msg = 'Something went wrong';
    wrapper.setProps({errorMessage: msg});
    expect(
        wrapper.find(Alert)
          .find('span')
          .text()
    ).to.equal(`Error! ${msg}`);

    done();
  });
});
