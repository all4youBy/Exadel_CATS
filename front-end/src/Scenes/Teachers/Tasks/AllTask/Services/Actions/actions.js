import API from '../../../../../../Services/API';

function fetchTasks() {
  return (API.get('task/tasks', 'all_tasks', 'Не удалось загрузить список задач'));
}

export default fetchTasks;
