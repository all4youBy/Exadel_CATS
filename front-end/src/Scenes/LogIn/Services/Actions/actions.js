export function logIn(name, key) {
  return {
    type: 'LOG_IN',
    username: name,
    password: key,
  };
}

export function logOut(name, key) {
  return {
    type: 'LOG_OUT',
    username: name,
    password: key,
  };
}

export function getData(items) {
  return {
    type: 'FETCH_DATA',
    data: items,
  };
}
export function requestPosts(data) {
  return {
    type: 'REQUEST_POSTS',
    data,
  };
}
