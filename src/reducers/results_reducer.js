import C from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case C.ADD_RESULTS:
        return action.payload;
    case C.CLEAR_RESULTS:
        return [];
  }
  return state;
}
