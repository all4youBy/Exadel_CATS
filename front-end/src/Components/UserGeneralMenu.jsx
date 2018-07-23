import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './UserGeneralMenu.scss';

const { SubMenu } = Menu;

class UserGeneralMenu extends React.PureComponent {
  render() {
    const data = [{
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
        text: 'Пройденные задачи',
        link: '/passedtasks',
      }, {
        id: '3',
        text: 'Назначенные задачи',
        link: '/assignedtasks',
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
        link: '/passedtasks',
      }],
    }, {
      key: '7',
      type: 'folder',
      text: 'Материалы',
      subsections: [],
      link: '/materials',
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

export default UserGeneralMenu;
