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
  switch (action.type) {
    case types.ADD_STUDENT: {
      const lastId = state.length ? +state[state.length - 1].number + 1 : 1;
      action.payload.number = String(lastId);
      action.payload.name += lastId;
      action.payload.key = String(lastId);
      const newStudent = { ...action.payload };
      const newState = [...state];
      newState.push(newStudent);
      return newState;
    }

    case types.DELETE_STUDENT: {
      let newState = [...state];
      const idRemove = action.payload;
      newState = newState.filter(e => e.number !== idRemove);
      newState.forEach((element, index) => {
        element.number = String(index + 1);
      });
      return newState;
    }
    default:
      return state;
  }
};

export default studentsReducer;
