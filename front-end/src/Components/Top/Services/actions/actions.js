import API from '../../../../Services/API';

export function addStudentTopBySum() {
  return (API.get('statistic/tasks', 'STUDENT_TOP_BY_SUM', 'Не удалось получить топ по сумме'));
}

export function addStudentTopByActivity() {
  return (API.get('statistic/activities-top-rating', 'STUDENT_TOP_BY_ACTIVITY', 'Не удалсь получить топ по активности'));
}

export function addStudentTopByTests() {
  return (API.get('statistic/tests', 'STUDENT_TOP_BY_TESTS', 'Не удалсь получить топ по активности'));
}
