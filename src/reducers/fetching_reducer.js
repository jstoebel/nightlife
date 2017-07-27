import C from '../constants';

export default function(state = false, action) {
  switch (action.type) {
    case C.CHANGE_FETCHING:
        return action.payload
  }
  return state;
}