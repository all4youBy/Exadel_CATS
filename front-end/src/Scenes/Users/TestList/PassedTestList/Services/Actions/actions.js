import API from '../../../../../../Services/API';

function fetchPassedTests(userId) {
  return (API.get(`tests/user-tests/${userId}`,
    'passed_tests',
    'Не удалось загрузить список назначенных тестов'));
}

export default fetchPassedTests;
