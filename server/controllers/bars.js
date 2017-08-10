'use strict';


const refreshToken = () => {
  const yelp = require('yelp-fusion');
  // return a promise containing response to request to generate an access token
  return yelp
    .accessToken(
      process.env.YELP_CLIENT_ID,
      process.env.YELP_CLIENT_SECRET
    );
};

const fetchBars = (token, location) => {
  // token (str): the yelp access token
  // return: a promise containing bars in the area

  const yelp = require('yelp-fusion');
  return yelp.client(token)
  .search({
    location: location,
    categories: 'bars',
  });
};

export function search(req, res) {
  const token = process.env.YELP_ACCESS_TOKEN;
  fetchBars(token, req.params.location)
    .then((response) => {
      // found bars on first try

      // expect to get here
      return res.json({bars: response.jsonBody.businesses});
    }).catch((response) => {
      // failed! make a new token and try again
      refreshToken()
        .then((response) => {
          // successfully generated a token
          const token = response.jsonBody.access_token;
          process.env.YELP_ACCESS_TOKEN = token; // assign token to persist
          fetchBars(token, req.params.location)
            .then((response) => {
              // fetched bars on second try
              return res.json({bars: response.jsonBody.businesses});
            }).catch((response) => {
              // failed to fetch bars on second try
              return res.status(500).json({msg: 'Something went wrong. Please try again later.'});
            });
        }).catch((response) => {
          // failed to refresh token
          return res.status(500).json({msg: 'Something went wrong. Please try again later.'});
        });
    });
}

export function rsvp(req, res) {
  const User = require('../models/User');
  User.findOne({_id: req.user._id}, (err, user) => {
    if (err) {
      throw err;
    }

    if (req.body.rsvp) {
      // first ensure that there isn't already an rsvp to this bar
      user.rsvps.forEach((bar) => {
        // fix me! https://github.com/jstoebel/nightlife/issues/5
        if (bar.name === req.body.barName) {
          return res.status(400).json({msg: 'RSVP already exists for this bar.'});
        }
      });

      // add the bar as an RSVP
      user.rsvps.push(req.body.bar);
      user.save((err) => {
        if (err) {
          return res.status(400).json({msg: 'There was an error creating your rsvp. Please try again later.'});
        }

        // successful rsvp!
        return res.status(200).json({msg: 'RSVP saved successfully!'});
      });
    } else {
      // remove the bar as rsvp
      user.rsvps.forEach((rsvp) => {
        if (rsvp.barId === req.body.bar.barId) {
          rsvp.remove();
          user.save((err) => {
            if (err) {
              return res.status(400).json({msg: 'There was an error removing your rsvp. Please try again later.'});
            }
          });
        }
      });
      return res.status(200).json({msg: 'RSVP removed successfully.'});
    }
  });
}

export function getRSVPs(req, res) {
  // get the user's current rsvps
  res.status(200).json({rsvps: req.user.rsvps});
}
