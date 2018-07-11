import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './LogIn.css';
import WrappedNormalLoginForm from '../Components/NormalLoginForm';
import PageHeader from '../../../Components/PageHeader';
import PageFooter from '../../../Components/PageFooter';

const { Content } = Layout;

class LogIn extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <PageHeader/>
          <Content>
            <div className="parent-login-form"><WrappedNormalLoginForm/></div>
          </Content>
          <PageFooter/>
        </Layout>
      </div>
    );
  }
}

export default LogIn;
