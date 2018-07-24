export const USER_GENERAL_MENU_DATA = [{
  key: '1',
  type: 'user',
  text: 'Личный кабинет',
  subsections: [],
  link: '/',
}, {
  key: 'sub1',
  type: 'file',
  text: 'Задачи',
  subsections: [{
    id: '2',
    text: 'Назначенные задачи',
    link: '/assignedtasks',
  }, {
    id: '3',
    text: 'Пройденные задачи',
    link: '/passedtasks',
  }],
}, {
  key: 'sub2',
  type: 'profile',
  text: 'Тесты',
  subsections: [{
    id: '4',
    text: 'Назначенные тесты',
    link: '/assignedtestlist',
  }, {
    id: '5',
    text: 'Пройденные тесты',
    link: '/passedtestlist',
  }, {
    id: '6',
    text: 'Пробные тесты',
    link: '/assignedtestlist',
  }],
}, {
  key: '7',
  type: 'folder',
  text: 'Материалы',
  subsections: [],
  link: '/materials',
}];

export const TEACHER_GENERAL_MENU_DATA = [{
  key: 'sub1',
  type: 'team',
  text: 'Группы',
  subsections: [{
    id: '1',
    text: 'Все группы',
    link: '/allgroups',
  }, {
    id: '2',
    text: 'Создать группу',
    link: '/',
  }],
}, {
  key: 'sub2',
  type: 'file',
  text: 'Задачи',
  subsections: [{
    id: '3',
    text: 'Все задачи',
    link: '/alltasks',
  }, {
    id: '5',
    text: 'Добавить задачу',
    link: '/',
  }],
}, {
  key: 'sub3',
  type: 'profile',
  text: 'Тесты',
  subsections: [{
    id: '6',
    text: 'Все тесты',
    link: '/alltests',
  }, {
    id: '7',
    text: 'Назначить тест',
    link: '/assignedtestlist',
  }, {
    id: '8',
    text: 'Проверить тест',
    link: '/',
  }, {
    id: '9',
    text: 'Добавить вопрос',
    link: '/',
  }],
}, {
  key: 'sub4',
  type: 'folder',
  text: 'Материалы',
  subsections: [{
    id: '10',
    text: 'Все материалы',
    link: '/materials',
  }, {
    id: '11',
    text: 'Мои материалы',
    link: '/materials',
  }, {
    id: '12',
    text: 'Добавить материал',
    link: '/',
  }],
}];

export const ADMIN_GENERAL_MENU_DATA = [{
  key: '1',
  type: 'user-add',
  text: 'Список запросов',
  subsections: [],
  link: '/',
}, {
  key: 'sub1',
  type: 'team',
  text: 'Группы',
  subsections: [{
    id: '2',
    text: 'Все группы',
    link: '/allgroups',
  }, {
    id: '3',
    text: 'Создать группу',
    link: '/',
  }],
}, {
  key: 'sub2',
  type: 'file',
  text: 'Задачи',
  subsections: [{
    id: '4',
    text: 'Все задачи',
    link: '/alltasks',
  }, {
    id: '5',
    text: 'Мои задачи',
    link: '/',
  }, {
    id: '6',
    text: 'Назначить задачу',
    link: '/',
  }, {
    id: '7',
    text: 'Добавить задачу',
    link: '/',
  }],
}, {
  key: 'sub3',
  type: 'profile',
  text: 'Тесты',
  subsections: [{
    id: '8',
    text: 'Все тесты',
    link: '/assignedtestlist',
  }, {
    id: '9',
    text: 'Мои тесты',
    link: '/passedtestlist',
  }, {
    id: '10',
    text: 'Назначить тесты',
    link: '/passedtasks',
  }, {
    id: '11',
    text: 'Добавить тесты',
    link: '/assignedtestlist',
  }],
}, {
  key: '12',
  type: 'folder',
  text: 'Материалы',
  subsections: [],
  link: '/materials',
}, {
  key: 'sub4',
  type: 'area-chart',
  text: 'Статистика',
  subsections: [{
    id: '13',
    text: 'Задачи',
    link: '/',
  }, {
    id: '14',
    text: 'Тесты',
    link: '/',
  }],
}, {
  key: '15',
  type: 'clock-circle-o',
  text: 'История',
  subsections: [],
  link: '/',
}];
