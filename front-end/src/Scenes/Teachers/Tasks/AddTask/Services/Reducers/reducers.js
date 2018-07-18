import * as types from '../Actions/types';

const initialState = {
  testSet: [],
};

const inOutSet = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_IN_OUT_SET: {
      return {
        ...state,
        testSet: [
          ...state.testSet,
          {
            in: '',
            out: '',
          },
        ],
      };
    }
    default:
      return state;
  }
};



export default inOutSet;
