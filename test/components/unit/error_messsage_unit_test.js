/* global describe it beforeEach */

import ErrorMessage from '../../../src/components/ui/ErrorMessage';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

describe('<ErrorMessage/>', () => {

    let container
    let removeErrorSpy = sinon.spy()
    let handleAlertDismissSpy = sinon.spy()
    beforeEach((done) => {
        const store = createStore(reducers);
        container = mount(
          <Provider store={store}>
            <ErrorMessage
                message={'an error'}
                removeError={removeErrorSpy}
            />
          </Provider>
        )
        done()
    })
    it('displays the message passed in', (done) => {
        expect(container.find('h4').text()).to.equal('an error')
        done()
    })

    it('responds to clicking the close button', (done) => {
        const closeButton = container.find('span').first()
        closeButton.simulate('click')
        expect(removeErrorSpy.calledOnce).to.equal(true)
        done()
    })


})