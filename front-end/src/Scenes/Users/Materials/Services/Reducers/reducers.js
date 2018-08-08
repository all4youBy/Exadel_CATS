import * as types from '../Actions/types';

const initialState = {
  allMaterials: [],
  topics: [],
};

const reducerForMaterials = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ALL_MATERIALS: {
      return {
        ...state,
        allMaterials: action.payload,
      };
    }

    case types.RECEIVE_TOPICS_MATERIALS: {
      return {
        ...state,
        topics: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducerForMaterials;
