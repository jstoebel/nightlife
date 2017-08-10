/* global describe it beforeEach*/

import {expect} from 'chai';
import {Field} from 'redux-form';
import SearchBar from '../../../src/components/ui/SearchBar';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

describe('<SearchBar/>', () => {
  let wrapper;
  let handleSubmitSpy = sinon.spy();
  let fields
  beforeEach((done) => {
    wrapper = shallow(<SearchBar
      handleSubmit={handleSubmitSpy}
    /> );
    fields = wrapper.find(Field);
    done();
  });

  it('calls handles form submission', (done) => {
    const form = wrapper.find('form').first()
    form.simulate('submit')
    expect(handleSubmitSpy.calledOnce).to.equal(true)
    done()
  })

});
