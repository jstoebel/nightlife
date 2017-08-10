// error messages

import C from '../constants';

// if no state provided, what should it be?

export default function(state = [], action) {
  const errors = state.slice();
  switch (action.type) {
    case C.ADD_ERROR:
        errors.push(action.payload);
        return errors;
    case C.REMOVE_ERROR:
        errors.splice(action.payload, 1);
        return errors;
  }
  return state;
}
