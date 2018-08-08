import * as types from '../Actions/types';

const initialState = [];

const primarySkillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_PRIMARY_SKILLS: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default primarySkillsReducer;
