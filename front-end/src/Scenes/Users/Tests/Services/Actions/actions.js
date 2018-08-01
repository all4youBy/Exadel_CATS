import API from '../../../../../Services/API';
import * as types from './types';

export function fetchTestData(testId) {
  return (API.get(`tests/${testId}`, 'test_Data', 'Не удалось загрузить данные теста'));
}

export function receiveTestData(data) {
  return {
    type: types.RECEIVE_TEST_DATA,
    payload: data,
  };
}
