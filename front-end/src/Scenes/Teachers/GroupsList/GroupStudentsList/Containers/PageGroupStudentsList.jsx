/* eslint-disable no-unused-vars,no-plusplus,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableGroupStudents from '../Components/TableGroupStudents';
import './PageGroupStudentsList.scss';
import { addStudent, assignedTasks, deleteStudent, fetchStudentsGroup } from '../Services/Actions/actions';
import { receiveTest } from '../../../Tests/AssignTest/Services/Actions/actions';
import { fetchAssignedTasks } from '../../../../Users/Tasks/AssignedTasks/Services/Actions/actions';

class PageGroupStudentsList extends React.PureComponent {
  static propTypes = {
    getGroup: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    students: PropTypes.objectOf(PropTypes.any).isRequired,
    assignedTasks: PropTypes.objectOf(PropTypes.any).isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    addStudentTest: PropTypes.func.isRequired,
    getAssignedTasks: PropTypes.func.isRequired,
  };

  render() {
    const {
      groupName,
      students,
      handleStudentAdd,
      handleStudentDelete,
      getGroup,
      error, addStudentTest, getAssignedTasks, assignedTasks,
    } = this.props;
    return (
      <TableGroupStudents
        groupName={groupName}
        students={students}
        handleStudentAdd={handleStudentAdd}
        handleStudentDelete={handleStudentDelete}
        getGroup={getGroup}
        error={error}
        addStudentTest={addStudentTest}
        getAssignedTasks={getAssignedTasks}
        assignedTasks={assignedTasks}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps.match, 35343);
  return {
    students: state.groupStudentsList.group,
    groupName: ownProps.match.params.groupName,
    assignedTasks: state.groupStudentsList.assignedTasks,
  };
}


const mapDispatchToProps = dispatch => ({
  handleStudentAdd: (student) => {
    dispatch(addStudent(student));
  },
  handleStudentDelete: (key) => {
    dispatch(deleteStudent(key));
  },
  getGroup: (groupName) => {
    dispatch(fetchStudentsGroup(groupName));
  },
  addStudentTest: (student) => {
    dispatch(receiveTest(student, 'STUDENT'));
  },
  getAssignedTasks: (users) => {
    console.log(users);
    for (let item = 0; item < users.length; item++) {
      console.log(users[item].email);
      dispatch(assignedTasks(users[item].email));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageGroupStudentsList);
