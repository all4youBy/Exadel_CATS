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
    link: '/assignedtests',
  }, {
    id: '5',
    text: 'Пройденные тесты',
    link: '/passedtestlist',
  }, {
    id: '6',
    text: 'Пробные тесты',
    link: '/trainingtest',
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
    text: 'Мои группы',
    link: '/mygroups',
  }, {
    id: '2',
    text: 'Создать группу',
    link: '/creategroup',
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
    id: '4',
    text: 'Добавить задачу',
    link: '/addtask',
  }],
}, {
  key: 'sub3',
  type: 'profile',
  text: 'Тесты',
  subsections: [{
    id: '5',
    text: 'Проверить тесты',
    link: '/checktests',
  }, {
    id: '6',
    text: 'Все вопросы',
    link: '/questions',
  }, {
    id: '7',
    text: 'Добавить вопрос',
    link: '/addquestion',
  }],
}, {
  key: 'sub4',
  type: 'folder',
  text: 'Материалы',
  subsections: [{
    id: '8',
    text: 'Все материалы',
    link: '/materials',
  }, {
    id: '9',
    text: 'Мои материалы',
    link: '/materials',
  }, {
    id: '10',
    text: 'Добавить материал',
    link: '/',
  }],
}];

export const ADMIN_GENERAL_MENU_DATA = [{
  key: '1',
  type: 'user-add',
  text: 'Список запросов',
  subsections: [],
  link: '/accessrequestlist',
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
    text: 'Mои группы',
    link: '/mygroups',
  }, {
    id: '4',
    text: 'Создать группу',
    link: '/creategroup',
  }],
}, {
  key: 'sub2',
  type: 'file',
  text: 'Задачи',
  subsections: [{
    id: '5',
    text: 'Все задачи',
    link: '/alltasks',
  }, {
    id: '6',
    text: 'Добавить задачу',
    link: '/addtask',
  }],
}, {
  key: 'sub3',
  type: 'profile',
  text: 'Тесты',
  subsections: [
    {
      id: '7',
      text: 'Проверить тесты',
      link: '/checktests',
    }, {
      id: '8',
      text: 'Все вопросы',
      link: '/questions',
    }, {
      id: '9',
      text: 'Добавить вопрос',
      link: '/addquestion',
    }],
}, {
  key: '10',
  type: 'folder',
  text: 'Материалы',
  subsections: [],
  link: '/materials',
}, {
  key: 'sub4',
  type: 'area-chart',
  text: 'Статистика',
  subsections: [{
    id: '11',
    text: 'Задачи',
    link: '/',
  }, {
    id: '12',
    text: 'Тесты',
    link: '/',
  }],
}, {
  key: '13',
  type: 'clock-circle-o',
  text: 'История',
  subsections: [],
  link: '/',
}];
