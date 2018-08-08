/* eslint-disable react/jsx-closing-tag-location,
spaced-comment,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as types from '../Services/types';
import './GeneralMenu.scss';
// import loginInformation from '../Services/loginService';
import { history } from '../Services/ConfigureStore';

const { SubMenu } = Menu;

class GeneralMenu extends React.PureComponent {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  render() {
    let data;
    const { userType, email } = this.props;
    switch (userType) {
      case 'STUDENT': {
        data = types.USER_GENERAL_MENU_DATA;
        data[0].link = `/profile/${email}`;
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
      const onClickBadgeTests = () => {
      };
      const onClickBadgeAnswer = () => {
        document.getElementById('badge-test').classList.add('hide');
        document.getElementById('badge-answer').classList.add('hide');
        localStorage.setItem('checkTests', '0');
      };
      const subsections = (element.subsections.map((item) => {
        if ((item.text === 'Проверить тесты' && history.location.pathname !== '/checktests') && JSON.parse(localStorage.getItem('checkTests'))) {
          return (
            <Menu.Item
              onClick={() => onClickBadgeAnswer()}
              key={item.id}
            ><Badge id="badge-answer" className="badge-answer" count={JSON.parse(localStorage.getItem('checkTests'))}/><Link
              to={item.link}
            >{item.text}</Link></Menu.Item>);
        }
        return (
          <Menu.Item key={item.id}>
            <Link to={item.link}>{item.text}</Link>
          </Menu.Item>);
      }));
      const title = (JSON.parse(localStorage.getItem('checkTests')) && userType !== 'STUDENT' && element.text === 'Тесты' && history.location.pathname !== '/checktests') ? (
        <div role="button" onClick={() => onClickBadgeTests()}>
          <span><Icon type={element.type}/><Badge
            id="badge-test"
            className="badge-test"
            count={JSON.parse(localStorage.getItem('checkTests'))}
          /><span>{element.text}</span></span>
        </div>
      ) : <span><Icon type={element.type}/><span>{element.text}</span></span>;
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
