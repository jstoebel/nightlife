/* global describe it beforeEach*/

import {expect} from 'chai';
import React from 'react';
import SearchBar from '../../../src/components/ui/SearchBar';
import {shallow} from 'enzyme';
import sinon from 'sinon';

describe('<SearchBar/>', () => {
  let wrapper;
  let handleSubmitSpy = sinon.spy();
  beforeEach((done) => {
    wrapper = shallow(<SearchBar
      handleSubmit={handleSubmitSpy}
    /> );
    done();
  });

  it('calls handles form submission', (done) => {
    const form = wrapper.find('form').first();
    form.simulate('submit');
    expect(handleSubmitSpy.calledOnce).to.equal(true);
    done();
  });
});
