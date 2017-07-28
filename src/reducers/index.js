import authReducer from './auth_reducer';
import barsReducer from './bars_reducer'
import errorReducer from './error_reducer'
import resultsReducer from './results_reducer';
import fetchingReducer from './fetching_reducer'
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  bars: barsReducer,
  errors: errorReducer,
  form: formReducer,
  results: resultsReducer,
  fetching: fetchingReducer,
});

export default rootReducer;
