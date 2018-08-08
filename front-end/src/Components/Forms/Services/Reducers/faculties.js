import * as types from '../Actions/types';

const initialState = {
  0: [
    'Факультет прикладной математики и информатики',
    'Физический факультет',
    'Филфак',
    'Механико-математический факультет',
  ],
  1: ['Информатика', 'КСиС'],
  2: ['Архитектор'],
};

const facultiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_FACULTIES: {
      const facultiesWithId = {};
      action.payload.map((element, index) => {
        facultiesWithId[index] = element.faculties;
        return facultiesWithId[index];
      });
      return facultiesWithId;
    }

    default: {
      return state;
    }
  }
};

export default facultiesReducer;
