import React from 'react';
import { Form, Input, Button } from 'antd';
import './TestProperties.scss';
import PropTypes from 'prop-types';
import TimeInputGroup from './TimeInputGroup';

const { TextArea } = Input;
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
    xs: { span: 100 },
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
      span: 50,
      offset: 50,
    },
    sm: {
      span: 19,
      offset: 50,
    },
  },
};

class TestProperties extends React.Component {
  state = {
    teacher: false,
    countQuestions: 0,
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

  setNumberField = (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      countQuestions: prevState.countQuestions - prevState.countQuestions + value,
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
      <div className="test-properties-content">
        <TextArea className="input-task-name" placeholder="Название теста" autosize/>
        <Form className="parent-form">
          <FormItem {...formItemLayout} label="Количество вопросов" className="form-item">
            {getFieldDecorator('Количество вопросов', {
              rules: [
                {
                  pattern: /[1-9]/,
                  message: 'Введите число!',
                },
                {
                  max: 4,
                  message: 'Введите 4 цифры!',
                },
                {
                  required: true,
                  message: 'Пожалуйста, введите количество вопросов!',
                },
              ],
            })(
              <Input
                className="input-count-questions"
                name="name"
                onBlur={this.setNumberField}
              />,
            )
            }
          </FormItem>
          <FormItem {...formItemLayout} label="Время выполнения" className="form-item">
            {getFieldDecorator('leadTime', {
              rules: [
                {
                  required: true,
                  message: 'Пожалуйста, введите время выполнения!',
                },
                {
                  max: 2,
                  message: 'Вы можете ввести не более 2 символов',
                },
              ],
            })(<TimeInputGroup/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="Время открытия теста" className="form-item">
            {getFieldDecorator('timeOpenTest', {
              rules: [
                {
                  required: true,
                  message: 'Пожалуйста, введите время открытия теста!',
                },
                {
                  max: 2,
                  message: 'Вы можете ввести не более 2 символов',
                },
              ],
            })(<TimeInputGroup/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="Время сдачи" className="form-item">
            {getFieldDecorator('passTime', {
              rules: [
                {
                  required: true,
                  message: 'Пожалуйста, введите время сдачи!',
                },
                {
                  max: 2,
                  message: 'Вы можете ввести не более 2 символов',
                },
              ],
            })(<TimeInputGroup/>)}
          </FormItem>
          <FormItem {...tailFormItemLayout} >
            <Button
              type="primary"
              htmlType="submit"
              className="submit-assign-test"
              // onClick={handleSubmit}
            >Назначить
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

TestProperties.propTypes = {
  form: PropTypes.shape().isRequired,
};


const WrappedTestPropertiesForm = Form.create()(TestProperties);
export default WrappedTestPropertiesForm;
