import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAddStudent.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonAddStudent extends React.Component {
  static propTypes = {
    // student: PropTypes.objectOf.isRequired,
    onStudentAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleStudentAdd = this.handleStudentAdd.bind(this);
  }

  handleStudentAdd(e) {
    const { onStudentAdd } = this.props;
    console.log(this.props);
    e.preventDefault();
    onStudentAdd({
      key: '4',
      number: '4',
      name: 'Вишняков Василий Петрович',
      test1: 'Тест 1',
      test2: 'Тест 2',
      countTasks: '4',
      countTests: '4',
    });
  }

  render() {
    return (
      <Button onClick={this.handleStudentAdd} size="small" className="button-add-student"/>
    );
  }
}

export default ButtonAddStudent;
