import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as types from '../Services/types';
import './GeneralMenu.scss';
// import loginInformation from '../Services/loginService';

const { SubMenu } = Menu;

class GeneralMenu extends React.PureComponent {
  static propTypes = {
    userType: PropTypes.string.isRequired,
  };

  render() {
    let data;
    const { userType } = this.props;
    switch (userType) {
      case 'STUDENT': {
        data = types.USER_GENERAL_MENU_DATA;
        break;
      }
      case 'TEACHER': {
        data = types.TEACHER_GENERAL_MENU_DATA;
        break;
      }
      case 'ADMIN': {
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
