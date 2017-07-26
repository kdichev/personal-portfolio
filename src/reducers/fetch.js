// Reducer:
function fetch(state={data: []}, action) {
  console.log(state);
  console.log("asdasdsadsad");
  switch(action.type){
    case 'fetch':
    return {...state, data: [...action.payload] }
    default:
      return state;
  }
}

export default fetch
