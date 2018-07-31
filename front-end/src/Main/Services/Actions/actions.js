import { LOADING } from './types';

export function isLoading(bool) {
  return {
    type: LOADING,
    loading: bool,
  };
}

export function getData(actionName, items) {
  return {
    type: `RECEIVE_${actionName.toUpperCase()}`,
    payload: items,
  };
}

export function errorProject(actionName, errorMessage) {
  return {
    type: `ERROR_${actionName.toUpperCase()}`,
    payload: errorMessage,
  };
}
