import API from '../../../../../../Services/API';

export function fetchTasks3() {
  return (API.get('task/tasks', 'tasks', 'Не удалось загрузить список групп'));
}

export function fetchTasks() {
  return (API.get('task/tasks', 'tasks', 'Не удалось загрузить список задач'));
}
