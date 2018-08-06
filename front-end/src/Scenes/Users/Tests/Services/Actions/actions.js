import { message } from 'antd/lib/index';
import API from '../../../../../Services/API';
import { history } from '../../../../../Services/ConfigureStore';

export function fetchTestData(testId) {
  return (API.get(`tests/${testId}`, 'test_Data', 'Не удалось загрузить данные теста'));
}

export function postTestAnswer(data) {
  return (API.post('tests/submit-question', data, 'post_test_answer', 'Не удалось отправить вопрос'));
}

export function postTest(testId) {
  return (API.post('tests/submit-test', testId, ['post_test', (item) => {
    if (!Number.isNaN(parseInt(item.text, 10))) {
      message.success(`Тест пройден! Оценка ${item.text}`);
      history.push('/passedtestlist');
    } else {
      message.success('Тест пройден! Ожидайте проверки учителем.');
      history.push('/passedtestlist');
    }
  }, () => {
    message.error('Ошибка!');
  }], 'Не удалось отправить тест'));
}
