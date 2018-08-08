import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { logIn, logInData, getErrorFalse } from '../Services/Actions/actions';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape().isRequired,
    onLogIn: PropTypes.func.isRequired,
    sendLogInData: PropTypes.func.isRequired,
    login: PropTypes.bool.isRequired,
    errorFalse: PropTypes.func.isRequired,
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

  // hideIncorrectData = (event) => {
  //   console.log(event.target.getElementsByClassName('.error-input'));
  //   if (event.target.getElementsByClassName('.error-input')) {
  //     event.target.getElementsByClassName('.error-input').add('hide');
  //   }
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onLogIn, sendLogInData } = this.props;

    form.validateFields((err) => {
      if (!err) {
        const { errorFalse } = this.props;
        onLogIn(this.username.props.value, this.password.props.value);
        sendLogInData('login', this.username.props.value, this.password.props.value);
        errorFalse();
      }
    });
  };

  deleteError = () => {
    if (document.querySelector('.parent-error-input')) {
      const element = document.querySelector('.parent-error-input');
      element.classList.add('hide');
    }
  };

  render() {
    const { form: { getFieldDecorator }, login } = this.props;
    let errorLogIn = null;
    if (!login) {
      errorLogIn = <div/>;
    } else {
      const element = document.getElementsByClassName('hide');
      errorLogIn = (
        <div className="parent-error-input">
          <div className="error-input">Пароль или почта введены неправильно!</div>
        </div>);
      if (element && element.length && element[0].classList && element[0].classList.length === 2) {
        element[0].classList.remove('hide');
      }
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem className="form-item">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите имя пользователя!' }],
          })(
            <Input
              // onBlur={this.hideIncorrectData}
              ref={this.getUsername}
              onChange={this.deleteError}
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
              // onBlur={this.hideIncorrectData}
              onChange={this.deleteError}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type="password"
              placeholder="Пароль..."
            />,
          )}
        </FormItem>
        {errorLogIn}
        <FormItem className="login">
          <Button type="primary" htmlType="submit" className="button-table-with-border login-form-button">
            Войти
          </Button>
          <Link to="/registration" className="registration-text">Зарегистрироваться!</Link>
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
    errorFalse: (username, password) => {
      dispatch(getErrorFalse(username, password));
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
