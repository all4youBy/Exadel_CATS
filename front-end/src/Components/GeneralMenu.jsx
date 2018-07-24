import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as types from '../Services/types';
import './GeneralMenu.scss';

const { SubMenu } = Menu;

const user = {
  status: 'teacher',
};

class GeneralMenu extends React.PureComponent {
  render() {
    let data;
    switch (user.status) {
      case 'student': {
        data = types.USER_GENERAL_MENU_DATA;
        break;
      }
      case 'teacher': {
        data = types.TEACHER_GENERAL_MENU_DATA;
        break;
      }
      case 'admin': {
        data = types.ADMIN_GENERAL_MENU_DATA;
        break;
      }
      default:
        data = types.USER_GENERAL_MENU_DATA;
    }
    const menu = data.map((element) => {
      if (element.subsections.length === 0) {
        return (
          <Menu.Item key={element.key}>
            <Icon type={element.type}/>
            <span><Link className="menu-link" to={element.link}>{element.text}</Link></span>
          </Menu.Item>
        );
      }
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


export default GeneralMenu;
