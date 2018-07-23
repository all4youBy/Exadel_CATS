import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

class TeacherGeneralMenu extends React.PureComponent {
  render() {
    const data = [{
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
        id: '4',
        text: 'Мои задачи',
        link: '/',
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
    const menu = data.map((element) => {
      const subsections = element.subsections.map((item) => {
        const link = <Link to={item.link}>{item.text}</Link>;
        const content = <Menu.Item key={item.id}>{link}</Menu.Item>;
        return content;
      });
      const title = <span><Icon type={element.type}/><span>{element.text}</span></span>;
      return (
        <SubMenu key={element.key} title={title}>
          {subsections}
        </SubMenu>
      );
    });
    return (
      <Menu
        style={{ width: 256 }}
        mode="inline"
      >
        {menu}
      </Menu>
    );
  }
}

export default TeacherGeneralMenu;
