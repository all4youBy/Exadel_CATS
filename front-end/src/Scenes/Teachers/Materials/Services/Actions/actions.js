import API from '../../../../../Services/API';

export function getTopicsMaterials() {
  return (API.get('topics', 'topics_materials', 'Не удалось загрузить список задач'));
}

export function getMaterialInfo(id) {
  console.log(id, 8989);
  const link = 'materials';
  return (API.get(link, 'materials', 'Не удалось загрузить список задач'));
}
