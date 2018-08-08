import * as types from '../Actions/types';

const initialState = [];

const institutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_INSTITUTIONS: {
      const institutionsWithID = action.payload.map((university, index) => ({
        name: university,
        id: index,
      }));
      return institutionsWithID;
    }

    default: {
      return state;
    }
  }
};

export default institutionsReducer;
