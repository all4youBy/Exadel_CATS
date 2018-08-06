import API from '../../../../../../Services/API';

function fetchQuestions() {
  return (API.get('questions', 'all_questions', 'Не удалось загрузить список вопросов'));
}

export default fetchQuestions;
