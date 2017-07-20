'use strict';
import yelp from 'yelp-fusion';

const refreshToken = () => {
  // return a promise containing response to request to generate an access token
  return yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
}

const fetchBars = (token, location) => {
  // token (str): the yelp access token
  // return: a promise containing bars in the area

  return yelp.client(token)
  .search({
    location: location,
    categories: 'bars',
  })
}

export function search(req, res) {
  const token = process.env.YELP_ACCESS_TOKEN;
  fetchBars(token, req.params.location)
    .then((response) => {
      // found bars on first try
      res.json({bars: response.jsonBody.businesses});
    }).catch((response) => {
      // failed! make a new token and try again
      refreshToken()
        .then((response) => {
          // successfully generated a token
          const token = response.jsonBody.access_token
          process.env.YELP_ACCESS_TOKEN = token // assign token to persist
          fetchBars(token, req.params.location)
            .then((response) => {
              // fetched bars on second try
              res.json({bars: response.jsonBody.businesses});
            }).catch((response) => {
              // failed to fetch bars on second try
              res.status(500).json({msg: 'Something went wrong. Please try again later.'})
            })
        }).catch((response) => {
          // failed to refresh token
          res.status(500).json({msg: 'Something went wrong. Please try again later.'})
        })
    })

}