import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;

class GeneralMenu extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }));

  render() {
    const { collapsed } = this.state;
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['0']}
          mode="inline"
          theme="white"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>Личный кабинет</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="file" /><span>Задачи</span></span>}>
            <Menu.Item key="2">Все задачи</Menu.Item>
            <Menu.Item key="3">Назначенные задачи</Menu.Item>
            <Menu.Item key="4">Добавить задачу</Menu.Item>
            <Menu.Item key="5">Ваши задачи</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="profile" /><span>Тесты</span></span>}>
            <Menu.Item key="6">Все тесты</Menu.Item>
            <Menu.Item key="7">Назначенные тесты</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="folder" /><span>Материалы</span></span>}>
            <Menu.Item key="8">Все материалы</Menu.Item>
            <Menu.Item key="9">Ваши материалы</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default GeneralMenu;
