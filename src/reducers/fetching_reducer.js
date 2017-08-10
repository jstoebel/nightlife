import C from '../constants';
// are we currently fetching results
export default function(state = false, action) {
  switch (action.type) {
    case C.CHANGE_FETCHING:
        return action.payload;
  }
  return state;
}
