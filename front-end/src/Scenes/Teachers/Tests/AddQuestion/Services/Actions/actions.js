import { message } from 'antd';
import { history } from '../../../../../../Services/ConfigureStore';
import { ADD_QUESTION_TAG, DELETE_QUESTION_TAG } from './type';
import API from '../../../../../../Services/API';


export function addQuestionTag(tag) {
  return {
    type: ADD_QUESTION_TAG,
    payload: tag,
  };
}

export function deleteQuestionTag(tag) {
  return {
    type: DELETE_QUESTION_TAG,
    payload: tag,
  };
}

export function dataQuestion(url, data) {
  return API.post(url, data, ['addQuestion', () => {
    message.success('Вопрос успешно добавлен');
    history.push('/alltests');
  }, () => {
    message.error('Не удалось добавить вопрос');
  }]);
}

export function fetchTopics() {
  return (API.get('topics', 'topics_add_question', 'Не удалось загрузить темы'));
}
