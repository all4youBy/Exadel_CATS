import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import { Form, Icon, Input, Button } from 'antd';
import { logIn } from '../Services/Actions/actions';
import API from '../../../Services/API';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape().isRequired,
    onLogIn: PropTypes.func.isRequired,
    getFetchData: PropTypes.func.isRequired,
    // data: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.onClickLogIn = this.onClickLogIn.bind(this);
  }

  componentDidMount() {
    const { getFetchData } = this.props;
    getFetchData('login');
    // const { data } = this.props;
    // console.log(data.loadMainProject);
  }

  onClickLogIn = (e) => {
    const { onLogIn } = this.props;
    onLogIn(this.username.props.value, this.password.props.value);
    e.preventDefault();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
              ref={(c) => { this.username = c; }}
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
              ref={(c) => { this.password = c; }}
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
          <a href="/">Зарегистрироваться!</a>
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
    getFetchData: url => dispatch(API.get(url, 'logInData')),
  };
}

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);
