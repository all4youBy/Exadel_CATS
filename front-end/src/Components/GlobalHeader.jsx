import React from 'react';
import { Layout } from 'antd/lib/index';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './kittywithoutbackground.png';
import './GlobalHeader.scss';
// import { history } from '../Services/ConfigureStore';

const { Header } = Layout;

class GlobalHeader extends React.PureComponent {
  static propTypes = {
    history: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    user: PropTypes.arrayOf().isRequired,
  };

  onClickLogOut() {
    localStorage.clear();
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { userType, user } = this.props;
    console.log(user);
    const logOut = !(userType === 'GUEST') ? (
      <div className="username">
        <p className="text-logo">{user.firstName} {user.lastName} |</p>
        <Link
          to="/login"
          onClick={this.onClickLogOut}
          className="button-exit"
          type="dashed"
        > Выйти
        </Link>
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
