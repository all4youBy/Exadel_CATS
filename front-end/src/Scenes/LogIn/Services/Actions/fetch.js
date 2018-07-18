import { errorProject, isLoading } from '../../../../Main/Services/Actions/actions';
import { getData } from './actions';

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(isLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(items => dispatch(getData(items)))
      .catch(() => dispatch(errorProject(true)));
  };
}
export function getFetchData() {
  return (dispatch) => {
    dispatch(isLoading(true));
    fetch('/http://example.com/movies.json')
      .then((response) => {
        console.log(response);
        alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
        alert(response.status); // 200

        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));

        return response.json();
      })
      .then(response => response.json())
      .then(items => dispatch(getData(items)))
      .catch(() => dispatch(errorProject(true)));
  };
}

export function receivePosts(name, key, json) {
  return {
    type: 'LOG_IN',
    username: name,
    password: key,
    data: { name, key },
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}
