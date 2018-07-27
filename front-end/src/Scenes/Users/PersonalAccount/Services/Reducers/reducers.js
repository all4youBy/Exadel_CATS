import * as types from '../Actions/types';

const initialState = [{
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
];

const studentsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.ADD_STUDENT: {
      const lastId = state.length ? state[state.length - 1].key + 1 : 1;
      const newStudent = { ...action.payload, ...{ key: lastId } };
      const newState = [...state];
      newState.push(newStudent);
      return newState;
    }

    case types.DELETE_STUDENT: {
      const idRemove = action.payload.key;
      return state.filter(e => e.key !== idRemove);
    }
    default:
      return state;
  }
};

export default studentsReducer;
