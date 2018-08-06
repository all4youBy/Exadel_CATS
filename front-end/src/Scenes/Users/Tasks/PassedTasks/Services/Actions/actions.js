import API from '../../../../../../Services/API';

function fetchPassedTasks(userId) {
  return (API.get(
    `task/users-finished-tasks/${userId}`,
    'user_passed_tasks',
    'Не удалось загрузить список задач',
  ));
}

export default fetchPassedTasks;
