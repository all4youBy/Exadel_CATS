import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './NormalLoginForm.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

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
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Введите имя пользователя!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Имя пользователя..."/>,
          )}
        </FormItem>
        <FormItem>
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
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Запомнить меня</Checkbox>,
          )}
          <a className="login-form-forgot" href="/">Забыли пароль?</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          <a href="/">Зарегистрироваться!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
