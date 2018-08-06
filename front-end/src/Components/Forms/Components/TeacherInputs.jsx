import { Input, Select, Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import {
  formItemLayout,
  createPrimarySkillOptions,
  createInsitutionOptions,
} from '../parametrs';

const { Item: FormItem } = Form;

function isEqualValues(obj1, obj2) {
  return Object.keys(obj1).every(key => obj2[key] === obj1[key]);
}

export default class TeacherInputs extends React.Component {
  state = {
    selectedInstitutionTeacher: -1,
    inputtedJob: '',
    oldUser: {},
  };

  componentDidMount() {
    const { userData, form, institutions } = this.props;
    const { setFieldsValue } = form;
    if (userData !== {}) {
      const institutionsNames = institutions.map(element => element.name);
      const indexOfEqual = institutionsNames.indexOf(userData.institution);
      const idInstitution = indexOfEqual !== -1 ? institutions[indexOfEqual].id : null;
      this.setState({
        oldUser: {
          job: userData.job,
          primarySkill: userData.primarySkill,
          yearTermination: userData.yearTermination,
        },
      });
      if (userData !== {}) {
        setFieldsValue({
          institutionTeacher: idInstitution,
        });

        setFieldsValue({
          job: userData.job,
        });

        setFieldsValue({
          primarySkillTeacher: userData.primarySkill,
        });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.userData).length) {
      const institutionsNames = nextProps.institutions.map(element => element.name);
      const indexOfEqual = institutionsNames.indexOf(nextProps.userData.institution);
      const idInstitution = indexOfEqual !== -1 ? nextProps.institutions[indexOfEqual].id : null;
      if (!isEqualValues(prevState.oldUser, nextProps.userData)
        || idInstitution !== prevState.selectedInstitutionTeacher) {
        nextProps.form.setFieldsValue({
          institutionTeacher: idInstitution,
        });

        nextProps.form.setFieldsValue({
          job: nextProps.userData.job,
        });

        nextProps.form.setFieldsValue({
          primarySkillTeacher: nextProps.userData.primarySkill,
        });

        return {
          selectedInstitutionTeacher: prevState.selectedInstitutionTeacher,
          inputtedJob: prevState.inputtedJob,
          oldUser: {
            job: nextProps.userData.job,
            primarySkill: nextProps.userData.primarySkill,
            yearTermination: nextProps.userData.yearTermination,
          },
        };
      }
    }
    return false;
  }

  render() {
    const { form, setSelectField, setTextField, institutions, primarySkills } = this.props;
    const setIdInstitution = (value) => {
      setSelectField(value, 'selectedInstitutionTeacher');
      this.setState(prevState => ({
        selectedInstitutionTeacher:
        prevState.selectedInstitutionTeacher
        - prevState.selectedInstitutionTeacher
        + value,
      }));
    };

    const setJob = (event) => {
      setTextField(event, 'inputtedJob');
      const targetValue = event.target.value;
      this.setState(prevState => ({
        inputtedJob: prevState.inputtedJob.replace(
          prevState.inputtedJob,
          targetValue || '',
        ),
      }));
    };

    const { selectedInstitutionTeacher, inputtedJob } = this.state;

    const { getFieldDecorator } = form;

    return (
      <FormItem>
        <FormItem {...formItemLayout} label="Место работы">
          {getFieldDecorator('job', {
            rules: [
              {
                required: !(selectedInstitutionTeacher !== -1
                  || inputtedJob.length !== 0),
                message: 'Пожалуйста, выберите место работы и/или учебное заведение!',
              },
            ],
          })(
            <Input
              name="inputtedJob"
              onBlur={setJob}
              placeholder="Введите место работы и/или учебное заведение"
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Заведение">
          {getFieldDecorator('institutionTeacher', {
            rules: [
              {
                required: !(selectedInstitutionTeacher !== -1
                  || inputtedJob.length !== 0),
                message: 'Пожалуйста, выберите учебное заведение!',
              },
            ],
          })(
            <Select
              placeholder="Выберите учебное заведение"
              onChange={setIdInstitution}
            >
              {createInsitutionOptions(institutions)}
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Primary skill">
          {getFieldDecorator('primarySkillTeacher', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, выберите ваш primary skill!',
              },
            ],
          })(
            <Select
              onChange={value => setSelectField(value, 'primarySkill')}
              placeholder="Выберите ваш primary skill"
            >
              {createPrimarySkillOptions(primarySkills)}
            </Select>,
          )}
        </FormItem>
      </FormItem>
    );
  }
}

TeacherInputs.propTypes = {
  form: PropTypes.shape().isRequired,
  setSelectField: PropTypes.func.isRequired,
  setTextField: PropTypes.func.isRequired,
  userData: PropTypes.shape(),
  institutions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  primarySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TeacherInputs.defaultProps = {
  userData: {},
};
