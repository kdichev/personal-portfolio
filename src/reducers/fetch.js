// Reducer:
function fetch(state={data: []}, action) {
  console.log("When I call 'save' this is also invoked");
  switch(action.type){
    case 'fetch':
    return {...state, data: [...action.payload] }
    default:
      return state;
  }
}

export default fetch
