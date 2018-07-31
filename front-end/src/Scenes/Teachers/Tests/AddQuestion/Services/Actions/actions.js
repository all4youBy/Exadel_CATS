import { ADD_QUESTION_TAG, DELETE_QUESTION_TAG } from './type';

import API from '../../../../../../Services/API';

export function addQuestionTag(tag) {
  return {
    type: ADD_QUESTION_TAG,
    payload: tag[tag.length - 1],
  };
}

export function deleteQuestionTag(tag) {
  return {
    type: DELETE_QUESTION_TAG,
    payload: tag,
  };
}

export function dataQuestion(url, data) {
  console.log(data);
  return API.post(url, data, 'addQuestion');
}
