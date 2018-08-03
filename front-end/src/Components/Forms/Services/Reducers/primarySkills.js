import * as types from '../Actions/types';

const initialState = ['Java', 'C++', 'JavaScript', 'Фортран'];

const primarySkillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_PRIMARY_SKILLS: {
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

export default primarySkillsReducer;
