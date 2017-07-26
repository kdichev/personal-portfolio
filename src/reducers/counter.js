// Reducer:
function counter(state={count: 0, saved: []}, action) {
  let count = state.count;
  let saved = state.saved;
  switch(action.type){
    case 'increase':
      return {
        ...state,
        count: count  + 1
      };
    case 'decrease':
      if (count === 0) {
        return {...state, count: count }
      }
      return {
        ...state,
        count: count - 1
      };
    case 'reset':
      return {
        ...state,
        count: count  = 0
      };
    case 'save':
      return {
        ...state,
        saved: [...saved, count]
      };
    case 'remove':
      return {
        ...state,
        saved: [...saved.slice(0, -1)]
      };
    default:
      return state;
  }
}

export default counter
