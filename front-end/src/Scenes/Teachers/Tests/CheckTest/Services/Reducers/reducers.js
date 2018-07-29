import * as types from '../Actions/types';

const initialState = {
  tags: [],
};

const testInformation = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.ADD_TEST_TAG: {
      if (state.tags.includes(action.payload) || action.payload.length === 0) {
        return state;
      }
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload,
        ],
      };
    }
    case types.DELETE_TEST_TAG: {
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export default testInformation;
