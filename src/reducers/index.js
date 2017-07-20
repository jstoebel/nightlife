import authReducer from './auth_reducer';
import searchReducer from './search_reducer'
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  bars: searchReducer,
  form: formReducer,
});

export default rootReducer;
