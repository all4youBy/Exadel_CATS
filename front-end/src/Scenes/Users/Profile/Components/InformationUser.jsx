import React from 'react';
import 'antd/dist/antd.css';
import './InformationUser.scss';
import { Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StudentInputs, TeacherInputs, formItemLayout } from '../../../../Components/Forms';
import { editUserWithoutPassword, editPassword } from '../Services/actions/actions';


const { Item: FormItem } = Form;

class InformationUser extends React.Component {
  state = {
    idInstitution: -1,
    selectedInstitutionTeacher: -1,
    inputtedJob: '',
    faculty: '',
    primarySkill: '',
    yearTermination: null,
    changePassword: false,
    confirmDirty: false,
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

  setTextField = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value || '',
    });
  };

  addInputsForPassword = () => this.setState(prev => ({
    changePassword: !prev.changePassword,
  }));

  render() {
    const { form,
      sendEditingUserWithoutPassword,
      userData,
      institutions,
      primarySkills,
      faculties,
      sendNewPassword } = this.props;
    const { getFieldDecorator } = form;

    const {
      idInstitution,
      selectedInstitutionTeacher,
      inputtedJob,
      faculty,
      primarySkill,
      yearTermination,
      changePassword,
      confirmDirty,
    } = this.state;

    const getUser = () => (userData.teacher
      ? {
        email: userData.email,
        firstName: userData.firstName,
        secondName: userData.secondName,
        institution: selectedInstitutionTeacher !== -1
          ? institutions[selectedInstitutionTeacher].name
          : userData.institution,
        job: inputtedJob || userData ? userData.job : '',
        primarySkill: primarySkill || userData.primarySkill,
      }
      : {
        email: userData.email,
        firstName: userData.firstName,
        secondName: userData.secondName,
        institution: idInstitution !== -1 ? institutions[idInstitution].name : userData.institution,
        faculty: faculty || userData.faculty,
        yearTermination: yearTermination || userData.yearTermination,
        primarySkill: primarySkill || userData.primarySkill,
      });


    const handleConfirmBlur = (e) => {
      const { value } = e.target;
      this.setState({
        confirmDirty: confirmDirty || !!value,
      });
    };

    const validateToNextPassword = (rule, value, callback) => {
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Два пароля, введенные Вами, не совпадают');
      } else {
        callback();
      }
    };

    const inputsForPassword = (
      <FormItem>
        <FormItem {...formItemLayout} label="Старый пароль">
          {getFieldDecorator('oldPassword', {
            rules: [
              {
                required: changePassword,
                message: 'Пожалуйста, введите старый пароль',
              },
            ],
          })(
            <Input
              placeholder="Пожалуйста, введите старый пароль"
              type="password"
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Пароль">
          {getFieldDecorator('password', {
            rules: [
              {
                required: changePassword,
                message: 'Пожалуйста, введите ваш новый пароль!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input
            type="password"
            placeholder="Пожалуйста, введите новый пароль"
          />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Подтвердить">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: changePassword,
                message: 'Пожалуйста, подтвердите ваш новый пароль!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input
            type="password"
            onBlur={handleConfirmBlur}
            placeholder="Пожалуйста, подтвердите новый пароль"
          />)}
        </FormItem>
      </FormItem>
    );

    const inpChangePassword = changePassword ? (
      inputsForPassword
    ) : (
      <div />
    );


    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err) => {
        if (!err) {
          sendEditingUserWithoutPassword(getUser());
          if (changePassword) {
            sendNewPassword({
              oldPassword: form.getFieldValue('oldPassword'),
              newPassword: form.getFieldValue('password'),
              email: userData.email,
            });
          }
        }
      });
    };

    const inputs = userData.teacher
      ? (
        <TeacherInputs
          institutions={institutions}
          primarySkills={primarySkills}
          form={form}
          setSelectField={this.setSelectField}
          setTextField={this.setTextField}
          userData={userData}
        />
      )
      : (
        <StudentInputs
          form={form}
          setSelectField={this.setSelectField}
          setYearTermination={this.setYearTermination}
          userData={userData}
          institutions={institutions}
          faculties={faculties}
          primarySkills={primarySkills}
        />
      );

    return (
      <Form
        onSubmit={
        (event) => {
          console.log(userData, 12312312);
          handleSubmit(event);
        }
        }
        className="information-user"
      >
        {userData !== {} ? inputs : (<div/>)}
        <Button
          onClick={this.addInputsForPassword}
          className="button-password"
        > Изменить пароль
        </Button>
        {inpChangePassword}
        <Button type="primary" htmlType="submit" className="login-form-button">
          Изменить данные
        </Button>
      </Form>
    );
  }
}

InformationUser.propTypes = {
  form: PropTypes.shape().isRequired,
  sendEditingUserWithoutPassword: PropTypes.func.isRequired,
  userData: PropTypes.shape().isRequired,
  institutions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  faculties: PropTypes.shape().isRequired,
  primarySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendNewPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  institutions: state.institutions,
  faculties: state.faculties,
  primarySkills: state.primarySkills,
});

const mapDispatchToProps = dispatch => ({
  sendEditingUserWithoutPassword: (user) => {
    dispatch(editUserWithoutPassword(user));
  },
  sendNewPassword: (user) => {
    dispatch(editPassword(user));
  },
});

const WrappedInformationUser = Form.create()(InformationUser);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedInformationUser);
