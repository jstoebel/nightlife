/* global describe it beforeEach */

import Results from '../../../src/components/ui/Results';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import reducers from '../../../src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

describe('<Results/>', () => {

    let container
    let results = [
        {
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
        },
        {
            id: 'another-id',
            name: 'another bar',
            "coordinates": {
              "latitude": 37.5672799,
              "longitude": -84.31278
            }, 
            "location": {
              "display_address": [
                "another street",
                "anytown, usa 12345"
              ]
            }
        },
    ]

    beforeEach((done) => {

        const store = createStore(reducers);
        container = mount(
          <Provider store={store}>
            <Results
                results={results}
            />
          </Provider>
        )
        done()
    })

    it('renders row for each bar', (done) => {
        const rows = container.find('tr')
        expect(rows).to.have.length(results.length)
        done()
    })

    it('renders each bars attrs', (done) => {
        const rows = container.find('tr')

        rows.forEach((row, idx) => {
            const bar = results[idx]
            
            expect(
                row.find('h4').first().text()
            ).to.equal(bar.name)

            expect(
                row.find('div').first().text()
            ).to.equal(
                bar.location.display_address.join(', ')
            )

        })
        done()
    })

    it('renders RSVP buttons', (done) => {
        const buttons = container.find('button')
        expect(buttons).to.have.length(results.length)
        done()
    })


})