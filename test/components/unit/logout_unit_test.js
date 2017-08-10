/* global describe it beforeEach */

import Logout from '../../../src/components/ui/Logout';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

describe('<Logout/>', () => {

    let container
    let onLogoutSpy = sinon.spy()
    let onAddErrorSpy = sinon.spy()
    let pushSpy = sinon.spy()
    let historyMock = {
        push: pushSpy
    }

    let handleAlertDismissSpy = sinon.spy()
    beforeEach((done) => {
        const store = createStore(reducers);
        container = mount(
          <Provider store={store}>
            <Logout
                onLogout={onLogoutSpy}
                onAddError={onAddErrorSpy}
                history={historyMock}
            />
          </Provider>
        )
        done()
    })

    afterEach((done) => {
        onLogoutSpy.reset()
        onAddErrorSpy.reset()
        pushSpy.reset()
        done()
    })

    it('calls onLogout', (done) => {
        expect(onLogoutSpy.calledOnce).to.equal(true)
        done()
    })

    it('adds an error message', (done) => {
        expect(onAddErrorSpy.calledOnce).to.equal(true)
        done()
    })

    it('pushes / to history', (done) => {
        expect(pushSpy.calledOnce).to.equal(true)
        expect(pushSpy.getCall(0).args[0]).to.equal('/')
        done()
    })


})