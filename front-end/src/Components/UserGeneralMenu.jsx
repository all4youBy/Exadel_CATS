import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as types from '../Services/types';
import './UserGeneralMenu.scss';

const { SubMenu } = Menu;

class UserGeneralMenu extends React.PureComponent {
  render() {
    const menu = types.USER_GENERAL_MENU_DATA.map((element) => {
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
