import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { logIn, logInData } from '../Services/Actions/actions';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape().isRequired,
    onLogIn: PropTypes.func.isRequired,
    sendLogInData: PropTypes.func.isRequired,
    login: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.getUsername = (elem) => {
      this.username = elem;
    };
    this.getPassword = (elem) => {
      this.password = elem;
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onLogIn, sendLogInData } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onLogIn(this.username.props.value, this.password.props.value);
        sendLogInData('login', this.username.props.value, this.password.props.value);
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, login } = this.props;
    const errorLogIn = !login ? <div/> : <div className="error-input">Пороль или почта введены неправильно!</div>;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem className="form-item">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите имя пользователя!' }],
          })(
            <Input
              ref={this.getUsername}
              type="text"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Имя пользователя..."
            />,
          )}
        </FormItem>
        <FormItem className="form-item">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Введите пароль!' }],
          })(
            <Input
              ref={this.getPassword}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type="password"
              placeholder="Пароль..."
            />,
          )}
        </FormItem>
        {errorLogIn}
        <FormItem className="login">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          <a className="login-forgot" href="/">Забыли пароль?</a>
          <Link to="/registration">Зарегистрироваться!</Link>
        </FormItem>
      </Form>
    );
  }
}

function mapState(state) {
  return {
    login: state.logInInformation.error,
  };
}

function mapDispatch(dispatch) {
  return {
    onLogIn: (username, password) => {
      dispatch(logIn(username, password));
    },
    sendLogInData: (url, user, key) => {
      const data = {
        username: user,
        password: key,
      };
      dispatch(logInData(url, data));
    },
  };
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);
