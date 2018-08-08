import { LOADING, PAGE_ERROR } from './types';

export function isLoading(bool) {
  return {
    type: LOADING,
    loading: bool,
  };
}

export function getError(bool) {
  return {
    type: PAGE_ERROR,
    payload: bool,
  };
}

export function getData(action, items) {
  if (Array.isArray(action) && action.length > 1) {
    action[1](items);
    return {
      type: `RECEIVE_${action[0].toUpperCase()}`,
      payload: items,
    };
  }
  return {
    type: `RECEIVE_${action.toUpperCase()}`,
    payload: items,
  };
}

export function errorProject(action, errorMessage) {
  if (Array.isArray(action) && action.length > 2) {
    action[2]();
    return {
      type: `ERROR_${action[0].toUpperCase()}`,
      payload: errorMessage,
    };
  }
  return {
    type: `ERROR_${action.toUpperCase()}`,
    payload: errorMessage,
  };
}
