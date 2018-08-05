import { message } from 'antd';
import * as types from './types';
import { history } from '../../../../../../Services/ConfigureStore';
import API from '../../../../../../Services/API';

export function createTask(data, url) {
  return API.post(`task${url}`, data, ['create_task', () => {
    message.success('Задача успешно назначена');
    if (url !== '') {
      history.push('/mygroups');
    }
  }, () => {
    message.error('Не удалось назначить задачу');
  }]);
}

export function receiveTask(group, data) {
  return {
    type: types.RECEIVE_TASK,
    payload: group,
    typeData: data,
  };
}

export function fetchTasksAssign() {
  return (API.get('task/tasks', 'all_tasks_assign', 'Не удалось загрузить список задач'));
}
