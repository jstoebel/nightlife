/* global describe it beforeEach afterEach */

import {createStore} from 'redux';
import {expect} from 'chai';
import Logout from '../../../src/components/ui/Logout';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import React from 'react';
import reducers from '../../../src/reducers/index';
import sinon from 'sinon';

describe('<Logout/>', () => {
    let onLogoutSpy = sinon.spy();
    let onAddErrorSpy = sinon.spy();
    let pushSpy = sinon.spy();
    let historyMock = {
        push: pushSpy,
    };

    beforeEach((done) => {
        const store = createStore(reducers);
        mount(
          <Provider store={store}>
            <Logout
                onLogout={onLogoutSpy}
                onAddError={onAddErrorSpy}
                history={historyMock}
            />
          </Provider>
        );
        done();
    });

    afterEach((done) => {
        onLogoutSpy.reset();
        onAddErrorSpy.reset();
        pushSpy.reset();
        done();
    });

    it('calls onLogout', (done) => {
        expect(onLogoutSpy.calledOnce).to.equal(true);
        done();
    });

    it('adds an error message', (done) => {
        expect(onAddErrorSpy.calledOnce).to.equal(true);
        done();
    });

    it('pushes / to history', (done) => {
        expect(pushSpy.calledOnce).to.equal(true);
        expect(pushSpy.getCall(0).args[0]).to.equal('/');
        done();
    });
});
