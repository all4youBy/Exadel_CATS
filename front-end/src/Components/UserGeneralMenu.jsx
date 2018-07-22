import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

class UserGeneralMenu extends React.PureComponent {
  render() {
    return (
      <Menu
        mode="inline"
      >
        <Menu.Item key="1">
          <Icon type="user" />
          <span>Личный кабинет</span>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="file" /><span>Задачи</span></span>}>
          <Menu.Item key="2">Пройденные задачи</Menu.Item>
          <Menu.Item key="3">Назначенные задачи</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="profile" /><span>Тесты</span></span>}>
          <Menu.Item key="4"><Link to="/assignedtestlist">Назначенные тесты</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/passedtestlist">Пройденные тесты</Link></Menu.Item>
          <Menu.Item key="6">Пробные тесты</Menu.Item>
        </SubMenu>
        <Menu.Item key="7">
          <Icon type="folder" />
          <span>Все материалы</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default UserGeneralMenu;
