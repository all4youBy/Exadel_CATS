import * as types from '../Actions/types';

const initialState = {
  topics: [],
  error: false,
  material: [],
};

const materials = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_TOPICS_MATERIALS: {
      return {
        ...state,
        topics: [...action.payload],
      };
    }
    case types.RECEIVE_MATERIALS: {
      return {
        ...state,
        material: [...action.payload],
      };
    }

    case types.ERROR_TOPICS_MATERIALS: {
      return {
        ...state,
        error: [...action.payload],
      };
    }
    case types.ERROR_MATERIALS: {
      return {
        ...state,
        error: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default materials;
