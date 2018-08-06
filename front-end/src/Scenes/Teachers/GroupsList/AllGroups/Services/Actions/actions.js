import API from '../../../../../../Services/API';

export function deleteGroup(data) {
  return (API.deleteRequest('users/groups', data, 'deleteGroup', 'Не удалось удалить группу'));
}

export function getAllGroups() {
  return (API.get('users/groups', 'all_groups_list', 'Не удалось загрузить список групп'));
  // return (API.get('users/groups', 'groupsList', 'Не удалось загрузить список групп'));
}
