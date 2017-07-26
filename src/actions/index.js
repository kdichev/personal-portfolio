export const increaseAction = {type: 'increase'};
export const decreaseAction = {type: 'decrease'};
export const resetAction = {type: 'reset'};
export const saveAction = {type: 'save'};
export const removeAction = {type: 'remove'};
export const FETCH_DATA = 'fetch';
export const LOAD_DATA = 'load';
export const UPDATE = 'update';

export function fetchData(payload) {
  return {
    type: FETCH_DATA,
    payload: payload,
  }
}

export function loadData(payload) {
  return {
    type: LOAD_DATA,
    payload: payload,
  }
}


export function updateStore(field, key, value) {
  return {
    type: UPDATE,
    payload: {
      field: field,
      key: key,
      value: value
    }
  }
}
