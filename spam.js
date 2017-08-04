const sampleData = require('./test/sampleData.json')
const Promise = require('bluebird')

const sinon = require('sinon')
const mockery = require('mockery')
const yelp = require('yelp-fusion')
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});

const resultsPromise = new Promise((resolve, reject) => {
  resolve({
    jsonBody: {
      businesses: sampleData
    }
  })
})
// const searchStub = sinon.stub()
// searchStub.returns(resultsPromise)

// console.log(searchStub())

// const clientStub = sinon.stub()
// clientStub.returns(searchStub)

// console.log(clientStub() === searchStub)

const yelpMock = {
  client: function(){
    return {
        search: function(){
            return resultsPromise
        }
    }
  }
}

mockery.registerMock('yelp-fusion', yelpMock);

// yelpMock.client()
client = yelpMock.client()
rp = client.search()
console.log(rp)
