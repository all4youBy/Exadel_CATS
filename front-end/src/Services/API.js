import { errorProject, isLoading, getData } from '../Main/Services/Actions/actions';

const API = {
  post(path, data) {
    const url = `/cats/${path}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => console.error('Fetch Error =\n', error));
  },

  get(path, receiveAction) {
    const url = `localhost:3000/${path}`;
    console.log(url);
    return (dispatch) => {
      dispatch(isLoading(true));
      fetch('https://httpbin.org/ip')
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          // dispatch(isLoading(false));
          // console.log(response);
          return response;
        })
        .then(response => response.json())
        .then(items => dispatch(getData(receiveAction, items)))
        .catch(() => dispatch(errorProject(true)));
    };
  },
};

export default API;
