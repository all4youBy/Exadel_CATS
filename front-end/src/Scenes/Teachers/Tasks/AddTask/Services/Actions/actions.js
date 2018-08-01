import * as types from './types';
import API from '../../../../../../Services/API';

export function addInOutSet() {
  return {
    type: types.ADD_IN_OUT_SET,
  };
}

export function addTaskTag(tag) {
  return {
    type: types.ADD_TASK_TAG,
    payload: tag,
  };
}

export function deleteTaskTag(tag) {
  return {
    type: types.DELETE_TASK_TAG,
    payload: tag,
  };
}

export function fetchTopics() {
  return (API.get('topics', 'topics_add_task', 'Не удалось загрузить темы'));
}
