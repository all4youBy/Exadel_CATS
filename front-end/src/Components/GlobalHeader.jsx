import React from 'react';
import { Layout } from 'antd/lib/index';
import logo from './kittywithoutbackground.png';
import './GlobalHeader.scss';

const { Header } = Layout;

class GlobalHeader extends React.PureComponent {
  render() {
    return (
      <Header className="page-header">
        <div className="parent-logo">
          <div className="parent-logo-img">
            <img src={logo} className="logo-img" alt="logo"/>
          </div>
          <p className="text-logo">CATS | Computer Automated Test Service</p>
        </div>
      </Header>
    );
  }
}

export default GlobalHeader;
