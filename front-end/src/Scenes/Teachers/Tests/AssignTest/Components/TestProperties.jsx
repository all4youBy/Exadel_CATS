import React from 'react';
import { Form, Input, Button } from 'antd';
import './TestProperties.scss';
import PropTypes from 'prop-types';


const { Item: FormItem } = Form;
// const { Option } = Select;
//
// const institutions = [];
//
// const primarySkills = [];
//
// const faculties = {};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class TestProperties extends React.Component {
  state = {
    teacher: false,
    idInstitution: -1,
    selectedInstitutionTeacher: -1,
    inputtedJob: '',
    email: '',
    firstName: '',
    secondName: '',
    faculty: '',
    primarySkill: '',
    yearTermination: 0,
  };

  setTextField = (event) => {
    const field = event.target.name;
    const targetValue = event.target.value;
    this.setState(prevState => ({
      [field]: prevState[field].replace(
        prevState[field],
        targetValue || '',
      ),
    }));
  };

  setYearTermination = (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      yearTermination: prevState.yearTermination - prevState.yearTermination + value,
    }));
  };

  setSelectField = (event, name) => {
    const field = name;
    this.setState(prevState => ({
      [field]: prevState[field] - prevState[field] + event,
    }));
  };

  changeSwitch = () => this.setState(prevState => ({ teacher: !prevState.teacher }));

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form className="form-class">
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Неверный E-mail!',
              },
              {
                required: true,
                message: 'Пожалуйста, введите E-mail!',
              },
            ],
          })(
            <Input
              name="email"
              onBlur={this.setTextField}
            />,
          )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Имя">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите ваше имя!',
              },
              {
                min: 2,
                message: 'Вы можете ввести не менее 2 символов',
              },
              {
                max: 40,
                message: 'Вы можете ввести не более 40 символов',
              },
            ],
          })(<Input
            name="firstName"
            onBlur={this.setTextField}
          />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Фамилия">
          {getFieldDecorator('secondName', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите вашу фамилию!',
              },
              {
                min: 2,
                message: 'Вы можете ввести не менее 2 символов',
              },
              {
                max: 40,
                message: 'Вы можете ввести не более 40 символов',
              },
            ],
          })(<Input
            name="secondName"
            onBlur={this.setTextField}
          />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-registration"
            // onClick={handleSubmit}
          >Назначить
          </Button>
        </FormItem>
      </Form>
    );
  }
}

TestProperties.propTypes = {
  form: PropTypes.shape().isRequired,
};


const WrappedTestPropertiesForm = Form.create()(TestProperties);
export default WrappedTestPropertiesForm;
