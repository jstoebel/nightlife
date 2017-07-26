import C from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case C.ADD_BARS:
        const bars = state.slice()
        bars.push(action.payload)
        return bars
    case C.CLEAR_BARS:
        return [];
  }
  return state;
}
