import React from 'react';
import { Layout } from 'antd';
import logo from '../Components/kittywithoutbackground.png';
import 'antd/dist/antd.css';
import './logIn.css';
import WrappedNormalLoginForm from '../Components/NormalLoginForm';

const { Header, Footer, Content } = Layout;
class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header className="header"><img src={logo} className="logo" alt="logo"/>CATS | Computer Automated Test Service</Header>
          <Content className="sider"><WrappedNormalLoginForm /></Content>
          <Footer className="footer">Exadel</Footer>
        </Layout>
      </div>
    );
  }
}

export default LogIn;
