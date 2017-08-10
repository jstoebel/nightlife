import authReducer from './auth_reducer';
import barsReducer from './bars_reducer';
import {combineReducers} from 'redux';
import errorReducer from './error_reducer';
import fetchingReducer from './fetching_reducer';
import {reducer as formReducer} from 'redux-form';
import resultsReducer from './results_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  bars: barsReducer,
  errors: errorReducer,
  form: formReducer,
  results: resultsReducer,
  fetching: fetchingReducer,
});
export default rootReducer;
