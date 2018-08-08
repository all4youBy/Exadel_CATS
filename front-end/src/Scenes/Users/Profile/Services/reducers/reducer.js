import * as types from '../actions/types';

const initialState = {};

const profileInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_GET_USER_FOR_PROFILE: {
      return action.payload;
    }

    case types.RECEIVE_EDIT_USER: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export default profileInformationReducer;
