import * as types from './types';

export default function ifLoggedIn() {
  return {
    type: types.IS_LOGGED_IN,
  };
}
