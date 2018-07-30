import * as types from '../Actions/types';
import { RECEIVE_LOGINDATA } from '../../../../../LogIn/Services/Actions/types';

const initialState = {
  group: [{
    key: '1',
    number: '1',
    name: 'Пупкин Василий Иванович',
    test1: 'Тест 1',
    test2: 'Тест 2',
    countTasks: '1',
    countTests: '1',
  }, {
    key: '2',
    number: '2',
    name: 'Быков Иван Николаевич',
    test1: 'Тест 1',
    test2: 'Тест 2',
    countTasks: '2',
    countTests: '2',
  }, {
    key: '3',
    number: '3',
    name: 'Вишняков Василий Петрович',
    test1: 'Тест 1',
    test2: 'Тест 2',
    countTasks: '3',
    countTests: '3',
  },
  ],
};

const groupStudentsList = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_STUDENT: {
      const lastNumber = state.group.length ? +state.group[state.group.length - 1].number + 1 : 1;
      const lastKey = state.group.length ? +state.group[state.group.length - 1].key + 1 : 1;
      action.payload.number = String(lastNumber);
      action.payload.name += lastKey;
      action.payload.key = String(lastKey);
      // const newStudent = { ...action.payload };
      // console.log(state.group, 858585858);
      // const newState = state.group.push(action.payload);
      // newState.push(newStudent);
      const students = [...state.group];
      students.push(action.payload);
      const newState = { group: students };
      return newState;
    }

    case types.DELETE_STUDENT: {
      let students = [...state.group];
      const idRemove = action.payload;
      students = students.filter(e => e.number !== idRemove);
      students.forEach((element, index) => {
        element.number = String(index + 1);
      });
      return { group: students };
    }
    case RECEIVE_LOGINDATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default groupStudentsList;
