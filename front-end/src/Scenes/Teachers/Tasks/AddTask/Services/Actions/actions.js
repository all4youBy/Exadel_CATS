import * as types from './types';

export function addInOutSet() {
  return {
    type: types.ADD_IN_OUT_SET,
  };
}

export function addTaskTag(tag) {
  return {
    type: types.ADD_TASK_TAG,
    payload: tag[tag.length - 1],
  };
}

export function deleteTaskTag(tag) {
  return {
    type: types.DELETE_TASK_TAG,
    payload: tag,
  };
}
