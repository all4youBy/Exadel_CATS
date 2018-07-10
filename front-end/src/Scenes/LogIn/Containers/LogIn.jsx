import React from 'react';
import { Layout } from 'antd';
import logo from './kittywithoutbackground.png';
import 'antd/dist/antd.css';
import './LogIn.css';
import WrappedNormalLoginForm from '../Components/NormalLoginForm';

const { Header, Footer, Content } = Layout;
class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header><img src={logo} className="logo" alt="logo"/>CATS | Computer Automated Test Service</Header>
          <Content ><WrappedNormalLoginForm /></Content>
          <Footer>Exadel</Footer>
        </Layout>
      </div>
    );
  }
}

export default LogIn;
