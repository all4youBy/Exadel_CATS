import API from '../../../../../Services/API';

export function fetchGroupsListForTest() {
  return (API.get('users/groups', 'groups_list_for_test', 'Не удалось загрузить список групп'));
}

export function postUploadFiles(data) {
  return (API.postUploadFiles('users', data, 'post_upload_files', 'Не удалось загрузить файлы'));
}
