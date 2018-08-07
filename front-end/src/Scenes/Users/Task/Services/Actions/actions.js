import { message } from 'antd';
import API from '../../../../../Services/API';
import { history } from '../../../../../Services/ConfigureStore';

// import { history } from '../../../../../Services/ConfigureStore';

export function postUploadFiles(data, id) {
  return (API.postUploadFiles(`task/add-solution/${id}`, data, 'post_upload_files'));
}

export function fetchTaskInformation(usersLogin, taskId) {
  return (API.get(
    `task/users-task/${usersLogin}/${taskId}`,
    'user_task_information',
    'Не удалось загрузить задачу',
  ));
}

export function postAddSolution(data, id) {
  return (API.post(`task/compile-solution/${id}`, data, ['post_add_task_solution', () => {
    message.success('Ваше решение получено');
    history.push('/assignedtasks');
  }, () => {
    message.error('Не удалось отправить решение');
  }]));
}


export function deleteTaskSolution(id) {
  return (API.deleteRequest(`task/delete-solution/${id}`, {}, 'delete_task_solution', 'Не удалось удалить файлы'));
}
