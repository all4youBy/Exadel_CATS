import API from '../../../../../../Services/API';

function fetchTaskInformation(taskId) {
  return (API.get(
    `task/${taskId}`,
    'view_user_task_information',
    'Не удалось загрузить задачу',
  ));
}

export default fetchTaskInformation;
