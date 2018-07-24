import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as types from '../Services/types';

const { SubMenu } = Menu;

class AdminGeneralMenu extends React.PureComponent {
  render() {
    const menu = types.ADMIN_GENERAL_MENU_DATA.map((element) => {
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
        </SubMenu>);
    });
    return <Menu mode="inline">{menu}</Menu>;
  }
}

export default AdminGeneralMenu;
