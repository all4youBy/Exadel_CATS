export function errorProject(bool) {
  return {
    type: 'ERROR',
    error: bool,
  };
}

export function isLoading(bool) {
  return {
    type: 'LOADING',
    loading: bool,
  };
}

export function getData(actionName, items) {
  return {
    type: `RECEIVE_${actionName.toUpperCase()}`,
    data: items,
  };
}
