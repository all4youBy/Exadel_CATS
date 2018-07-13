import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './LogIn.css';
import WrappedNormalLoginForm from '../Components/NormalLoginForm';

const { Content } = Layout;

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Content>
            <div className="parent-login-form"><WrappedNormalLoginForm/></div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default LogIn;
