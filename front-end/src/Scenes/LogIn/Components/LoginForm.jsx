import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { logIn } from '../Services/Actions/actions';
import API from '../../../Services/API';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape().isRequired,
    onLogIn: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    sendLogInData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClickLogIn = this.onClickLogIn.bind(this);
    this.getUsername = (elem) => {
      this.username = elem;
    };
    this.getPassword = (elem) => {
      this.password = elem;
    };
  }

  componentDidMount() {
    const { getData } = this.props;
    getData('topics');
  }

  onClickLogIn = (e) => {
    const { onLogIn, sendLogInData } = this.props;
    onLogIn(this.username.props.value, this.password.props.value);
    sendLogInData('login', this.username.props.value, this.password.props.value);
    e.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields();
  };


  render() {
    const { form: { getFieldDecorator } } = this.props;
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
        <FormItem className="login">
          <Button onClick={this.onClickLogIn} type="primary" htmlType="submit" className="login-form-button">
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
    data: state,
  };
}

function mapDispatch(dispatch) {
  return {
    onLogIn: (username, password) => {
      dispatch(logIn(username, password));
    },
    sendLogInData: (url, username, password) => {
      dispatch(API.login(url, { username, password }, { json: false }));
    },
    getData: (url) => {
      dispatch(API.get(url, 'logInData'));
    },
  };
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);
