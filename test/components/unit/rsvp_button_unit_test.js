/* global describe it beforeEach */

import RSVPButton from '../../../src/components/ui/RSVPButton';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

describe('<RSVPButton/>', () => {

    const handleRSVPSpy = sinon.spy()
    RSVPButton.prototype.handleRSVP = handleRSVPSpy 
    const onAddErrorSpy = sinon.spy()
    const onFetchBarsSpy = sinon.spy()

    const containerFactory = (bar, currentRSVPs) => {
        // bar: the bar this button represents
        // currentRSVPs: an array of bars the user is already attending

        const store = createStore(reducers);
        return mount(
          <Provider store={store}>
            <RSVPButton
                bar={bar}
                currentRSVPs={currentRSVPs}
                onAddError={onAddErrorSpy}
                onFetchBars={onFetchBarsSpy}

            />
          </Provider>
        )
    }

    let bar = {
            id: 'bar-id',
            name: 'some bar',
            "coordinates": {
              "latitude": 37.5672799,
              "longitude": -84.31278
            },
            "location": {
              "display_address": [
                "some street",
                "anytown, usa 12345"
              ]
            }
    }

    let currentRSVPs = [
        {
            barId: 'bar-id' 
        }
    ]

    it('renders button with already attending == true', (done) => {
        const container = containerFactory(bar, currentRSVPs)
        const button = container.find('.btn-default').first()
        expect(button).to.have.length(1)
        expect(button.text()).to.equal("changed my mind")
        done()
    })

    it('renders button with already attending == false', (done) => {
        const container = containerFactory(bar, [])
        const button = container.find('.btn-primary').first()
        expect(button).to.have.length(1)
        expect(button.text()).to.equal("I'll be there")
        done()
    })

    it('handles click', (done) => {
        const container = containerFactory(bar, [])
        const button = container.find('.btn-primary').first()
        button.simulate('click')
        expect(handleRSVPSpy.calledOnce).to.equal(true)
        done()
    })

})