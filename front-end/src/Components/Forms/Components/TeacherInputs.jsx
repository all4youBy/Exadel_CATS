import { Input, Select, Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  formItemLayout,
  createPrimarySkillOptions,
  createInsitutionOptions,
} from '../parametrs';
import { getInstitutions, getPrimarySkills } from '../Services/Actions/actions';

const { Item: FormItem } = Form;

function isEqualValues(obj1, obj2) {
  return Object.keys(obj1).every(key => obj2[key] === obj1[key]);
}

function isEqualsArrays(arr1, arr2) {
  return arr1.every((element, i) => element === arr2[i]);
}

class TeacherInputs extends React.Component {
  state = {
    selectedInstitutionTeacher: -1,
    inputtedJob: '',
    oldUser: {},
    stateInstitutions: [],
  };

  componentDidMount() {
    const { userData, form, institutions, getSkills, getUniversities } = this.props;
    const { setFieldsValue } = form;
    getUniversities();
    getSkills();
    const { stateInstitutions } = this.state;
    if (userData !== {}) {
      const institutionsNames = stateInstitutions.map(element => element.name);
      const indexOfEqual = institutionsNames.indexOf(userData.institution);
      const idInstitution = indexOfEqual !== -1 ? stateInstitutions[indexOfEqual].id : null;
      this.setState({
        oldUser: {
          stateInstitutions: institutions,
          job: userData.job,
          primarySkill: userData.primarySkill,
          yearTermination: userData.yearTermination,
        },
      });
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


  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.userData).length
      || !isEqualsArrays(nextProps.institutions, prevState.stateInstitutions)) {
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
          stateInstitutions: nextProps.institutions,
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
  getSkills: PropTypes.func.isRequired,
  getUniversities: PropTypes.func.isRequired,
};

TeacherInputs.defaultProps = {
  userData: {},
};

const mapStateToProps = state => ({
  primarySkills: state.primarySkills,
  // faculties: state.faculties,
  institutions: state.institutions,
});

const mapDispatchToProps = dispatch => ({
  getSkills: () => {
    dispatch(getPrimarySkills());
  },
  getUniversities: () => {
    dispatch(getInstitutions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherInputs);
