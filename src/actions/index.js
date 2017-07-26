export const increaseAction = {type: 'increase'};
export const decreaseAction = {type: 'decrease'};
export const resetAction = {type: 'reset'};
export const saveAction = {type: 'save'};
export const removeAction = {type: 'remove'};
export const FETCH_DATA = 'fetch';

export function fetchData(payload) {
  return {
    type: FETCH_DATA,
    payload: payload,
  }
}
