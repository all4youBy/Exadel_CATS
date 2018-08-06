import API from '../../../../../../Services/API';

export function fetchGroupsListForTest() {
  return (API.get('users/groups', 'groups_list_for_test', 'Не удалось загрузить список групп'));
}

export function fetchAssignedTasks(userId) {
  return (API.get(
    `task/users-unfinished-tasks/${userId}`,
    'user_assigned_tasks',
    'Не удалось загрузить список задач',
  ));
}
