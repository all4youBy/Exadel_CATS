import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape().isRequired,
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
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Имя пользователя..."/>,
          )}
        </FormItem>
        <FormItem className="form-item">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Введите пароль!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type="password"
              placeholder="Пароль..."
            />,
          )}
        </FormItem>
        <FormItem className="login">
          <Button onClick={this.onClick} type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          <a className="login-forgot" href="/">Забыли пароль?</a>
          <a href="/">Зарегистрироваться!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
