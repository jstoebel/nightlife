import C from '../constants';

export default function(state = "", action) {
  switch (action.type) {
    case C.EDIT_SEARCH:
      return action.payload
    case C.CLEAR_SEARCH:
      return ""
  }
  return state;
}
