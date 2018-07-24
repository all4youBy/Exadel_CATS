import * as types from '../actions/types';

const initialState = {
  topBySum: [
    {
      name: 'fsadf adsfadsfasd',
      id: 1,
      score: 3,
    },
    {
      name: 'asfdas asdfasd',
      score: 4,
      id: 2,
    },
    {
      name: 'dadf asdfadsfa',
      score: 5,
      id: 3,
    },
  ],
  topByTask: [
    {
      name: 'fadfsfs',
      score: 3,
      id: 4,
    },
    {
      name: 'gasdfadsfasd',
      score: 4,
      id: 5,
    },
    {
      name: 'heheh',
      score: 5,
      id: 6,
    },
  ],
  topByActivity: [
    {
      name: 'fdsfsdaffs',
      score: 913,
      id: 4,
    },
    {
      name: 'gasdfadsfasd fasdfsa',
      score: 4,
      id: 5,
    },
    {
      name: 'hehadasdeh',
      score: 5,
      id: 6,
    },
  ],
};

const topReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_STUDENT_TOP_BY_SUM: {
      return {
        ...state,
        topBySum: [...state.topBySum, action.payload],
      };
    }
    case types.ADD_STUDENT_TOP_BY_TASK: {
      return {
        ...state,
        topByTask: [...state.topByTask, action.payload],
      };
    }
    case types.ADD_STUDENT_TOP_BY_ACTIVITY: {
      return {
        ...state,
        topByActivity: [...state.topByActivity, action.topByActivity],
      };
    }
    default: {
      return state;
    }
  }
};

export default topReducer;
