// Reducer:
function counter(state={count: 0}, action) {
  let count = state.count;
  switch(action.type){
    case 'increase':
      return {count: count  + 1};
    case 'decrease':
      if (count === 0) {
        return {count: count }
      }
      return {count: count - 1 };
    case 'reset':
      return {count: count  = 0};
    default:
      return state;
  }
}

export default counter
