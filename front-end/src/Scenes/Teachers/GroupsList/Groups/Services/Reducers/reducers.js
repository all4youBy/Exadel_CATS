import * as types from '../Actions/types';
import { RECEIVE_LOGINDATA } from '../../../../../LogIn/Services/Actions/types';

const initialState = {
  groups: [],
};

const allGroups = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_GROUP: {
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

    case types.EDIT_GROUP: {
      const lastNumber = state.groups.length ? +state.groups[state.groups.length - 1].key + 1 : 1;
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

    case RECEIVE_LOGINDATA:
      return { ...state, groups: action.payload };

    case types.DELETE_GROUP: {
      let students = [...state.groups];
      const idRemove = action.payload;
      students = students.filter(e => e.key !== idRemove);
      students.forEach((element, index) => {
        element.key = String(index + 1);
      });
      return { groups: students };
    }
    default:
      return state;
  }
};

export default allGroups;
