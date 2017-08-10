
import {createStore} from 'redux';
import ErrorMessage from '../../../src/components/ui/ErrorMessage';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import React from 'react';
import reducers from '../../../src/reducers/index';
import sinon from 'sinon';

/* global describe it beforeEach */
describe('<ErrorMessage/>', () => {
    let container;
    let removeErrorSpy = sinon.spy();
    beforeEach((done) => {
        const store = createStore(reducers);
        container = mount(
          <Provider store={store}>
            <ErrorMessage
                message={'an error'}
                removeError={removeErrorSpy}
            />
          </Provider>
        );
        done();
    });
    it('displays the message passed in', (done) => {
        expect(container.find('h4').text()).to.equal('an error');
        done();
    });
    it('responds to clicking the close button', (done) => {
        const closeButton = container.find('span').first();
        closeButton.simulate('click');
        expect(removeErrorSpy.calledOnce).to.equal(true);
        done();
    });
});
