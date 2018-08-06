import API from '../../../../Services/API';

export function getPrimarySkills() {
  return API.get('primarySkills', 'PRIMARY_SKILLS', 'Не удалось загрузить primary skills');
}

export function getInstitutions() {
  return API.get('institutions', 'INSTITUTIONS', 'Не удалось загрузить университеты');
}

export function getFaculties() {
  return API.get('faculties', 'FACULTIES', 'Не удалось загрузить факультеты');
}
