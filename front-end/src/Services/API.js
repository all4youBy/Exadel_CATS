import { errorProject, isLoading, getData } from '../Main/Services/Actions/actions';
import { getUserData } from '../Scenes/LogIn/Services/Actions/actions';
import store from './ConfigureStore';

const API = {
  getTokenFromStore() {
    console.log(store.getState());
    return store.getState().logInInformation.user.token;
  },
  sendRequest(url, reqInit) {
    const headers = reqInit.headers ? reqInit.headers : new Headers();
    headers.append('Authorization', `Bearer ${API.getTokenFromStore()}`);
    headers.append('Content-Type', 'application/json');
    reqInit.headers = headers;
    reqInit.mode = 'cors';
    return fetch(new Request(url, reqInit));
  },
  login(path, data) {
    const url = `https://exadelcats.herokuapp.com/${path}`;
    return (dispatch) => {
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.text())
        .then((response) => {
          localStorage.setItem('user', response);
          dispatch(getUserData(response));
        })
        .catch(error => console.error('Fetch Error =\n', error));
    };
  },
  post(path, data, receiveAction) {
    const url = `https://exadelcats.herokuapp.com/${path}`;
    return (dispatch) => {
      dispatch(isLoading(true));
      API.sendRequest(url, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(items => dispatch(getData(receiveAction, items)))
        .catch(error => console.error('Fetch Error =\n', error));
    };
  },
  get(path, receiveAction) {
    const url = `https://exadelcats.herokuapp.com/${path}`;
    return (dispatch) => {
      dispatch(isLoading(true));
      API.sendRequest(url, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          // dispatch(isLoading(false));
          return response;
        })
        .then(response => response.json())
        .then(items => dispatch(getData(receiveAction, items)))
        .catch(() => dispatch(errorProject(true)));
    };
  },
};

export default API;
