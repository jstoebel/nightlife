import axios from 'axios';
import C from './constants';
import cookie from 'react-cookie';
import fetch from 'isomorphic-fetch'

// const API_URL = 'http://localhost:8000/api';

// AUTHENTICATION
export function errorHandler(dispatch, errResp, type) {
  let errorMessage = '';

  if (errResp.data.error) {
    errorMessage = errResp.data.error;
  } else if (errResp.data) {
    errorMessage = errResp.data;
  } else {
    errorMessage = errResp;
  }

  if (errResp.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.',
    });

    dispatch({type: C.UNAUTH_USER});
    cookie.remove('token', {path: '/'});
  } else {
    dispatch({
      type: type,
      payload: errorMessage,
    });
  }
}

export function clearAuthErrors(dispatch) {
  dispatch({type: C.CLEAR_ERROR});
}

export function loginUser({email, password}) {
  // user is logged in and their token saved to cookie
  return function(dispatch) {

    axios.post(`${API_URL}/auth/login`, {email, password})
    .then((response) => {
      // successful login
      console.log("successful login")
      console.log(`token: ${response.data.token}`)
      cookie.save('token', response.data.token, {path: '/'});
      dispatch({type: C.AUTH_USER});
      window.location.href = '/';
    })
    .catch((error) => {
      // unsuccesful login
      errorHandler(dispatch, error.response, C.AUTH_ERROR);
    });
    };
  }

export function registerUser({email, firstName, lastName, password}) {
  // user is registered and their token stored in cookie
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, {email, firstName, lastName, password})
    .then((response) => {
      cookie.save('token', response.data.token, {path: '/'});
      dispatch({type: C.AUTH_USER});
      window.location.href = '/';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, C.AUTH_ERROR);
    });
  };
}

export function logoutUser() {
  // clear the user's token from cookie
  return function(dispatch) {
    dispatch({type: C.UNAUTH_USER});

    cookie.remove('token', {path: '/'});

    window.location.href = '/login';
  };
}

export function protectedTest() {
  // validate the user's token and see if they are authorized
  return function(dispatch) {
    axios.get(`${API_URL}/auth/protected`, {
      headers: {'Authorization': cookie.load('token')},
    })
    .then((response) => {
      dispatch({
        type: C.PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, C.AUTH_ERROR);
    });
  };
}

// ERROR MESSAGES

export const addError = (err) => {
  return ({
    type: C.ADD_ERROR,
    payload: err
  })
}

export const removeError = (idx) => {
  return ({
    type: C.REMOVE_ERROR,
    payload: idx
  })
}

// BARS

export const fetchBars = () => (dispatch, getState) => {
  // fetch current bars RSVPd to
  console.log("fetching bars...")
  axios(`${API_URL}/bars/rsvps`, {
    headers: {'Authorization': cookie.load('token')},
  })
    .then((response) => {

      dispatch({
        type: C.ADD_BARS,
        payload: response.data.rsvps,
      })
    }).catch((err) => {
      console.log("no rsvps found...")
    })
}

// SEARHING

export const searchBars = (searchTerm) => (dispatch, getState) => {
  console.log("searching for bars in this area...")

  dispatch({
    type: C.CHANGE_FETCHING,
    payload: true
  })
  axios(`${API_URL}/bars/search/${searchTerm}`, {
    headers: {'Authorization': cookie.load('token')},
  })
    .then((response) => {
      console.log("search results found")
      console.log(response.data)
      dispatch({
        type: C.ADD_RESULTS,
        payload: response.data.bars,
      })

      dispatch({
        type: C.CHANGE_FETCHING,
        payload: false,

      })
    }).catch((err) => {

      console.warn(err)
      dispatch(
        {
          type: C.CHANGE_FETCHING,
          payload: false,
        }
      )
      if (err.response) {
        dispatch(
          {
            type: C.ADD_ERROR,
            payload: "There was a problem with that search term. Please try another one."
          }
        )

      } else {
        dispatch(
          {
            type: C.ADD_ERROR,
            payload: "There was a problem connecting to the server. Please try again later."
          }
        )
      }

    })
}
