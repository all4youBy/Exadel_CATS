import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class TeacherGeneralMenu extends React.PureComponent {
  render() {
    return (
      <Menu
        style={{ width: 256 }}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>Группы</span></span>}>
          <Menu.Item key="1">Все группы</Menu.Item>
          <Menu.Item key="2">Создать группу</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="file" /><span>Задачи</span></span>}>
          <Menu.Item key="3">Все задачи</Menu.Item>
          <Menu.Item key="4">Ваши задачи</Menu.Item>
          <Menu.Item key="5">Добавить задачу</Menu.Item>
          <Menu.Item key="6">Назначить задачу</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="profile" /><span>Тесты</span></span>}>
          <Menu.Item key="7">Все тесты</Menu.Item>
          <Menu.Item key="8">Назначить тест</Menu.Item>
          <Menu.Item key="9">Проверить тест</Menu.Item>
          <Menu.Item key="10">Добавить вопрос</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="folder" /><span>Материалы</span></span>}>
          <Menu.Item key="11">Все материалы</Menu.Item>
          <Menu.Item key="12">Ваши материалы</Menu.Item>
          <Menu.Item key="13">Добавить материал</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default TeacherGeneralMenu;
