import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class GeneralMenuStudent extends React.PureComponent {
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
          <Menu.Item key="4">Все задачи</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="profile" /><span>Тесты</span></span>}>
          <Menu.Item key="5">Назначенные тесты</Menu.Item>
          <Menu.Item key="6">Пройденные тесты</Menu.Item>
          <Menu.Item key="7">Пробные тесты</Menu.Item>
        </SubMenu>
        <Menu.Item key="7">
          <Icon type="folder" />
          <span>Все материалы</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default GeneralMenuStudent;
