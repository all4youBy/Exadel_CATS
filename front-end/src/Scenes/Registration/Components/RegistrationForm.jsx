import React from 'react';
import { Form, Input, Switch, Button } from 'antd';
import { connect } from 'react-redux';
import './RegistrationForm.scss';
import PropTypes from 'prop-types';
import { reqRegistrateStudent, reqRegistrateTeacher } from '../Services/Actions/actions';
import { StudentInputs, TeacherInputs, formItemLayout, tailFormItemLayout } from '../../../Components/Forms';

const { Item: FormItem } = Form;

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
    this.setState({
      [field]: targetValue || '',
    });
  };

  setYearTermination = (event) => {
    const { value } = event.target;
    this.setState({
      yearTermination: Number(value),
    });
  };

  setSelectField = (event, name) => {
    const field = name;
    this.setState({
      [field]: event,
    });
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
    const { form,
      registrateStudent,
      registrateTeacher,
      institutions,
      faculties,
      primarySkills } = this.props;
    const { getFieldDecorator } = form;


    const getUser = () => (teacher
      ? {
        email,
        firstName,
        secondName,
        institution: selectedInstitutionTeacher !== -1 ? institutions[selectedInstitutionTeacher].name : '',
        job: inputtedJob,
        primarySkill,
        role: 'TEACHER',
      }
      : {
        email,
        firstName,
        secondName,
        institution: idInstitution !== -1 ? institutions[idInstitution].name : '',
        faculty,
        yearTermination,
        primarySkill,
        role: 'STUDENT',
      });

    const switchRegistration = () => (teacher
      ? registrateTeacher(getUser())
      : registrateStudent(getUser())
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFieldsAndScroll((err) => {
        if (!err) {
          switchRegistration();
        }
      });
    };

    const inputs = teacher
      ? (
        <TeacherInputs
          institutions={institutions}
          primarySkills={primarySkills}
          setTextField={this.setTextField}
          setSelectField={this.setSelectField}
          form={form}
        />
      )
      : (
        <StudentInputs
          institutions={institutions}
          faculties={faculties}
          primarySkills={primarySkills}
          setSelectField={this.setSelectField}
          setYearTermination={this.setYearTermination}
          form={form}
        />
      );

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
  registrateStudent: PropTypes.func.isRequired,
  registrateTeacher: PropTypes.func.isRequired,
  institutions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  faculties: PropTypes.shape().isRequired,
  primarySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  institutions: state.institutions,
  faculties: state.faculties,
  primarySkills: state.primarySkills,
});

const mapDispatchToProps = dispatch => ({
  registrateStudent: (student) => {
    dispatch(reqRegistrateStudent(student));
  },
  registrateTeacher: (teacher) => {
    dispatch(reqRegistrateTeacher(teacher));
  },
});

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
