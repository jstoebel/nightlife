import C from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case C.ADD_BARS:
        return action.payload
    case C.CLEAR_BARS:
        return [];
  }
  return state;
}
