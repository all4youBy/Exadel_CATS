import { message } from 'antd/lib/index';
import * as types from './types';
import API from '../../../../../../Services/API';
import { history } from '../../../../../../Services/ConfigureStore';

export function fetchTrainingTest(data) {
  return (API.post('tests/training', data, ['post_training_test', (id) => {
    history.push(`test/:${id}`);
  }, () => {
    message.error('Не удалось создать тест');
  }], 'Не удалось создать тест'));
}

export function addTopic(tag) {
  return {
    type: types.ADD_TRAINING_TOPIC,
    payload: tag,
  };
}
