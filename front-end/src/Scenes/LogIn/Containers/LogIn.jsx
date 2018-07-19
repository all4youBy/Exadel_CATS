import React from 'react';
import { Layout } from 'antd';
import './LogIn.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WrappedNormalLoginForm from '../Components/LoginForm';
import { logIn } from '../Services/Actions/actions';

const { Content } = Layout;

class LogIn extends React.Component {
  static propTypes = {
    setStateLogIn: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { setStateLogIn } = this.props;
    setStateLogIn();
  }

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

function mapState(state) {
  return {
    data: state,
  };
}

function mapDispatch(dispatch) {
  return {
    setStateLogIn: () => {
      dispatch(logIn());
    },
  };
}

export default connect(mapState, mapDispatch)(LogIn);
