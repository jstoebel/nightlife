// /* global describe it beforeEach */

// import MapComponent from '../../../src/components/ui/Map';
// import {expect} from 'chai';
// import React from 'react';
// import {shallow, mount} from 'enzyme';
// import sinon from 'sinon';
// import reducers from '../../../src/reducers/index';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import jsdom from 'jsdom';

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

// describe('<Map/>', () => {

//     let container
//     const results = [
//         {
//             id: 'bar-id',
//             name: 'some bar',
//             "coordinates": {
//               "latitude": 37.5672799,
//               "longitude": -84.31278
//             },
//         }
//     ]

//     let rsvps = [
//         {
//             barID: 'some-bar',
//             name: 'some bar'
//         }
//     ]

//     let onFetchBarsSpy = sinon.spy()

//     let onAddErrorSpy = sinon.spy()

//     beforeEach((done) => {
//         // TODO: don't know how to make this run.
//         // uncommenting the below causes ALL tests
           // (not just in this file) to break
//         // const store = createStore(reducers);
//         // container = mount(
//         //   <Provider store={store}>
//         //     <MapComponent
//         //         results={results}
//         //         currentRSVPs={rsvps}
//         //         onFetchBars={onFetchBarsSpy}
//         //         onAddError={onAddErrorSpy}
//         //     />
//         //   </Provider>
//         // )
//         done()
//     })

//     it.skip('works', (done) => {
//         // todo need to deal with ReferenceError: navigator is not defined
//         done()
//     })


// })
