/* global describe it beforeEach */

import App from '../../../src/components/ui/App';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


describe('<App/>', () => {
  let wrapper;
  const onFetchBarsSpy = sinon.spy();
  let auth;
  let errors;
  beforeEach((done) => {
    auth = {authenticated: false}
    errors = [];
    done();
  });

  it('contains a register link', (done) => {

    wrapper = shallow(<App onFetchBars={onFetchBarsSpy} auth={auth} errors={errors}/>)
    expect(wrapper.find({href: '/register'})).to.have.length(1);
    done();
  })

  it('contains a login link when not logged in', (done) => {
    wrapper = shallow(<App onFetchBars={onFetchBarsSpy} auth={auth} errors={errors}/>)
    expect(wrapper.find({href: '/login'})).to.have.length(1);
    done();
  })

  it('contains a logout link when logged in', (done) => {
    const auth = {authenticated: true}
    wrapper = shallow(<App onFetchBars={onFetchBarsSpy} auth={auth} errors={errors}/>)
    expect(wrapper.find({href: '/logout'})).to.have.length(1);
    done()
  })

  it('renders alerts', (done) => {
    const errors = ['an error', 'another error']
    const store = createStore(reducers);
    const container = mount(
      <Provider store={store}>
        <App onFetchBars={onFetchBarsSpy} auth={auth} errors={errors}/>
      </Provider>
    );
    
    expect(container.find('.alert.alert-danger.alert-dismissable')).to.have.length(2)
    done()
  })

  it('renders a spinner when fetching', (done) => {
    const store = createStore(reducers);
    const container = mount(
      <Provider store={store}>
        <App onFetchBars={onFetchBarsSpy} auth={auth} errors={errors} fetching={true}/>
      </Provider>
    )
    expect(container.find('.fa.fa-refresh.fa-spin')).to.have.length(1)
    done()
  })

  

});
