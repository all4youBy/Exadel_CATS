import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

class AdminGeneralMenu extends React.PureComponent {
  render() {
    const data = [{
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
    const menu = data.map((element) => {
      if (element.subsections.length === 0) {
        return (
          <Menu.Item key={element.key}>
            <Icon type={element.type}/>
            <span><Link className="menu-link" to={element.link}>{element.text}</Link></span>
          </Menu.Item>
        );
      }
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
        mode="inline"
      >
        {menu}
      </Menu>
    );
  }
}

export default AdminGeneralMenu;
