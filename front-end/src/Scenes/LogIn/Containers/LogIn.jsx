import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './LogIn.scss';
import WrappedNormalLoginForm from '../Components/NormalLoginForm';
import GlobalHeader from '../../../Components/GlobalHeader';
import GlobalFooter from '../../../Components/GlobalFooter';

const { Content } = Layout;

class LogIn extends React.Component {
  render() {
    return (
      <div >
        <Layout className="container-main" >
          <GlobalHeader />
          <Content className="login-page content">
            <div className="login-page login-form"><WrappedNormalLoginForm/></div>
          </Content>
          <GlobalFooter/>
        </Layout>
      </div>
    );
  }
}

export default LogIn;
