import * as types from '../Actions/types';

const initialState = [
  {
    name: 'БГУ',
    id: 0,
  },
  {
    name: 'БГУИР',
    id: 1,
  },
  {
    name: 'БНТУ',
    id: 2,
  },
];

const institutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_INSTITUTIONS: {
      return [
        ...state,
        action.payload,
      ];
    }

    default: {
      return state;
    }
  }
};

export default institutionsReducer;
