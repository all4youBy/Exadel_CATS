import React from 'react';
import { Form, Input, Switch, Select, Button } from 'antd';
import { connect } from 'react-redux';
import './RegistrationForm.scss';
import PropTypes from 'prop-types';
import { registrateStudent, registrateTeacher } from '../Services/Actions/actions';


const { Item: FormItem } = Form;
const { Option } = Select;

const institutions = [
  {
    name: 'БГУ',
    id: 0,
  },
  {
    name: 'БГУИР',
    id: 1,
  },
  {
    name: 'БНТУ',
    id: 2,
  },
];

const primarySkills = ['Java', 'C++', 'JavaScript'];

const faculties = {
  0: [
    'Факультет прикладной математики и информатики',
    'Физический факультет',
    'Филологический факультет',
    'Механико-математический факультет',
  ],
  1: ['Информатика', 'КСиС'],
  2: ['Архитектор'],
};

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

class RegistrationForm extends React.Component {
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
    const {
      teacher,
      idInstitution,
      selectedInstitutionTeacher,
      inputtedJob,
      email,
      firstName,
      secondName,
      faculty,
      primarySkill,
      yearTermination,
    } = this.state;
    const { form, registrationTeacher, registrationStudent } = this.props;
    const { getFieldDecorator } = form;


    const getUser = () => (teacher
      ? {
        email,
        firstName,
        secondName,
        institution: selectedInstitutionTeacher !== -1 ? institutions[selectedInstitutionTeacher].name : '',
        job: inputtedJob,
        primarySkill,
      }
      : {
        email,
        firstName,
        secondName,
        institution: idInstitution !== -1 ? institutions[idInstitution].name : '',
        faculty,
        yearTermination,
        primarySkill,
      });

    const switchRegistration = () => (teacher
      ? registrationTeacher(getUser())
      : registrationStudent(getUser())
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFieldsAndScroll((err) => {
        if (!err) {
          switchRegistration();
        }
      });
    };

    const institutionOptions = institutions.map(inst => (
      <Option value={inst.id} key={inst.id}>
        {inst.name}
      </Option>
    ));

    const primarySkillsOptions = primarySkills.map(skill => (
      <Option value={skill} key={skill}>
        {skill}
      </Option>
    ));

    const facultiesOptions = idInstitution !== -1 ? faculties[
      institutions[idInstitution].id].map(elem => (
        <Option value={elem} key={elem}>
          {elem}
        </Option>
    )) : [];

    const inputForTeachers = (
      <FormItem>
        <FormItem {...formItemLayout} label="Место работы">
          {getFieldDecorator('job', {
            rules: [
              {
                required: teacher && !(selectedInstitutionTeacher !== -1
                  || inputtedJob.length !== 0),
                message: 'Пожалуйста, выберите место работы и/или учебное заведение!',
              },
            ],
          })(
            <Input
              name="inputtedJob"
              onBlur={this.setTextField}
              placeholder="Введите место работы и/или учебное заведение"
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Учебное заведение">
          {getFieldDecorator('institutionTeacher', {
            rules: [
              {
                required: teacher && !(selectedInstitutionTeacher !== -1
                  || inputtedJob.length !== 0),
                message: 'Пожалуйста, выберите учебное заведение!',
              },
            ],
          })(
            <Select
              placeholder="Выберите учебное заведение"
              onChange={value => this.setSelectField(value, 'selectedInstitutionTeacher')}
            >
              {institutionOptions}
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Primary skill">
          {getFieldDecorator('primarySkillTeacher', {
            rules: [
              {
                required: teacher,
                message: 'Пожалуйста, выберите ваш primary skill!',
              },
            ],
          })(
            <Select
              onChange={value => this.setSelectField(value, 'primarySkill')}
              placeholder="Выберите ваш primary skill"
            >
              {primarySkillsOptions}
            </Select>,
          )}
        </FormItem>
      </FormItem>
    );

    const inputsForStudents = (
      <FormItem>
        <FormItem {...formItemLayout} label="Учебное заведение">
          {getFieldDecorator('institution', {
            rules: [
              {
                required: !teacher,
                message: 'Пожалуйста, выберите учебное заведение!',
              },
            ],
          })(
            <Select
              placeholder="Выберите учебное заведение"
              onChange={value => this.setSelectField(value, 'idInstitution')}
            >
              {institutionOptions}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Факультет">
          {getFieldDecorator('faculty', {
            rules: [
              {
                required: !teacher,
                message: 'Пожалуйста, выберите факультет!',
              },
            ],
          })(
            <Select
              placeholder="Выберите ваш факультет"
              onChange={value => this.setSelectField(value, 'faculty')}
            >
              {facultiesOptions}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Год окончания">
          {getFieldDecorator('yearTermination', {
            rules: [
              {
                required: !teacher,
                message: 'Пожалуйста, введите год окончания университета!',
              },
              {
                pattern: /[2-9]\d\d\d/,
                message: 'Вы можете ввести год из 4 цифр, начиная с 2000 года.',
              },
              {
                max: 4,
                message: 'Введите 4 цифры',
              },

            ],
          })(
            <Input
              name="yearTermination"
              onBlur={this.setYearTermination}
            />,
          )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Primary skill">
          {getFieldDecorator('primarySkillStudent', {
            rules: [
              {
                required: !teacher,
                message: 'Пожалуйста, выберите ваш primary skill!',
              },
            ],
          })(
            <Select
              onChange={value => this.setSelectField(value, 'primarySkill')}
              placeholder="Выберите ваш primary skill"
            >
              {primarySkillsOptions}
            </Select>,
          )}
        </FormItem>
      </FormItem>
    );
    const inputs = teacher ? inputForTeachers : inputsForStudents;

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
        <FormItem>
          <FormItem {...formItemLayout} label="Вы учитель?">
            {getFieldDecorator('isTeacher')(
              <Switch
                className="switch-left"
                checked={teacher}
                onClick={this.changeSwitch}
              />,
            )}
          </FormItem>
        </FormItem>
        {inputs}
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-registration"
            onClick={handleSubmit}
          >Зарегистрироваться
          </Button>
        </FormItem>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  form: PropTypes.shape().isRequired,
  registrationTeacher: PropTypes.func.isRequired,
  registrationStudent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  students: state.students,
  teachers: state.teachers,
});

const mapDispatchToProps = dispatch => ({
  registrationStudent: (student) => {
    dispatch(registrateStudent(student));
  },
  registrationTeacher: (teacher) => {
    dispatch(registrateTeacher(teacher));
  },
});

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
