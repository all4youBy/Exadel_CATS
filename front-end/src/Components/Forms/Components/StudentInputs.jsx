import { Input, Select, Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInstitutions, getPrimarySkills, getFaculties } from '../Services/Actions/actions';

import {
  formItemLayout,
  createInsitutionOptions,
  createPrimarySkillOptions,
} from '../parametrs';

const { Option } = Select;


const { Item: FormItem } = Form;

function isEqualValues(obj1, obj2) {
  return Object.keys(obj1).every(key => obj2[key] === obj1[key]);
}

function isEqualsArrays(arr1, arr2) {
  return arr1.every((element, i) => element === arr2[i]);
}

class StudentInputs extends React.Component {
  state = {
    idInstitution: -1,
    oldUser: {},
    stateInstitutions: [],
  };

  componentDidMount() {
    const { userData, form, institutions, getSkills, getUniversities, getFacults } = this.props;
    const { setFieldsValue } = form;
    getFacults();
    getUniversities();
    getSkills();
    if (userData !== {}) {
      const institutionsNames = institutions.map(element => element.name);
      const indexOfEqual = institutionsNames.indexOf(userData.institution);
      const idInstitution = indexOfEqual !== -1 ? institutions[indexOfEqual].id : null;

      setFieldsValue({
        institution: idInstitution,
      });

      setFieldsValue({
        faculty: userData.faculty,
      });

      setFieldsValue({
        yearTermination: userData.yearTermination,
      });

      setFieldsValue({
        primarySkillStudent: userData.primarySkill,
      });

      this.setState({
        oldUser: {
          faculty: userData.faculty,
          primarySkill: userData.primarySkill,
          yearTermination: userData.yearTermination,
        },
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.userData).length) {
      if (!isEqualValues(prevState.oldUser, nextProps.userData)
        || !isEqualsArrays(nextProps.institutions, prevState.stateInstitutions)) {
        const institutionsNames = nextProps.institutions.map(element => element.name);
        const indexOfEqual = institutionsNames.indexOf(nextProps.userData.institution);
        const idInstitution = indexOfEqual !== -1 ? nextProps.institutions[indexOfEqual].id : null;

        nextProps.form.setFieldsValue({
          institution: idInstitution,
        });

        nextProps.form.setFieldsValue({
          faculty: nextProps.userData.faculty,
        });

        nextProps.form.setFieldsValue({
          yearTermination: Number(nextProps.userData.yearTermination),
        });

        nextProps.form.setFieldsValue({
          primarySkillStudent: nextProps.userData.primarySkill,
        });

        return {
          stateInstitutions: nextProps.institutions,
          idInstitution: prevState.idInstitution,
          oldUser: {
            faculty: nextProps.userData.faculty,
            primarySkill: nextProps.userData.primarySkill,
            yearTermination: Number(nextProps.userData.yearTermination),
          },
        };
      }
    }
    return false;
  }

  render() {
    const { idInstitution } = this.state;

    const { faculties, institutions } = this.props;
    const facultiesOptions = idInstitution !== -1 ? faculties[
      institutions[idInstitution].id].map(elem => (
        <Option value={elem} key={elem}>
          {elem}
        </Option>
    )) : [];

    const { form, setSelectField, setYearTermination, primarySkills } = this.props;

    const { getFieldDecorator } = form;


    const setIdInstitution = (value) => {
      setSelectField(value, 'idInstitution');
      const { form: { setFieldsValue } } = this.props;
      setFieldsValue({
        faculty: null,
      });
      this.setState({
        idInstitution: value,
      });
    };

    return (
      <FormItem>
        <FormItem {...formItemLayout} label="Заведение">
          {getFieldDecorator('institution', {
            rules: [
              {
                required: true,
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
        <FormItem {...formItemLayout} label="Факультет">
          {getFieldDecorator('faculty', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, выберите факультет!',
              },
            ],
          })(
            <Select
              onChange={value => setSelectField(value, 'faculty')}
            >
              {facultiesOptions}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Год окончания">
          {getFieldDecorator('yearTermination', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите год окончания университета!',
              },
              {
                pattern: /[2-9]\d\d\d/,
                message: 'Вы можете ввести год из 4 цифр, начиная с 2000 года.',
              },
            ],
          })(
            <Input
              name="yearTermination"
              onBlur={setYearTermination}
            />,
          )
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Primary skill">
          {getFieldDecorator('primarySkillStudent', {
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

StudentInputs.propTypes = {
  form: PropTypes.shape().isRequired,
  setSelectField: PropTypes.func.isRequired,
  setYearTermination: PropTypes.func.isRequired,
  userData: PropTypes.shape(),
  institutions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  faculties: PropTypes.shape().isRequired,
  primarySkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  getSkills: PropTypes.func.isRequired,
  getUniversities: PropTypes.func.isRequired,
  getFacults: PropTypes.func.isRequired,
};

StudentInputs.defaultProps = {
  userData: {},
};

const mapStateToProps = state => ({
  primarySkills: state.primarySkills,
  faculties: state.faculties,
  institutions: state.institutions,
});

const mapDispatchToProps = dispatch => ({
  getSkills: () => {
    dispatch(getPrimarySkills());
  },
  getUniversities: () => {
    dispatch(getInstitutions());
  },
  getFacults: () => {
    dispatch(getFaculties());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentInputs);
