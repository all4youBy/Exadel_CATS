import API from '../../../../../Services/API';

function getAllActivity() {
  return API.get('statistic/activities', 'activity');
}

export default getAllActivity;
