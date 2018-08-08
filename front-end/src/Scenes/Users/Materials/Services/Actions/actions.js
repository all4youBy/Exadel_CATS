import API from '../../../../../Services/API';

export const getTopcisForMaterials = () => (
  (API.get('topics', 'TOPICS_MATERIALS', 'Не удалось получить темы'))
);

export const getMaterials = () => (
  (API.get('materials', 'ALL_MATERIALS', 'Не удалось получить материалы'))
);
