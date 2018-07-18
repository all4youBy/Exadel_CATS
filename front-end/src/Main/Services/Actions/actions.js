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
