'use strict';
import yelp from 'yelp-fusion';
import User from '../models/User';

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

export function rsvp(req, res) {
  console.log("hello from rsvp")
  console.log(req.body.rsvp)

  User.findOne({_id: req.user._id}, (err, user) => {
    if (err) {
      throw err;
    }
    
    if (req.body.rsvp) {


    // first ensure that there isn't already an rsvp to this bar
    user.rsvps.forEach((bar) => {
      if (bar.name === req.body.barName) {
        return res.status(400).json({msg: "RSVP already exists for this bar."})
      } 
    })


    // add the bar as an RSVP
      user.rsvps.push({
        barId: req.body.barId,
        name: req.body.barName
      })
      user.save((err) => {

        if (err) {
          console.warn(err)
          console.warn("couldn't create an rsvp")
          return res.status(400).json({msg: "There was an error creating your rsvp. Please try again later."})
        }

        // successful rsvp!
        console.log("created rsvp")
        return res.status(200).json({msg: "RSVP saved successfully!"})
      
      })
    } else {
      // remove the bar as rsvp

      user.rsvps.forEach((rsvp) => {

        if (rsvp.name === req.body.barName) {
          rsvp.remove()
          user.save((err) => {
            if (err) {
              console.warn("error saving user after removing rsvp")
              return res.status(400).json({msg: "There was an error removing your rsvp. Please try again later."})            
            }

            console.log("removed rsvp successfully")
          })
        }


      })
      console.log(req.user)
      return res.status(200).json({msg: "RSVP removed successfully."})


    }
    
  })
}

export function getRSVPs(req, res) {
  // get the user's current rsvps
  console.log("hello from getRSVPs")
  console.log(req.user)
  res.status(200).json({user: req.user})

}