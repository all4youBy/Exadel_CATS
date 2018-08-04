import { message } from 'antd';
import * as types from './types';
import { history } from '../../../../../../Services/ConfigureStore';
import API from '../../../../../../Services/API';

export function createTask(data, url) {
  return API.post(`task${url}`, data, ['create_task', () => {
    message.success('Задача успешно назначена');
    if (url !== '') {
      history.push('/allgroups');
    }
  }, () => {
    message.error('Не удалось назначить задачу');
  }]);
}

export function addTaskTag(tag) {
  return {
    type: types.ADD_ASSIGN_TASK_TAG,
    payload: tag,
  };
}

export function deleteTaskTag(tag) {
  return {
    type: types.DELETE_ASSIGN_TASK_TAG,
    payload: tag,
  };
}

export function receiveTask(group, data) {
  return {
    type: types.RECEIVE_TASK,
    payload: group,
    typeData: data,
  };
}


export function fetchTopics() {
  return (API.get('topics', 'topics_assign_task', 'Не удалось загрузить темы'));
}
