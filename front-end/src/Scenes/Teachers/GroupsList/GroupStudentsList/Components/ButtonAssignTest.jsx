import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTest.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonAssignTest extends React.Component {
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
    // console.log(this.handleStudentAdd);
    return (
      <Button
        onClick={this.handleStudentAdd}
        shape="circle"
        icon="profile"
        className="button-assign-test"
        size="small"
      />
    );
  }
}

export default ButtonAssignTest;
