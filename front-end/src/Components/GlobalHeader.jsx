import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import PropTypes from 'prop-types';
import logo from './kittywithoutbackground.png';
import './GlobalHeader.scss';
// import { history } from '../Services/ConfigureStore';

const { Header } = Layout;

class GlobalHeader extends React.PureComponent {
  static propTypes = {
    history: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  onClickLogOut() {
    localStorage.clear();
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { userType, user } = this.props;
    const logOut = !(userType === 'GUEST') ? (
      <div className="username">
        <div className="username"><Icon type="user" className="user"/>
          <span className="name-username">{user.firstName} {user.lastName}</span>
        </div>
        <div className="exit-block">
          <Icon type="logout" className="logout"/>
          <Link
            to="/login"
            onClick={this.onClickLogOut}
            className="button-exit"
            type="dashed"
          >
            Выйти
          </Link>
        </div>
      </div>
    ) : <div/>;

    return (
      <Header className="page-header">
        <div className="parent-logo">
          <div className="logo">
            <div className="parent-logo-img">
              <img src={logo} className="logo-img" alt="logo"/>
            </div>
            <p className="text-logo">CATS | Computer Automated Test Service</p>
          </div>
          {logOut}
        </div>
      </Header>
    );
  }
}

export default GlobalHeader;
