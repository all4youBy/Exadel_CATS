import API from '../../../../../Services/API';

export function postUploadFiles(data, id) {
  return (API.postUploadFiles(`task/add-solution/${id}`, data, 'post_upload_files', 'Не удалось загрузить файлы'));
}

export function fetchTaskInformation(usersLogin, taskId) {
  return (API.get(
    `task/users-task/${usersLogin}/${taskId}`,
    'user_task_information',
    'Не удалось загрузить задачу',
  ));
}

export function postAddSolution(data, id) {
  return (API.post(`task/compile-solution/${id}`, data, 'post_add_task_solution', 'Не удалось загрузить файлы'));
}
