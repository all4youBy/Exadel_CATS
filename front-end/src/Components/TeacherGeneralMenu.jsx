import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as types from '../Services/types';

const { SubMenu } = Menu;

class TeacherGeneralMenu extends React.PureComponent {
  render() {
    const menu = types.TEACHER_GENERAL_MENU_DATA.map((element) => {
      const subsections = element.subsections.map(item => (
        <Menu.Item key={item.id}>
          <Link to={item.link}>{item.text}</Link>
        </Menu.Item>
      ));
      const title = <span><Icon type={element.type}/><span>{element.text}</span></span>;
      return (
        <SubMenu key={element.key} title={title}>
          {subsections}
        </SubMenu>
      );
    });
    return <Menu mode="inline">{menu}</Menu>;
  }
}

export default TeacherGeneralMenu;
