/* eslint-disable no-unused-vars,react/no-unused-state,
jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as types from '../Services/types';
import './GeneralMenu.scss';

const { SubMenu } = Menu;

class GeneralMenu extends React.PureComponent {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    check: PropTypes.objectOf(PropTypes.any).isRequired,
  };


  render() {
    let data;
    const { userType, email, check } = this.props;
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
        document.getElementById('badge-test').classList.add('hide');
      };
      const onClickBadgeAnswer = () => {
        document.getElementById('badge-answer').classList.add('hide');
      };
      const subsections = (element.subsections.map((item) => {
        if (item.text === 'Проверить тесты' && JSON.parse(localStorage.getItem('checkTests'))) {
          return (
            <Menu.Item
              onClick={() => onClickBadgeAnswer()}
              key={item.id}
            ><Badge
              id="badge-answer"
              className="badge-answer"
              count={check.length}
            />
              <Link
                to={item.link}
              >{item.text}
              </Link>
            </Menu.Item>);
        }
        return (
          <Menu.Item key={item.id}>
            <Link to={item.link}>{item.text}</Link>
          </Menu.Item>);
      }));
      const title = (userType !== 'STUDENT' && element.text === 'Тесты' && check) ? (
        <div role="button" onClick={() => onClickBadgeTests()}>
          <span><Icon type={element.type}/><Badge
            id="badge-test"
            className="badge-test"
            count={check.length}
          /><span>{element.text}</span>
          </span>
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
