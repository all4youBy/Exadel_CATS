import * as types from '../Actions/types';

const initialState = [
  {
    email: 'pupa@gmail.com',
    theFirstName: 'Вася',
    theSecondName: 'Пупкин',
    institution: 'БГУ',
    faculty: 'ФПМИ',
    yearTermination: 2020,
    primarySkill: '',
  },
];

const registrationStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTRATION_OF_STUDENT: {
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

export default registrationStudentReducer;
