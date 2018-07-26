// import * as types from '../../../../Tasks/AddTask/Services/Actions/types';

export function addQuestionTag(tag) {
  return {
    type: 'ADD_QUESTION_TAG',
    payload: tag[tag.length - 1],
  };
}

export function deleteQuestionTag(tag) {
  return {
    type: 'DELETE_QUESTION_TAG',
    payload: tag,
  };
}
export function getLevelQuestion(level) {
  return {
    type: 'ADD_QUESTION_LEVEL',
    payload: level,
  };
}
export function getTypeQuestion(type) {
  return {
    type: 'ADD_QUESTION_TYPE',
    payload: type,
  };
}
export function getQuestion(text) {
  return {
    type: 'ADD_QUESTION',
    payload: text,
  };
}
export function addAnswer() {
  return {
    type: 'ADD_ANSWER',
  };
}
