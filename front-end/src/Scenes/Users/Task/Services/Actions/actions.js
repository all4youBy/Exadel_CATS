/* eslint-disable no-restricted-globals */
import { message } from 'antd';
import API from '../../../../../Services/API';
import { history } from '../../../../../Services/ConfigureStore';
import { CLEAR_RESPONSE_ADD_FILE } from './types';

export function postUploadFiles(data, id) {
  return (API.postUploadFiles(`task/add-solution/${id}`, data, ['post_upload_files', () => {
    message.success('Файл загружен');
  }, () => {
    message.error('Не удалось загрузить файл');
  }]));
}

export function fetchTaskInformation(usersLogin, taskId) {
  return (API.get(
    `task/users-task/${usersLogin}/${taskId}`,
    'user_task_information',
    'Не удалось загрузить задачу',
  ));
}

export function postAddSolution(data, id) {
  return (API.post(`task/compile-solution/${id}`, data, ['post_add_task_solution', (item) => {
    if (isNaN(+String(item.mark))) {
      message.success('Решение отправлено. Ваш исходник содежит ошибку.');
    } else {
      message.success(`Решение отправлено. Ваша отметка: ${item.mark}`);
    }
    history.push('/assignedtasks');
  }, () => {
    message.error('Не удалось отправить решение');
  }]));
}


export function deleteTaskSolution(id) {
  return (API.deleteRequest(`task/delete-solution/${id}`, {}, 'delete_task_solution', 'Не удалось удалить файлы'));
}

export function clearResponseAddFile() {
  return {
    type: CLEAR_RESPONSE_ADD_FILE,
  };
}
