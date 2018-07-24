import React from 'react';
import { Layout } from 'antd';
import './LogIn.scss';
import WrappedNormalLoginForm from '../Components/LoginForm';

const { Content } = Layout;

class LogIn extends React.Component {
  render() {
    return (
      <div >
        <Layout className="container-main" >
          <Content className="login-page content">
            <div className="login-page login-form"><WrappedNormalLoginForm/></div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default (LogIn);
